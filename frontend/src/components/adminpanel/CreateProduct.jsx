// src/pages/admin/CreateProduct.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createProduct } from "../../redux/slices/adminproductSlice";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    collections: "",
    gender: "",
    sizes: [],
    colors: [],
    images: [],
  });

  const [uploading, setUploading] = useState(false);

  // INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  // IMAGE UPLOAD
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);

      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setProductData((prev) => ({
        ...prev,
        images: [...prev.images, { url: data.imageUrl, altText: "" }],
      }));

      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  // SUBMIT HANDLER
  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Validate required fields individually
    if (!productData.name.trim()) return alert("Please fill out Name");
    if (!productData.description.trim()) return alert("Please fill out Description");
    if (!productData.price) return alert("Please fill out Price");
    if (!productData.countInStock && productData.countInStock !== 0) return alert("Please fill out Count In Stock");
    if (!productData.sku.trim()) return alert("Please fill out SKU");
    if (!productData.category.trim()) return alert("Please fill out Category");
    if (!productData.collections.trim()) return alert("Please fill out Collections");
    if (!productData.gender.trim()) return alert("Please select Gender");
    if (!productData.sizes.length) return alert("Please add at least one Size");
    if (!productData.colors.length) return alert("Please add at least one Color");
    if (!productData.images.length) return alert("Please upload at least one Image");

    // Dispatch to Redux
    dispatch(createProduct(productData));
    navigate("/admin/products");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg border p-10">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">Create Product</h2>

        <form onSubmit={handleSubmit} className="space-y-7">
          {/* NAME */}
          <div>
            <label className="label">Product Name</label>
            <input
              name="name"
              value={productData.name}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="label">Category</label>
            <input
              name="category"
              value={productData.category}
              onChange={handleChange}
              className="input"
              placeholder="e.g. T-Shirts, Hoodies"
              required
            />
          </div>

          {/* COLLECTIONS */}
          <div>
            <label className="label">Collections</label>
            <input
              name="collections"
              value={productData.collections}
              onChange={handleChange}
              className="input"
              placeholder="e.g. Summer 2026"
              required
            />
          </div>

          {/* GENDER */}
          <div>
            <label className="label">Gender</label>
            <select
              name="gender"
              value={productData.gender}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Select Gender</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="label">Description</label>
            <textarea
              rows="4"
              name="description"
              value={productData.description}
              onChange={handleChange}
              className="input resize-none"
            />
          </div>

          {/* PRICE + STOCK */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="label">Price</label>
              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div>
              <label className="label">Count In Stock</label>
              <input
                type="number"
                name="countInStock"
                value={productData.countInStock}
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>

          {/* SKU */}
          <div>
            <label className="label">SKU</label>
            <input
              name="sku"
              value={productData.sku}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* SIZES */}
          <div>
            <label className="label">Sizes (comma separated)</label>
            <input
              value={productData.sizes.join(", ")}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  sizes: e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
              className="input"
            />
          </div>

          {/* COLORS */}
          <div>
            <label className="label">Colors (comma separated)</label>
            <input
              value={productData.colors.join(", ")}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  colors: e.target.value
                    .split(",")
                    .map((c) => c.trim())
                    .filter(Boolean),
                })
              }
              className="input"
            />
          </div>

          {/* IMAGE UPLOAD */}
          <div>
            <label className="label">Upload Image</label>
            <label className="uploadBox">
              <input
                type="file"
                onChange={handleImageUpload}
                className="hidden"
              />
              <p className="text-gray-500">
                {uploading ? "Uploading..." : "Click to upload or drag image here"}
              </p>
            </label>
          </div>

          {/* IMAGE PREVIEW */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {productData.images.map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt={img.altText || "preview"}
                className="h-28 w-full object-cover rounded-lg border hover:shadow-md transition"
              />
            ))}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
          >
            Create Product
          </button>
        </form>
      </div>

      {/* GLOBAL STYLES */}
      <style>{`
        .label{
          display:block;
          font-weight:600;
          margin-bottom:6px;
          color:#374151;
        }
        .input{
          width:100%;
          padding:12px 14px;
          border:1px solid #d1d5db;
          border-radius:10px;
          background:#fff;
          transition:0.2s;
          outline:none;
        }
        .input:focus{
          border-color:#111827;
          box-shadow:0 0 0 2px rgba(17,24,39,0.08);
        }
        .uploadBox{
          display:flex;
          justify-content:center;
          align-items:center;
          height:120px;
          border:2px dashed #d1d5db;
          border-radius:12px;
          cursor:pointer;
          transition:0.2s;
        }
        .uploadBox:hover{
          border-color:#111827;
          background:#fafafa;
        }
      `}</style>
    </div>
  );
};

export default CreateProduct;
