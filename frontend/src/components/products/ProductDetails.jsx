import React, { useState } from "react";
import { toast } from "react-hot-toast";

const selectedProduct = {
  name: "Stylish Jacket",
  price: 120,
  originalPrice: 150,
  description: "This is a stylish Jacket perfect for any occasion",
  brand: "FashionBrand",
  material: "Leather",
  sizes: ["S", "M", "L", "XL"],
  colors: ["Red", "Black"],
  images: [
    {
      url: "https://picsum.photos/seed/jacket1/500/500",
      altText: "Stylish Jacket 1",
    },
    {
      url: "https://picsum.photos/seed/jacket2/500/500",
      altText: "Stylish Jacket 2",
    },
  ],
};

function ProductDetails() {
  const [mainImage, setMainImage] = useState(
    selectedProduct.images[0]?.url
  );
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleQuantityChange = (action) => {
    if (action === "plus") setQuantity((prev) => prev + 1);
    if (action === "minus" && quantity > 1)
      setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color first");
      return;
    }

    setIsButtonDisabled(true);

    setTimeout(() => {
      toast.success("Product added to cart!");
      setIsButtonDisabled(false);
    }, 800);
  };

  return (
    <div className="py-4 md:py-6 px-3 bg-gray-50">
      <div className="max-w-6xl mx-auto bg-white p-4 md:p-6 rounded-xl shadow">
        <div className="flex flex-col md:flex-row">

          {/* THUMBNAILS */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText}
                onClick={() => setMainImage(image.url)}
                className={`w-20 h-20 rounded-lg cursor-pointer border-2 transition
                ${
                  mainImage === image.url
                    ? "border-black scale-105"
                    : "border-gray-300"
                }`}
              />
            ))}
          </div>

          {/* MAIN IMAGE */}
          <div className="md:w-1/2">
            <div className="overflow-hidden rounded-xl">
              <img
                src={mainImage}
                alt="Main"
                className="w-full object-cover transition duration-500 hover:scale-110"
              />
            </div>
          </div>

          {/* PRODUCT INFO */}
          <div className="md:w-1/2 md:ml-8 mt-4 md:mt-0">

            <h1 className="text-3xl font-semibold mb-2">
              {selectedProduct.name}
            </h1>

            {/* PRICE */}
            <div className="flex items-center gap-3 mb-4">
              <p className="text-2xl font-bold">${selectedProduct.price}</p>
              <p className="line-through text-gray-400">
                ${selectedProduct.originalPrice}
              </p>
              <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
                {Math.round(
                  ((selectedProduct.originalPrice - selectedProduct.price) /
                    selectedProduct.originalPrice) *
                    100
                )}% OFF
              </span>
            </div>

            <p className="text-gray-600 mb-6">
              {selectedProduct.description}
            </p>

            {/* COLORS */}
            <div className="mb-6">
              <p className="font-medium mb-2">Color</p>
              <div className="flex gap-3">
                {selectedProduct.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    style={{ backgroundColor: color.toLowerCase() }}
                    className={`w-9 h-9 rounded-full border-2 transition hover:scale-110
                    ${
                      selectedColor === color
                        ? "ring-2 ring-black border-black scale-110"
                        : "border-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* SIZE */}
            <div className="mb-6">
              <p className="font-medium mb-2">Size</p>
              <div className="flex gap-3 flex-wrap">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 border
                    ${
                      selectedSize === size
                        ? "bg-black text-white shadow-lg border-black scale-105"
                        : "bg-white hover:bg-black hover:text-white border-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* ⭐ PREMIUM QUANTITY SELECTOR */}
            <div className="mb-8">
              <p className="font-medium mb-3">Quantity</p>

              <div className="flex items-center gap-4">

                <button
                  onClick={() => handleQuantityChange("minus")}
                  className="
                    w-11 h-11
                    flex items-center justify-center
                    rounded-full
                    border border-gray-300
                    text-xl font-semibold
                    transition-all duration-300
                    hover:bg-black hover:text-white hover:shadow-md
                    active:scale-90
                  "
                >
                  −
                </button>

                <span className="text-xl font-semibold min-w-[30px] text-center">
                  {quantity}
                </span>

                <button
                  onClick={() => handleQuantityChange("plus")}
                  className="
                    w-11 h-11
                    flex items-center justify-center
                    rounded-full
                    border border-gray-300
                    text-xl font-semibold
                    transition-all duration-300
                    hover:bg-black hover:text-white hover:shadow-md
                    active:scale-90
                  "
                >
                  +
                </button>

              </div>
            </div>

            {/* ADD TO CART */}
            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-300
              ${
                isButtonDisabled
                  ? "bg-gray-400"
                  : "bg-black hover:bg-gray-900 hover:-translate-y-1 hover:shadow-xl"
              }`}
            >
              {isButtonDisabled ? "Adding..." : "ADD TO CART"}
            </button>

            {/* CHARACTERISTICS */}
            <div className="mt-10">
              <h3 className="text-xl font-bold mb-4">Characteristics</h3>
              <table className="w-full text-sm">
                <tbody>
                  <tr>
                    <td className="py-2 text-gray-500">Brand</td>
                    <td>{selectedProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-500">Material</td>
                    <td>{selectedProduct.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
