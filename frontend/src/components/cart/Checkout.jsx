import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PayPalButton from "./PayPalButton";

const cart = {
  products: [
    { name: "Stylish Jacket", size: "M", color: "Black", price: 200, image: "https://picsum.photos/150?random=1" },
    { name: "Casual Sneakers", size: "42", color: "White", price: 300, image: "https://picsum.photos/150?random=2" },
  ],
  totalPrice: 500,
};

const Checkout = () => {
  const navigate = useNavigate();
  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "", lastName: "", address: "", city: "", postalCode: "", country: "", phone: ""
  });

  const handleCreateCheckout = (e) => {
    e.preventDefault();
    for (const field in shippingAddress) {
      if (!shippingAddress[field]) {
        alert(`Please fill in your ${field}`);
        return;
      }
    }
    setCheckoutId(123);
  };

  const handlePaymentSuccess = (details) => {
    console.log("Payment Successful", details);
    navigate("/orderconfirm");
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* ORDER SUMMARY - LEFT */}
        <div className="bg-white shadow-2xl rounded-3xl p-10 border border-gray-100">
          <h2 className="text-3xl font-bold mb-6 uppercase tracking-wide text-gray-800">Order Summary</h2>
          <div className="space-y-6">
            {cart.products.map((p, i) => (
              <div key={i} className="flex items-center gap-5 border-b border-gray-200 pb-4">
                <img src={p.image} alt={p.name} className="w-24 h-24 object-cover rounded-2xl shadow-sm"/>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{p.name}</h3>
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

        {/* CHECKOUT FORM - RIGHT */}
        <div className="bg-white shadow-2xl rounded-3xl p-10 border border-gray-100">
          <h2 className="text-3xl font-bold mb-8 uppercase tracking-wide text-gray-800">Checkout</h2>
          <form onSubmit={handleCreateCheckout} className="space-y-6">

            {/* Contact */}
            <div>
              <label className="block text-gray-500 text-sm mb-1">Email</label>
              <input
                type="email"
                value="user@example.com"
                disabled
                className="w-full p-4 border border-gray-300 rounded-2xl bg-gray-100 text-sm cursor-not-allowed focus:ring-2 focus:ring-indigo-300 transition"
              />
            </div>

            {/* Address Fields */}
            <div className="grid grid-cols-2 gap-4">
              <InputField label="First Name" value={shippingAddress.firstName} onChange={(e) => setShippingAddress({...shippingAddress, firstName:e.target.value})}/>
              <InputField label="Last Name" value={shippingAddress.lastName} onChange={(e) => setShippingAddress({...shippingAddress, lastName:e.target.value})}/>
            </div>
            <InputField label="Address" fullWidth value={shippingAddress.address} onChange={(e) => setShippingAddress({...shippingAddress, address:e.target.value})}/>
            <div className="grid grid-cols-2 gap-4">
              <InputField label="City" value={shippingAddress.city} onChange={(e) => setShippingAddress({...shippingAddress, city:e.target.value})}/>
              <InputField label="Postal Code" value={shippingAddress.postalCode} onChange={(e) => setShippingAddress({...shippingAddress, postalCode:e.target.value})}/>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Country" value={shippingAddress.country} onChange={(e) => setShippingAddress({...shippingAddress, country:e.target.value})}/>
              <InputField label="Phone" value={shippingAddress.phone} onChange={(e) => setShippingAddress({...shippingAddress, phone:e.target.value})}/>
            </div>

            {/* Payment */}
            <div>
              {!checkoutId ? (
                <button className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600 text-white rounded-2xl font-semibold text-sm transition-all shadow-lg">
                  Continue to Payment
                </button>
              ) : (
                <ErrorBoundary>
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-700">Pay with PayPal</h3>
                    <PayPalButton
                      amount={cart.totalPrice}
                      onSuccess={handlePaymentSuccess}
                      onError={(err) => { console.error(err); alert("Payment failed."); }}
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

// Input Component
const InputField = ({ label, value, onChange, fullWidth=false }) => (
  <div className={fullWidth ? "w-full" : ""}>
    <label className="block text-gray-500 text-sm mb-1">{label}</label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="w-full p-4 border border-gray-300 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
      required
    />
  </div>
);

// Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props){ super(props); this.state={hasError:false}; }
  static getDerivedStateFromError(error){ return {hasError:true}; }
  componentDidCatch(error,errorInfo){ console.error(error,errorInfo); }
  render(){ 
    if(this.state.hasError) return <div className="p-4 bg-red-100 text-red-700 rounded-2xl">Payment component error</div>;
    return this.props.children; 
  }
}

export default Checkout;
