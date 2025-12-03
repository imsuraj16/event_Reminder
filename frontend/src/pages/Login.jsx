import React from 'react';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Gradient Background */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-500 relative overflow-hidden p-8 lg:p-16 flex items-center justify-center min-h-[300px] lg:min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20"></div>
        <div className="relative z-10 text-white max-w-lg">
          <p className="text-sm mb-4 opacity-90">You can easily</p>
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            Speed up your work<br />
            with our Web App
          </h1>
        </div>
        {/* Decorative circles */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl"></div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Get Started Now</h2>
            <p className="text-gray-500 text-sm">Please log in to your account to continue.</p>
          </div>

          <div className="space-y-5">

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email address or userName
              </label>
              <input
                type="email"
                placeholder="webmail@gmail.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                  Forgot Password?
                </a>
              </div>
              <input
                type="password"
                placeholder="••••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-2 text-sm text-gray-600">
                I agree to the{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700">
                  Terms & Privacy
                </a>
              </label>
            </div>

            {/* Login Button */}
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200 shadow-lg shadow-blue-500/30">
              Login
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-600">
              Have an account?{' '}
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;