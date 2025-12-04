import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  X,
  Calendar,
  MapPin,
  Type,
  AlignLeft,
  Clock,
} from "lucide-react";

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

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        // Format dates for datetime-local input
        const formatDate = (dateStr) => {
          if (!dateStr) return "";
          return new Date(dateStr).toISOString().slice(0, 16);
        };

        reset({
          ...initialData,
          startTime: formatDate(initialData.startTime),
          endTime: formatDate(initialData.endTime),
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">
            {initialData ? "Edit Event" : "Create New Event"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
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

          <div className="grid grid-cols-2 gap-4">
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

          <div className="grid grid-cols-2 gap-4">
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

            {/* Attendees */}
            {/* <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-400" />
                Attendees
              </label>
              <input
                type="number"
                {...register("attendees", { min: 0 })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                placeholder="0"
              />
            </div> */}
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
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 text-white bg-purple-600 hover:bg-purple-700 rounded-xl font-medium transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isLoading
                ? "Saving..."
                : initialData
                ? "Update Event"
                : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventModal;
