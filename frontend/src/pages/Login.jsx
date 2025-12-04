import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/actions/userActions";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Calendar } from "lucide-react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    const resultAction = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(resultAction)) {
      navigate("/");
    }
  };

  return (
    <div className="h-screen w-full flex flex-col lg:flex-row overflow-hidden">
      {/* Left Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-24 bg-white order-2 lg:order-1 overflow-y-auto">
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="bg-black text-white p-2 rounded-lg">
              <Calendar size={20} />
            </div>
            <span className="text-xl font-bold">Eventify</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
            <p className="text-gray-500">Sign in to continue to your dashboard</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email / UserName</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  type="text"
                  placeholder="you@example.com"
                  className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all`}
                  {...register("email", {
                    required: "Email or Username is required",
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 mt-1 ml-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-10 py-3 bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all`}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1 ml-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 bg-black text-white py-3.5 rounded-xl font-medium transition-all hover:bg-gray-800 hover:shadow-lg ${loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
            >
              {loading ? (
                <>
                  <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In <ArrowRight size={18} />
                </>
              )}
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-600 mt-8">
              Don't have an account?{" "}
              <Link to="/register" className="font-semibold text-black hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Panel - Visual */}
      <div className="w-full lg:w-1/2 bg-[#050505] relative overflow-hidden flex items-center justify-center p-8 order-1 lg:order-2 min-h-[300px] lg:min-h-screen">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-lg text-center lg:text-left">
          {/* Decorative Cards */}
          <div className="relative w-64 h-64 mx-auto mb-12 hidden lg:block">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gray-800/50 backdrop-blur-xl rounded-3xl border border-white/10 transform rotate-12 translate-x-8"></div>
            <div className="absolute top-4 right-4 w-48 h-48 bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl"></div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Stay Organized</h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md mx-auto">
              Your personal event assistant is waiting. Sign in to manage your schedule seamlessly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;