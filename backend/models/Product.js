const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    // ---------------- BASIC INFO ----------------
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discountPrice: {
      type: Number,
      validate: {
        validator: function (value) {
          // discount must be less than original price
          return !value || value < this.price;
        },
        message: "Discount price must be less than original price",
      },
    },

    // ---------------- INVENTORY ----------------
    countInStock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    // ---------------- CATEGORY ----------------
    category: {
      type: String,
      required: true,
      trim: true,
    },

    brand: {
      type: String,
      trim: true,
    },

    collections: {
      type: String,
      required: true,
    },

    material: {
      type: String,
    },

    gender: {
      type: String,
      enum: ["Men", "Women", "Unisex"],
      required: true,
    },

    // ---------------- VARIANTS ----------------
    sizes: {
      type: [String],
      required: true,
    },

    colors: {
      type: [String],
      required: true,
    },

    // ---------------- IMAGES ----------------
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        altText: {
          type: String,
          default: "Product image",
        },
      },
    ],

    // ---------------- VISIBILITY ----------------
    isFeatured: {
      type: Boolean,
      default: false,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },

    // ---------------- REVIEWS ----------------
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    numReviews: {
      type: Number,
      default: 0,
    },

    tags: [String],

    // ---------------- OWNER ----------------
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ---------------- SEO ----------------
    metaTitle: String,
    metaDescription: String,
    metaKeywords: String,

    // ---------------- SHIPPING ----------------
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },

    weight: Number,
  },
  {
    timestamps: true,

    // ⭐ IMPORTANT — enables virtual fields in API response
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


// ---------------- INDEXES (FAST SEARCH) ----------------
productSchema.index({ name: "text", description: "text" });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
productSchema.index({ createdAt: -1 });


// ---------------- VIRTUAL FIELD ----------------
// Discount percentage
productSchema.virtual("discountPercent").get(function () {
  if (!this.discountPrice) return 0;

  return Math.round(
    ((this.price - this.discountPrice) / this.price) * 100
  );
});


// ⭐ Extra Virtual (Recommended)
// Final selling price
productSchema.virtual("finalPrice").get(function () {
  return this.discountPrice || this.price;
});


// ---------------- EXPORT MODEL ----------------
module.exports = mongoose.model("Product", productSchema);