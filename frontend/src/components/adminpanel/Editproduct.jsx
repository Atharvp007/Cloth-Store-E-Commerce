import React, { useState } from "react";

const Editproduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    sizes: [],
    colors: [],
    images: [
      { url: "https://picsum.photos/150?random=1" },
      { url: "https://picsum.photos/150?random=2" },
    ],
  });

  /* ---------- INPUT ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  /* ---------- IMAGE ---------- */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    setProductData((prev) => ({
      ...prev,
      images: [...prev.images, { url: previewUrl }],
    }));
  };

  /* ---------- SUBMIT ---------- */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(productData);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg border p-10">

        {/* HEADER */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">
          Edit Product
        </h2>

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
                  sizes: e.target.value.split(",").map((s) => s.trim()),
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
                  colors: e.target.value.split(",").map((c) => c.trim()),
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
                Click to upload or drag image here
              </p>
            </label>
          </div>

          {/* IMAGE PREVIEW */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {productData.images.map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt="preview"
                className="h-28 w-full object-cover rounded-lg border hover:shadow-md transition"
              />
            ))}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-medium
            hover:bg-gray-800 transition"
          >
            Update Product
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

export default Editproduct;