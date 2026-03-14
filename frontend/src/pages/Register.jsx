import { useState, useEffect } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import loginpage from "../assets/loginpage.jpg";

import { registerUser } from "../redux/slices/authSlice";
import { mergeCart } from "../redux/slices/cartSlice";

import { useDispatch, useSelector } from "react-redux";

const Register = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { user, guestId, loading } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect =
    new URLSearchParams(location.search).get("redirect") || "/";

  const isCheckoutRedirect = redirect.includes("checkout");

  /* ---------------- Redirect after register ---------------- */

  useEffect(() => {
    if (user) {
      if (cart?.products?.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, user })).then(() => {
          navigate(isCheckoutRedirect ? "/checkout" : "/");
        });
      } else {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch]);

  /* ---------------- Register Submit ---------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const resultAction = await dispatch(
        registerUser({ name, email, password })
      );

      if (registerUser.fulfilled.match(resultAction)) {
        toast.success(`Welcome, ${name}! ✨`);
      } else {
        toast.error(resultAction.payload || "Registration failed");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-100 via-white to-gray-200 overflow-hidden font-sans">

      {/* Left Image Section */}
      <div className="hidden md:flex w-1/2 relative overflow-hidden">
        <img
          src={loginpage}
          alt="Register Visual"
          className="w-full h-[600px] object-cover scale-105 hover:scale-110 transition-transform duration-1000 ease-in-out mx-auto mt-12 rounded-2xl shadow-xl"
        />

        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-2xl" />

        <div className="absolute bottom-24 left-12 text-white max-w-sm animate-fadeIn">
          <h2 className="text-4xl font-bold leading-tight mb-3 drop-shadow-xl tracking-tight">
            Elevate Your Style
          </h2>

          <p className="text-sm text-gray-200 drop-shadow-md">
            Join our fashion community and discover curated collections.
          </p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="flex flex-1 items-center justify-center px-6 py-12 relative z-10">

        <Card className="w-full max-w-md p-10 rounded-3xl
                     bg-white/70 backdrop-blur-2xl
                     shadow-2xl border border-white/30
                     transition-all duration-700 hover:scale-[1.03]">

          {/* Header */}
          <div className="text-center mb-8 animate-fadeIn">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Create Account
            </h1>

            <p className="text-gray-500 text-sm mt-2">
              Sign up to start your fashion journey
            </p>
          </div>

          <CardContent className="p-0">
            <form className="space-y-6" onSubmit={handleSubmit}>

              {/* Name */}
              <div className="space-y-2 animate-fadeUp delay-100">
                <Label className="text-sm font-semibold text-gray-700">
                  Full Name
                </Label>

                <Input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 rounded-xl border-gray-300 focus:border-black focus:ring-2 focus:ring-black/20 transition-all duration-300 shadow-sm"
                />
              </div>

              {/* Email */}
              <div className="space-y-2 animate-fadeUp delay-200">
                <Label className="text-sm font-semibold text-gray-700">
                  Email Address
                </Label>

                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-xl border-gray-300 focus:border-black focus:ring-2 focus:ring-black/20 transition-all duration-300 shadow-sm"
                />
              </div>

              {/* Password */}
              <div className="space-y-2 animate-fadeUp delay-300">
                <Label className="text-sm font-semibold text-gray-700">
                  Password
                </Label>

                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-xl border-gray-300 focus:border-black focus:ring-2 focus:ring-black/20 transition-all duration-300 shadow-sm"
                />
              </div>

              {/* Sign Up Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl
                           bg-gradient-to-r from-black to-gray-800
                           text-white font-semibold
                           shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>

                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      ></path>
                    </svg>

                    Creating Account...
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>

              {/* Login Link */}
              <p className="text-center text-sm text-gray-600 mt-3 animate-fadeUp delay-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-black hover:underline"
                >
                  Sign In
                </Link>
              </p>

            </form>
          </CardContent>

        </Card>
      </div>
    </div>
  );
};

export default Register;
