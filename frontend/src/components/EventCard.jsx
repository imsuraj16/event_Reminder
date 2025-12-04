import React from "react";
import { Calendar, MapPin, Clock, Edit2, Trash2 } from "lucide-react";

const EventCard = ({ event, onEdit, onDelete }) => {
  // Calculate real-time status based on current time
  const getActualStatus = () => {
    if (event.status === "CANCELLED") return "CANCELLED";
    
    const now = new Date();
    // Use endTime if available, otherwise use startTime
    const eventEndTime = event.endTime ? new Date(event.endTime) : new Date(event.startTime);
    const eventStartTime = new Date(event.startTime);
    
    // If event has ended, it should be COMPLETED
    if (eventEndTime < now) {
      return "COMPLETED";
    }
    // If event has started but not ended, it's IN_PROGRESS (optional)
    if (eventStartTime < now && eventEndTime >= now) {
      return "IN_PROGRESS";
    }
    return event.status || "UPCOMING";
  };

  const actualStatus = getActualStatus();

  const getStatusColor = (status) => {
    switch (status) {
      case "UPCOMING":
        return "bg-purple-100 text-purple-600";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-600";
      case "COMPLETED":
        return "bg-green-100 text-green-600";
      case "CANCELLED":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      month: "short",
      day: "numeric",
      timeZone: "Asia/Kolkata",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div
          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
            actualStatus
          )}`}
        >
          {actualStatus}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(event)}
            className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(event._id)}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
        {event.title}
      </h3>
      <p className="text-gray-500 text-sm mb-4 line-clamp-2 h-10">
        {event.description || "No description provided."}
      </p>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4 text-purple-500" />
          <span>
            {formatDate(event.startTime)} • {formatTime(event.startTime)}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-red-400" />
          <span className="truncate">{event.location || "TBD"}</span>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
          {event.reminder?.remindBeforeMinutes && (
            <div className="flex items-center gap-1 text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-md">
              <Clock className="w-3 h-3" />
              <span>{event.reminder.remindBeforeMinutes}m reminder</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
