// routes/products.js
const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// ================= GET ALL PRODUCTS =================
router.get("/", protect, admin, async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

// ================= GET SINGLE PRODUCT =================
router.get("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("GET PRODUCT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

// ================= CREATE PRODUCT =================
router.post("/", protect, admin, async (req, res) => {
  try {
    const {
      name,
      price,
      sku,
      description,
      category,
      countInStock,
      collections,
      gender,
      sizes,
      colors,
      images, // ✅ expect array of objects {url, altText}
      brand,
      material,
      isFeatured,
      isPublished,
      metaTitle,
      metaDescription,
      metaKeywords,
      dimensions,
      weight,
      tags,
      discountPrice,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !price ||
      !sku ||
      !description ||
      !category ||
      countInStock === undefined ||
      !collections ||
      !gender ||
      !Array.isArray(sizes) || sizes.length === 0 ||
      !Array.isArray(colors) || colors.length === 0 ||
      !Array.isArray(images) || images.length === 0
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const product = new Product({
      name,
      price,
      sku,
      description,
      category,
      countInStock,
      collections,
      gender,
      sizes,
      colors,
      images,
      user: req.user._id, // set user from auth middleware
      brand,
      material,
      isFeatured,
      isPublished,
      metaTitle,
      metaDescription,
      metaKeywords,
      dimensions,
      weight,
      tags,
      discountPrice,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);

  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

// ================= UPDATE PRODUCT =================
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const {
      name,
      price,
      sku,
      description,
      category,
      countInStock,
      sizes,
      colors,
      collections,
      gender,
      images,
      brand,
      material,
      isFeatured,
      isPublished,
      metaTitle,
      metaDescription,
      metaKeywords,
      dimensions,
      weight,
      tags,
      discountPrice,
    } = req.body;

    // Update fields only if provided
    product.name = name || product.name;
    product.price = price || product.price;
    product.sku = sku || product.sku;
    product.description = description || product.description;
    product.category = category || product.category;
    product.countInStock = countInStock ?? product.countInStock;
    product.sizes = sizes || product.sizes;
    product.colors = colors || product.colors;
    product.collections = collections || product.collections;
    product.gender = gender || product.gender;
    product.images = images || product.images;
    product.brand = brand || product.brand;
    product.material = material || product.material;
    product.isFeatured = isFeatured ?? product.isFeatured;
    product.isPublished = isPublished ?? product.isPublished;
    product.metaTitle = metaTitle || product.metaTitle;
    product.metaDescription = metaDescription || product.metaDescription;
    product.metaKeywords = metaKeywords || product.metaKeywords;
    product.dimensions = dimensions || product.dimensions;
    product.weight = weight || product.weight;
    product.tags = tags || product.tags;
    product.discountPrice = discountPrice || product.discountPrice;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

// ================= DELETE PRODUCT =================
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();
    res.status(200).json({ message: "Product removed successfully" });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
