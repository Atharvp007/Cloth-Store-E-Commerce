import { Link } from "react-router-dom";
import { useState, useEffect } from "react"; // ✅ import useState and useEffect
import { useDispatch, useSelector } from "react-redux"; // ✅ import Redux hooks
import { Pencil, Trash2, Package, ChevronLeft, ChevronRight } from "lucide-react";

import { fetchAdminProducts, deleteProduct } from "../../redux/slices/adminproductSlice"; // ✅ import your slice actions

const ProductManagement = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.adminProducts);

  const [currentPage, setCurrentPage] = useState(1);
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete the Product?")) {
      setRemovingId(id);
      setTimeout(() => {
        dispatch(deleteProduct(id));
        setRemovingId(null);
      }, 300);
    }
  };

  const productsPerPage = 5;
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + productsPerPage);

  return (
    <div className="max-w-7xl mx-auto p-8">
      {loading && <p>Loading ...</p>}
      {error && <p>Error: {error}</p>}

      {!loading && !error && (
        <>
          {/* HEADER */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Product Management</h2>
            <Link
              to="/admin/products/create"
              className="bg-gradient-to-r from-indigo-500 to-purple-600
                text-white px-5 py-2 rounded-xl shadow-md
                hover:scale-105 hover:shadow-lg transition"
            >
              + Add Product
            </Link>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full table-fixed text-sm text-gray-600">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 text-xs uppercase text-gray-700">
                  <tr>
                    <th className="py-4 px-6 w-1/4 text-left">Product</th>
                    <th className="py-4 px-6 w-1/4 text-left">Price</th>
                    <th className="py-4 px-6 w-1/4 text-left">SKU</th>
                    <th className="py-4 px-6 w-1/4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {currentProducts.map((product) => (
                    <tr
                      key={product._id}
                      className={`border-b transition-all duration-300 ${
                        removingId === product._id ? "opacity-0 scale-95" : "opacity-100 scale-100"
                      } hover:bg-gray-50`}
                    >
                      <td className="px-6 py-5 font-medium text-gray-900 truncate">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-indigo-100 rounded-lg">
                            <Package size={18} className="text-indigo-600" />
                          </div>
                          {product.name}
                        </div>
                      </td>
                      <td className="px-6 py-5 font-semibold">${product.price}</td>
                      <td className="px-6 py-5 text-gray-500">{product.sku}</td>
                      <td className="px-6 py-5">
                        <div className="flex justify-center gap-3">
                          <Link
                            to={`/admin/products/${product._id}/edit`}
                            className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1.5 rounded-lg hover:bg-yellow-600 hover:scale-105 transition"
                          >
                            <Pencil size={16} />
                            Edit
                          </Link>

                          <button
                            onClick={() => handleDelete(product._id)}
                            className="flex items-center gap-1 bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 hover:scale-105 transition"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-5 bg-gradient-to-r from-gray-50 to-gray-100 border-t">
              <p className="text-sm text-gray-600 font-medium">
                Showing <span className="font-semibold text-gray-900">{startIndex + 1}</span> to{" "}
                <span className="font-semibold text-gray-900">
                  {Math.min(startIndex + productsPerPage, products.length)}
                </span>{" "}
                of <span className="font-semibold text-indigo-600">{products.length}</span> products
              </p>

              <div className="flex items-center gap-2 bg-white shadow-md rounded-xl px-3 py-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-40"
                >
                  <ChevronLeft size={18} />
                </button>

                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  if (page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`min-w-[36px] h-9 rounded-lg text-sm font-semibold transition
                        ${currentPage === page ? "bg-indigo-600 text-white shadow-lg scale-105" : "hover:bg-gray-100"}`}
                      >
                        {page}
                      </button>
                    );
                  }
                  if (page === currentPage - 2 || page === currentPage + 2) {
                    return <span key={page} className="px-1 text-gray-400">...</span>;
                  }
                  return null;
                })}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-40"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductManagement;