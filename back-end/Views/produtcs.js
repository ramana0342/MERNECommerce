const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const productData = require("../Model/uploadProduct");
const adminAuthorization = require("../MiddleWares/adminAuthorization");

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.RAMANADOTM0342_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.RAMANADOTM0342_CLOUDINARY_API_KEY,
  api_secret: process.env.RAMANADOTM0342_CLOUDINARY_API_SECRET,
});


const upload = multer({ storage: multer.memoryStorage() });

const uploadToCloudinary = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "E-commerce-Products",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    stream.end(fileBuffer); 
  });
};

// POST Upload Product Route
router.post("/upload/product",adminAuthorization,upload.array("Photo", 5),async (req, res) => {
    try {
      const photoUrls = [];

      for (const file of req.files) {
        const uploadResult = await uploadToCloudinary(file.buffer);
        photoUrls.push(uploadResult.secure_url);
      }

      const { Title, Description, Price, Rating, Category, subCategory, Brand } =
        req.body;

      const newProduct = new productData({
        Title,
        Description,
        Price,
        Rating,
        Category,
        subCategory,
        Brand,
        Photo: photoUrls,
      });

      const savedProduct = await newProduct.save();

      res.status(200).json({
        messege: "Success",
        responseData: savedProduct,
      });
    } catch (err) {
      console.error("Upload Error:", err);
      res.status(500).json({ messege: "Error uploading product" });
    }
  }
);


// Get all products
router.get("/getProductsData", async (req, res) => {
  try {
    const productsData = await productData.find({});
    res.status(200).json({ message: "Success", productsData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching products" });
  }
});

module.exports = router;
