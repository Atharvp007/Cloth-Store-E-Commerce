import { useState, useEffect } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import loginpage from "../assets/loginpage.jpg";
import { loginUser } from "../redux/slices/authSlice";
import { mergeCart } from "../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { user, guestId, loading } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect =
    new URLSearchParams(location.search).get("redirect") || "/";

  const isCheckoutRedirect = redirect.includes("checkout");

  /* ---------------- Redirect after login ---------------- */

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

  /* ---------------- Handle Login ---------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const resultAction = await dispatch(
        loginUser({ email, password })
      );

      if (loginUser.fulfilled.match(resultAction)) {
        toast.success("Welcome back ✨");
      } else {
        toast.error(
          resultAction.payload?.message ||
            "Invalid email or password"
        );
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-100 via-white to-gray-200 overflow-hidden font-sans">

      {/* Left Image Section */}
      <div className="hidden md:flex w-1/2 relative overflow-hidden">
        <img
          src={loginpage}
          alt="Login Visual"
          className="w-full h-[600px] object-cover scale-105 hover:scale-110 transition-transform duration-1000 ease-in-out mx-auto mt-12 rounded-2xl shadow-xl"
        />

        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-2xl" />

        <div className="absolute bottom-24 left-12 text-white max-w-sm">
          <h2 className="text-4xl font-bold leading-tight mb-3 drop-shadow-xl tracking-tight">
            Elevate Your Style
          </h2>

          <p className="text-sm text-gray-200 drop-shadow-md">
            Discover curated fashion designed for confidence and comfort.
          </p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="flex flex-1 items-center justify-center px-6 py-12 relative z-10">

        <Card className="w-full max-w-md p-10 rounded-3xl bg-white/70 backdrop-blur-2xl shadow-2xl border border-white/30 transition-all duration-700 hover:scale-[1.03]">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome Back
            </h1>

            <p className="text-gray-500 text-sm mt-2">
              Sign in to continue your fashion journey
            </p>
          </div>

          <CardContent className="p-0">
            <form className="space-y-6" onSubmit={handleSubmit}>

              {/* Email */}
              <div className="space-y-2">
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
              <div className="space-y-2">
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

              {/* Sign In Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-black to-gray-800 text-white font-semibold shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
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

                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>

              {/* Register */}
              <p className="text-center text-sm text-gray-600 mt-3">
                Don’t have an account?{" "}
                <Link
                  to={`/register?redirect=${encodeURIComponent(redirect)}`}
                  className="font-medium text-black hover:underline"
                >
                  Register
                </Link>
              </p>

            </form>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default Login;
