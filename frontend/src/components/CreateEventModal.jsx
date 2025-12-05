import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X, Calendar, MapPin, Type, AlignLeft, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CreateEventModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}) => {
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      title: "",
      description: "",
      location: "",
      startTime: "",
      endTime: "",
      status: "UPCOMING",
      remindBeforeMinutes: 30,
    },
  });

  // Handle form submission with proper date conversion
  const handleFormSubmit = (data) => {
    const formattedData = {
      ...data,
      // Convert datetime-local value to proper Date (it's already in local time)
      startTime: data.startTime ? new Date(data.startTime).toISOString() : null,
      endTime: data.endTime ? new Date(data.endTime).toISOString() : null,
    };
    onSubmit(formattedData);
  };

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        // Format dates for datetime-local input (needs local time format)
        const formatDateForInput = (dateStr) => {
          if (!dateStr) return "";
          const date = new Date(dateStr);
          // Format as YYYY-MM-DDTHH:mm in local time
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          const hours = String(date.getHours()).padStart(2, "0");
          const minutes = String(date.getMinutes()).padStart(2, "0");
          return `${year}-${month}-${day}T${hours}:${minutes}`;
        };

        reset({
          ...initialData,
          startTime: formatDateForInput(initialData.startTime),
          endTime: formatDateForInput(initialData.endTime),
          remindBeforeMinutes: initialData.reminder?.remindBeforeMinutes ?? 30,
        });
      } else {
        reset({
          title: "",
          description: "",
          location: "",
          startTime: "",
          endTime: "",
          status: "UPCOMING",
          remindBeforeMinutes: 30,
        });
      }
    }
  }, [isOpen, initialData, reset]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white rounded-2xl w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto relative z-10"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">
                {initialData ? "Edit Event" : "Create New Event"}
              </h2>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="p-6 space-y-4"
            >
              {/* Title */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Type className="w-4 h-4 text-gray-400" />
                  Event Title
                </label>
                <input
                  {...register("title", { required: "Title is required" })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                  placeholder="e.g., Team Strategy Meeting"
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <AlignLeft className="w-4 h-4 text-gray-400" />
                  Description
                </label>
                <textarea
                  {...register("description")}
                  rows="3"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all resize-none"
                  placeholder="Add details about the event..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Start Time */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    Start Time
                  </label>
                  <input
                    type="datetime-local"
                    {...register("startTime", {
                      required: "Start time is required",
                    })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                  />
                </div>

                {/* End Time */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    End Time
                  </label>
                  <input
                    type="datetime-local"
                    {...register("endTime")}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Location */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    Location
                  </label>
                  <input
                    {...register("location")}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                    placeholder="e.g., Conference Room A"
                  />
                </div>
              </div>

              {/* Reminder Settings */}
              <div className="p-4 bg-gray-50 rounded-xl flex items-center justify-start gap-3">
                <span className="text-sm text-gray-600">Remind me</span>

                <select
                  {...register("remindBeforeMinutes")}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:border-purple-500 outline-none"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="1440">1 day</option>
                </select>

                <span className="text-sm text-gray-600">before</span>
              </div>

              {/* Status (Only for Edit) */}
              {initialData && (
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    {...register("status")}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-500 outline-none"
                  >
                    <option value="UPCOMING">Upcoming</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-4 py-2.5 text-white bg-purple-600 hover:bg-purple-700 rounded-xl font-medium transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {isLoading
                    ? "Saving..."
                    : initialData
                    ? "Update Event"
                    : "Create Event"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreateEventModal;
