import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import loginpage from "../assets/loginpage.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Welcome back ✨");
    navigate("/");
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
        <div className="absolute bottom-24 left-12 text-white max-w-sm animate-fadeIn">
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
        <Card
          className="w-full max-w-md p-10 rounded-3xl
                     bg-white/70 backdrop-blur-2xl
                     shadow-2xl border border-white/30
                     transition-all duration-700 hover:scale-[1.03] hover:shadow-3xl"
        >
          {/* Header */}
          <div className="text-center mb-8 animate-fadeIn">
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
              <div className="space-y-2 animate-fadeUp delay-100">
                <Label className="text-sm font-semibold text-gray-700">
                  Email Address
                </Label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-xl border-gray-300
                             focus:border-black focus:ring-2
                             focus:ring-black/20 transition-all duration-300
                             hover:scale-[1.01] shadow-sm"
                />
              </div>

              {/* Password */}
              <div className="space-y-2 animate-fadeUp delay-200">
                <Label className="text-sm font-semibold text-gray-700">
                  Password
                </Label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-xl border-gray-300
                             focus:border-black focus:ring-2
                             focus:ring-black/20 transition-all duration-300
                             hover:scale-[1.01] shadow-sm"
                />
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                className="w-full h-12 rounded-xl
                           bg-gradient-to-r from-black to-gray-800
                           text-white font-semibold
                           hover:scale-[1.03] hover:from-gray-900 hover:to-black
                           transition-all duration-300 ease-in-out shadow-lg"
              >
                Sign In
              </Button>

              {/* Signup Link */}
              <p className="text-center text-sm text-gray-600 mt-3 animate-fadeUp delay-300">
                Don’t have an account?{" "}
                <Link
                  to="/Register"
                  className="font-medium text-black hover:underline"
                >
                  Register
                </Link>
              </p>

            </form>
          </CardContent>
        </Card>
      </div>

      {/* Tailwind Animations */}
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn { animation: fadeIn 1s ease forwards; }
          .animate-fadeUp { animation: fadeIn 0.8s ease forwards; }
          .animate-fadeUp.delay-100 { animation-delay: 0.1s; }
          .animate-fadeUp.delay-200 { animation-delay: 0.2s; }
          .animate-fadeUp.delay-300 { animation-delay: 0.3s; }
        `}
      </style>
    </div>
  );
};

export default Login;
