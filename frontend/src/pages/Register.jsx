import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  UserCircle,
  ArrowRight,
  Calendar,
  Eye,
  EyeOff,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/actions/userActions";
import { motion } from "framer-motion";

export default function Register() {
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
    const payload = {
      fullName: {
        firstName: data.firstName,
        lastName: data.lastName,
      },
      email: data.email,
      password: data.password,
      userName: data.username,
    };
    const resultAction = await dispatch(registerUser(payload));

    if (registerUser.fulfilled.match(resultAction)) {
      navigate("/dashboard");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row overflow-x-hidden">
      {/* Left Panel - Register Form */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-24 bg-white order-2 lg:order-1 overflow-y-auto"
      >
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2 mb-8"
          >
            <div className="bg-black text-white p-2 rounded-lg">
              <Calendar size={20} />
            </div>
            <span className="text-xl font-bold">Eventify</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </h1>
            <p className="text-gray-500">Sign up to get started</p>
          </motion.div>

          {/* API Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {typeof error === "string"
                ? error
                : "Something went wrong. Please try again."}
            </motion.div>
          )}

          {/* Form */}
          <motion.form
            variants={formVariants}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* First Name */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    placeholder="Suraj"
                    className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${
                      errors.firstName ? "border-red-500" : "border-gray-200"
                    } rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all`}
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                  />
                </div>
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1 ml-1">
                    {errors.firstName.message}
                  </p>
                )}
              </motion.div>

              {/* Last Name */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    placeholder="Verma"
                    className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${
                      errors.lastName ? "border-red-500" : "border-gray-200"
                    } rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all`}
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                  />
                </div>
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1 ml-1">
                    {errors.lastName.message}
                  </p>
                )}
              </motion.div>
            </div>

            {/* Username */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <UserCircle size={18} />
                </div>
                <input
                  type="text"
                  placeholder="imsuraj16"
                  className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${
                    errors.username ? "border-red-500" : "border-gray-200"
                  } rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all`}
                  {...register("username", {
                    required: "Username is required",
                  })}
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.username.message}
                </p>
              )}
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  placeholder="sv63619@gmail.com"
                  className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${
                    errors.email ? "border-red-500" : "border-gray-200"
                  } rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all`}
                  {...register("email", { required: "Email is required" })}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.email.message}
                </p>
              )}
            </motion.div>

            {/* Password */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••"
                  className={`w-full pl-10 pr-10 py-3 bg-gray-50 border ${
                    errors.password ? "border-red-500" : "border-gray-200"
                  } rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all`}
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
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.password.message}
                </p>
              )}
            </motion.div>

            {/* Submit Button with Loader */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 bg-black text-white py-3.5 rounded-xl font-medium transition-all hover:bg-gray-800 hover:shadow-lg ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <>
                  <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Register <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-sm text-gray-600 mt-8"
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-black hover:underline"
            >
              Sign in
            </Link>
          </motion.p>
        </div>
      </motion.div>

      {/* Right Panel - Visual */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full lg:w-1/2 bg-[#050505] relative overflow-hidden flex items-center justify-center p-8 order-1 lg:order-2 min-h-[300px] lg:min-h-screen"
      >
        {/* Background Gradients */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none"
        ></motion.div>
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"
        ></motion.div>

        <div className="relative z-10 w-full max-w-lg text-center lg:text-left">
          {/* Decorative Cards */}
          <div className="relative w-64 h-64 mx-auto mb-12 hidden lg:block">
            <motion.div
              animate={{ rotate: [12, 15, 12], y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 right-0 w-48 h-48 bg-gray-800/50 backdrop-blur-xl rounded-3xl border border-white/10 transform translate-x-8"
            ></motion.div>
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-4 right-4 w-48 h-48 bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl"
            ></motion.div>
          </div>

          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl lg:text-4xl font-bold text-white mb-4"
            >
              Join Eventify
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-gray-400 text-lg leading-relaxed max-w-md mx-auto"
            >
              Create an account to start managing your events and reminders
              efficiently.
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
