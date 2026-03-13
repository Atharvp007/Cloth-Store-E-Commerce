import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PayPalButton from "./PayPalButton";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../redux/slices/checkoutSlice";
import { clearCart } from "../../redux/slices/cartSlice";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [checkoutId, setCheckoutId] = useState(null);
  const [loadingAction, setLoadingAction] = useState(false);
  const [errors, setErrors] = useState({});
  const [paymentCompleted, setPaymentCompleted] = useState(false); // <-- fixes redirect

  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  // Redirect only if cart is empty and payment not completed
  useEffect(() => {
    if ((!cart || !cart.products || cart.products.length === 0) && !paymentCompleted) {
      navigate("/");
    }
  }, [cart, navigate, paymentCompleted]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!shippingAddress.firstName)
      newErrors.firstName = "First Name is required";
    if (!shippingAddress.address) newErrors.address = "Address is required";
    if (!shippingAddress.phone) newErrors.phone = "Phone is required";
    if (!shippingAddress.city) newErrors.city = "City is required";
    if (!shippingAddress.country) newErrors.country = "Country is required";
    if (!shippingAddress.postalCode)
      newErrors.postalCode = "Postal code is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateCheckout = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (cart && cart.products.length > 0) {
      try {
        setLoadingAction(true);
        const res = await dispatch(
          createCheckout({
            checkoutItems: cart.products,
            shippingAddress,
            paymentMethod: "Paypal",
            totalPrice: cart.totalPrice,
          })
        );

        if (res.payload && res.payload._id) {
          setCheckoutId(res.payload._id);
        }
      } catch (err) {
        console.error("Checkout creation failed:", err);
        alert("Failed to create checkout. Please try again.");
      } finally {
        setLoadingAction(false);
      }
    }
  };

  const handlePaymentSuccess = async (details) => {
    if (!checkoutId) return console.error("No checkout ID available");

    try {
      setLoadingAction(true);

      // Mark payment as paid
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        {
          paymentStatus: "paid",
          paymentDetails: details,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      // Finalize checkout
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      // Clear cart
      dispatch(clearCart());

      // Mark payment completed to prevent redirect to home
      setPaymentCompleted(true);

      // Navigate to order confirmation
      navigate("/orderconfirm");
    } catch (err) {
      console.error("Payment processing failed:", err);
      alert("Payment could not be completed. Please try again.");
    } finally {
      setLoadingAction(false);
    }
  };

  if (loading) return <p>Loading cart ...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!cart || !cart.products || cart.products.length === 0) {
    return <p>Your cart is empty</p>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* ORDER SUMMARY */}
        <div className="bg-white shadow-2xl rounded-3xl p-10 border border-gray-100">
          <h2 className="text-3xl font-bold mb-6 uppercase tracking-wide text-gray-800">
            Order Summary
          </h2>
          <div className="space-y-6">
            {cart.products.map((p, i) => (
              <div
                key={i}
                className="flex items-center gap-5 border-b border-gray-200 pb-4"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-24 h-24 object-cover rounded-2xl shadow-sm"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {p.name}
                  </h3>
                  <p className="text-gray-500 text-sm">Size: {p.size}</p>
                  <p className="text-gray-500 text-sm">Color: {p.color}</p>
                </div>
                <p className="text-lg font-bold text-gray-900">${p.price}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-8 pt-4 border-t border-gray-200 font-semibold text-gray-900 text-xl">
            <span>Total:</span>
            <span>${cart.totalPrice}</span>
          </div>
        </div>

        {/* CHECKOUT FORM */}
        <div className="bg-white shadow-2xl rounded-3xl p-10 border border-gray-100">
          <h2 className="text-3xl font-bold mb-8 uppercase tracking-wide text-gray-800">
            Checkout
          </h2>

          <form onSubmit={handleCreateCheckout} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-gray-500 text-sm mb-1">Email</label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full p-4 border border-gray-300 rounded-2xl bg-gray-100 text-sm cursor-not-allowed focus:ring-2 focus:ring-indigo-300 transition"
              />
            </div>

            {/* Shipping Address */}
            <div className="grid grid-cols-2 gap-4">
              <InputField
                name="firstName"
                label="First Name"
                value={shippingAddress.firstName}
                onChange={handleInputChange}
                error={errors.firstName}
              />
              <InputField
                name="lastName"
                label="Last Name"
                value={shippingAddress.lastName}
                onChange={handleInputChange}
              />
            </div>

            <InputField
              name="address"
              label="Address"
              fullWidth
              value={shippingAddress.address}
              onChange={handleInputChange}
              error={errors.address}
            />

            <div className="grid grid-cols-2 gap-4">
              <InputField
                name="city"
                label="City"
                value={shippingAddress.city}
                onChange={handleInputChange}
                error={errors.city}
              />
              <InputField
                name="postalCode"
                label="Postal Code"
                value={shippingAddress.postalCode}
                onChange={handleInputChange}
                error={errors.postalCode}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField
                name="country"
                label="Country"
                value={shippingAddress.country}
                onChange={handleInputChange}
                error={errors.country}
              />
              <InputField
                name="phone"
                label="Phone"
                value={shippingAddress.phone}
                onChange={handleInputChange}
                error={errors.phone}
              />
            </div>

            {/* Payment */}
            <div>
              {!checkoutId ? (
                <button
                  type="submit"
                  disabled={loadingAction}
                  className={`w-full py-4 text-white rounded-2xl font-semibold text-sm transition-all shadow-lg ${
                    loadingAction
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600"
                  }`}
                >
                  {loadingAction ? "Processing..." : "Continue to Payment"}
                </button>
              ) : (
                <ErrorBoundary>
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-700">
                      Pay with PayPal
                    </h3>
                    <PayPalButton
                      amount={cart.totalPrice}
                      onSuccess={handlePaymentSuccess}
                      onError={(err) => {
                        console.error(err);
                        alert("Payment failed.");
                      }}
                    />
                  </div>
                </ErrorBoundary>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Input Field Component
const InputField = ({ label, value, onChange, fullWidth = false, error, name }) => (
  <div className={fullWidth ? "w-full" : ""}>
    <label className="block text-gray-500 text-sm mb-1">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full p-4 border rounded-2xl text-sm focus:outline-none focus:ring-2 transition ${
        error ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-indigo-300"
      }`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

// Error Boundary for PayPal Button
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError)
      return (
        <div className="p-4 bg-red-100 text-red-700 rounded-2xl">
          Payment component error
        </div>
      );

    return this.props.children;
  }
}

export default Checkout;