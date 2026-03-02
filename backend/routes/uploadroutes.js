const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
require("dotenv").config();

const router = express.Router();

/* ================= CLOUDINARY CONFIG ================= */

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ ENV DEBUG (remove later)
console.log("Cloudinary ENV CHECK:", {
  cloud: process.env.CLOUDINARY_CLOUD_NAME,
  key: process.env.CLOUDINARY_API_KEY,
  secretExists: !!process.env.CLOUDINARY_API_SECRET,
});

/* ================= MULTER SETUP ================= */

// store file in memory (no local storage)
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files allowed"), false);
    }
  },
});

/* ================= ROUTE ================= */

// POST /api/upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    // ✅ check file exists
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // ===== STREAM UPLOAD FUNCTION =====
    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "uploads", // optional cloudinary folder
            resource_type: "image",
          },
          (error, result) => {
            if (error) {
              console.error("🔥 CLOUDINARY ERROR:", error);
              return reject(error);
            }

            console.log("✅ Upload success:", result.secure_url);
            resolve(result);
          }
        );

        // buffer → readable stream → cloudinary
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    // upload image
    const result = await streamUpload(req.file.buffer);

    // send image URL
    res.status(200).json({
      imageUrl: result.secure_url,
    });

  } catch (error) {
    console.error("❌ SERVER ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;