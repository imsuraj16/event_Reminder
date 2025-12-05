"use client";
import React, { useState, useEffect } from "react";
import {
  Clock,
  CloudSun,
  Calendar,
  Zap,
  Users,
  ArrowRight,
  RefreshCw,
  MapPin,
} from "lucide-react";
import Header from "../components/Header";
import { motion } from "framer-motion";

// --- RealTimeClock Component ---
const RealTimeClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Time format updated for a slightly bolder look on white background
  const timeString = currentTime
    .toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
    .replace(":", ":");

  const dateString = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="text-center mt-6">
      <div className="text-5xl font-extrabold tracking-tight text-gray-900">
        {timeString}
      </div>
      <div className="text-sm font-medium text-gray-600 mt-1">{dateString}</div>
    </div>
  );
};

// --- Main Landing Page Component ---
const EventifyLanding = () => {
  // Shadow adjusted for a light background
  const lightCardShadow =
    "shadow-xl shadow-gray-300/50 transition-shadow duration-300";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    // 1. Main container: White background, full viewport height, no scrolling
    <div className="min-h-screen w-full bg-white text-gray-900 font-sans flex flex-col overflow-x-hidden">
      {/* 2. Navigation Bar (White background, gray border) */}
      <Header />

      {/* 3. Main Content Area */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-12">
        <div className="flex flex-col lg:flex-row h-full gap-12 lg:gap-0">
          {/* Left Column: Hero Text & CTAs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full lg:w-2/3 lg:pr-10 flex flex-col justify-center space-y-8"
          >
            <motion.span
              variants={itemVariants}
              className="inline-flex items-center space-x-2 px-3 py-1 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full border border-gray-300 w-fit"
            >
              <Zap className="w-4 h-4" />
              <span>Smart Event Management</span>
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tighter text-gray-900"
            >
              Never Miss an <br />
              <span className="text-gray-500">Important</span> Moment <br />
              Again
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 max-w-xl"
            >
              Eventify helps you organize, track, and get timely reminders for
              all your events. Stay on top of your schedule with smart
              notifications and beautiful event management.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4"
            >
              {/* Monochromatic CTA buttons */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center space-x-2 bg-gray-900 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg shadow-gray-400/50 transition-colors"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent text-gray-700 hover:text-gray-900 border border-gray-400 hover:border-gray-900 font-semibold py-3 px-8 rounded-xl transition-colors"
              >
                View Demo
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Column: Information Cards in a Flex Row */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.6,
                },
              },
            }}
            className="w-full flex justify-center lg:justify-end items-center"
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* 1. Real-Time Clock Card - Square dimensions, light background */}
              <motion.div
                variants={cardVariants}
                whileHover={{ y: -10 }}
                className={`bg-gray-100 p-6 rounded-2xl w-56 h-56 flex flex-col justify-center items-center ${lightCardShadow}`}
              >
                <div className="flex items-center text-gray-500 mb-2">
                  <Clock className="w-5 h-5 mr-2" />
                  <span className="font-semibold text-sm uppercase tracking-wider">
                    Current Time
                  </span>
                </div>
                <RealTimeClock />
              </motion.div>

              {/* 2. Weather Card - Square dimensions, light background */}
              <motion.div
                variants={cardVariants}
                whileHover={{ y: -10 }}
                className={`bg-gray-100 p-6 rounded-2xl w-56 h-56 flex flex-col ${lightCardShadow}`}
              >
                <div className="flex items-center justify-between text-gray-500 mb-4">
                  <div className="flex items-center">
                    <CloudSun className="w-5 h-5 mr-2" />
                    <span className="font-semibold text-sm uppercase tracking-wider">
                      Weather
                    </span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-900 transition-colors">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-col items-start justify-center flex-grow">
                  <div className="text-6xl font-extrabold text-gray-900">
                    18°C
                  </div>
                  <div className="mt-3">
                    <div className="text-xl font-medium text-gray-700">
                      Partly Cloudy
                    </div>
                    <div className="text-sm text-gray-500 flex items-center mt-1">
                      <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                      San Francisco
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 3. Next Event Card - Square dimensions, light background */}
              <motion.div
                variants={cardVariants}
                whileHover={{ y: -10 }}
                className={`bg-gray-100 p-6 rounded-2xl w-56 h-56 flex flex-col ${lightCardShadow}`}
              >
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-gray-500 mr-3"></div>
                  <span className="font-semibold text-gray-500 text-sm uppercase tracking-wider">
                    Next Event
                  </span>
                </div>

                <div className="space-y-1 flex flex-col justify-center flex-grow">
                  <h3 className="text-xl font-bold text-gray-900">
                    Team Strategy Meeting
                  </h3>
                  <p className="text-sm text-gray-600 flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    <span>Today at 3:00 PM</span>
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                    <span>Conf. Room A</span>
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default EventifyLanding;
