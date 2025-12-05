"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Clock,
  CloudSun,
  Calendar,
  Zap,
  Users,
  ArrowRight,
  RefreshCw,
  MapPin,
  CalendarX,
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
} from "lucide-react";
import Header from "../components/Header";
import { motion } from "framer-motion";
import { fetchEvents } from "../store/actions/eventActions";
import { Link } from "react-router-dom";

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
    <div className="text-center mt-4 sm:mt-6">
      <div className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
        {timeString}
      </div>
      <div className="text-xs sm:text-sm font-medium text-gray-600 mt-1">
        {dateString}
      </div>
    </div>
  );
};

// --- Main Landing Page Component ---
const EventifyLanding = () => {
  const dispatch = useDispatch();
  const { events, loading } = useSelector((state) => state.events);
  const { isAuthenticated } = useSelector((state) => state.user);

  // --- Weather State & Logic ---
  const [weather, setWeather] = useState({
    temp: null,
    condition: "Loading...",
    location: "Locating...",
    loading: true,
    error: null,
    weathercode: null,
  });

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      setWeather((prev) => ({ ...prev, loading: true }));
      // 1. Fetch Weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherRes.json();
      const { temperature, weathercode } = weatherData.current_weather;

      // 2. Fetch Location Name
      const locationRes = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );
      const locationData = await locationRes.json();
      const city =
        locationData.city || locationData.locality || "Unknown Location";

      // MAP WMO code to text
      let conditionText = "Clear";
      if (weathercode >= 1 && weathercode <= 3) conditionText = "Partly Cloudy";
      else if (weathercode >= 45 && weathercode <= 48) conditionText = "Foggy";
      else if (weathercode >= 51 && weathercode <= 67) conditionText = "Rain";
      else if (weathercode >= 71 && weathercode <= 77) conditionText = "Snow";
      else if (weathercode >= 80 && weathercode <= 82)
        conditionText = "Showers";
      else if (weathercode >= 95 && weathercode <= 99)
        conditionText = "Thunderstorm";

      setWeather({
        temp: Math.round(temperature),
        condition: conditionText,
        location: city,
        loading: false,
        error: null,
        weathercode,
      });
    } catch (err) {
      console.error("Weather fetch error:", err);
      setWeather((prev) => ({
        ...prev,
        loading: false,
        error: "Failed to load weather",
      }));
    }
  };

  const handleRefreshWeather = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherData(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          // If geolocation fails or denied, maybe default to a known location or just show error
          console.error(error);
          setWeather((prev) => ({
            ...prev,
            loading: false,
            error: "Location Access Denied",
          }));
        }
      );
    }
  };

  useEffect(() => {
    handleRefreshWeather();
  }, []);

  const getWeatherIcon = (code) => {
    const iconClass = "w-4 sm:w-5 h-4 sm:h-5 mr-1 sm:mr-2";
    if (code === undefined || code === null)
      return <CloudSun className={iconClass} />;

    // WMO Weather interpretation codes (WW)
    // 0: Clear sky
    if (code === 0) return <Sun className={`${iconClass} text-yellow-500`} />;
    // 1, 2, 3: Mainly clear, partly cloudy, and overcast
    if (code >= 1 && code <= 3)
      return <Cloud className={`${iconClass} text-gray-500`} />;
    // 45, 48: Fog
    if (code >= 45 && code <= 48)
      return <Cloud className={`${iconClass} text-gray-400`} />;
    // 51-67: Drizzle & Rain
    if (code >= 51 && code <= 67)
      return <CloudRain className={`${iconClass} text-blue-500`} />;
    // 71-77: Snow
    if (code >= 71 && code <= 77)
      return <CloudSnow className={`${iconClass} text-blue-300`} />;
    // 80-82: Rain showers
    if (code >= 80 && code <= 82)
      return <CloudRain className={`${iconClass} text-blue-600`} />;
    // 95-99: Thunderstorm
    if (code >= 95)
      return <CloudLightning className={`${iconClass} text-purple-600`} />;

    return <CloudSun className={iconClass} />;
  };

  // Fetch events on mount if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchEvents());
    }
  }, [dispatch, isAuthenticated]);

  // Get the next upcoming event (closest future event)
  const nextEvent = useMemo(() => {
    if (!events || events.length === 0) return null;

    const now = new Date();
    const upcomingEvents = events
      .filter(
        (event) =>
          new Date(event.startTime) > now && event.status === "UPCOMING"
      )
      .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

    return upcomingEvents[0] || null;
  }, [events]);

  // Format event date/time for display
  const formatEventTime = (dateString) => {
    const eventDate = new Date(dateString);
    const now = new Date();
    const isToday = eventDate.toDateString() === now.toDateString();
    const isTomorrow =
      eventDate.toDateString() ===
      new Date(now.getTime() + 86400000).toDateString();

    const timeStr = eventDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    if (isToday) return `Today at ${timeStr}`;
    if (isTomorrow) return `Tomorrow at ${timeStr}`;

    return eventDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

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
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center space-x-2 bg-gray-900 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg shadow-gray-400/50 transition-colors"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-5 h-5 ml-1" />
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent text-gray-700 hover:text-gray-900 border border-gray-400 hover:border-gray-900 font-semibold py-3 px-8 rounded-xl transition-colors"
              >
                View Demo
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Column: Information Cards */}
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
            <div className="flex flex-col gap-4">
              {/* Top Row: Current Time & Weather in 2x2 grid on mobile */}
              <div className="grid grid-cols-2 sm:flex sm:flex-row gap-4">
                {/* 1. Real-Time Clock Card */}
                <motion.div
                  variants={cardVariants}
                  whileHover={{ y: -10 }}
                  className={`bg-gray-100 p-4 sm:p-6 rounded-2xl w-full sm:w-56 h-40 sm:h-48 flex flex-col justify-center items-center ${lightCardShadow}`}
                >
                  <div className="flex items-center text-gray-500 mb-2">
                    <Clock className="w-4 sm:w-5 h-4 sm:h-5 mr-1 sm:mr-2" />
                    <span className="font-semibold text-xs sm:text-sm uppercase tracking-wider">
                      Current Time
                    </span>
                  </div>
                  <RealTimeClock />
                </motion.div>

                {/* 2. Weather Card - Dynamic */}
                <motion.div
                  variants={cardVariants}
                  whileHover={{ y: -10 }}
                  className={`bg-gray-100 p-4 sm:p-6 rounded-2xl w-full sm:w-56 h-40 sm:h-48 flex flex-col ${lightCardShadow}`}
                >
                  <div className="flex items-center justify-between text-gray-500 mb-2 sm:mb-3">
                    <div className="flex items-center">
                      {getWeatherIcon(weather.weathercode)}
                      <span className="font-semibold text-xs sm:text-sm uppercase tracking-wider">
                        Weather
                      </span>
                    </div>
                    <button
                      onClick={handleRefreshWeather}
                      className={`text-gray-400 hover:text-gray-900 transition-colors ${
                        weather.loading ? "animate-spin" : ""
                      }`}
                    >
                      <RefreshCw className="w-3 sm:w-4 h-3 sm:h-4" />
                    </button>
                  </div>

                  <div className="flex flex-col items-start justify-center flex-grow">
                    {weather.error ? (
                      <div className="text-sm text-red-500 font-medium whitespace-normal break-words leading-tight">
                        {weather.error}
                      </div>
                    ) : (
                      <>
                        <div className="text-3xl sm:text-5xl font-extrabold text-gray-900">
                          {weather.temp !== null ? `${weather.temp}°C` : "--"}
                        </div>
                        <div className="mt-1 sm:mt-2">
                          <div className="text-sm sm:text-lg font-medium text-gray-700">
                            {weather.condition}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-500 flex items-center mt-1">
                            <MapPin className="w-3 sm:w-4 h-3 sm:h-4 mr-1 text-gray-500" />
                            <span className="truncate max-w-[120px]">
                              {weather.location}
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Bottom Row: Next Event Card - Rectangle form */}
              <motion.div
                variants={cardVariants}
                whileHover={{ y: -5 }}
                className={`bg-gray-100 p-6 rounded-2xl w-full flex flex-row items-center gap-6 ${lightCardShadow}`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full mr-3 ${
                      nextEvent ? "bg-green-500 animate-pulse" : "bg-gray-400"
                    }`}
                  ></div>
                  <span className="font-semibold text-gray-500 text-sm uppercase tracking-wider">
                    Next Event
                  </span>
                </div>

                <div className="h-10 w-px bg-gray-300"></div>

                {loading ? (
                  <div className="flex items-center gap-2 text-gray-500">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Loading...</span>
                  </div>
                ) : nextEvent ? (
                  <div className="flex flex-row items-center gap-6 flex-grow">
                    <h3 className="text-xl font-bold text-gray-900">
                      {nextEvent.title}
                    </h3>
                    <p className="text-sm text-gray-600 flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                      <span>{formatEventTime(nextEvent.startTime)}</span>
                    </p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                      <span>{nextEvent.location || "TBD"}</span>
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-row items-center gap-3 flex-grow text-gray-500">
                    <CalendarX className="w-5 h-5" />
                    <span className="text-sm">
                      {isAuthenticated
                        ? "No upcoming events"
                        : "Login to see your events"}
                    </span>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default EventifyLanding;
