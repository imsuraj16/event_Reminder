import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../store/actions/eventActions";
import { clearSuccessMessage } from "../store/reducers/eventSlice";
import Sidebar from "../components/Sidebar";
import EventCard from "../components/EventCard";
import CreateEventModal from "../components/CreateEventModal";
import {
  Plus,
  Search,
  Calendar,
  CheckCircle,
  TrendingUp,
  Filter,
  Clock,
} from "lucide-react";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { events, loading, successMessage } = useSelector(
    (state) => state.events
  );
  const { user } = useSelector((state) => state.user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [filter, setFilter] = useState("ALL"); // ALL, UPCOMING, COMPLETED
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      setIsModalOpen(false);
      setEditingEvent(null);
      // Could add a toast notification here
      setTimeout(() => dispatch(clearSuccessMessage()), 3000);
    }
  }, [successMessage, dispatch]);

  const handleCreateEvent = (data) => {
    dispatch(createEvent(data));
  };

  const handleUpdateEvent = (data) => {
    if (editingEvent) {
      dispatch(updateEvent({ eventId: editingEvent._id, eventData: data }));
    }
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      dispatch(deleteEvent(eventId));
    }
  };

  const openCreateModal = () => {
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const openEditModal = (event) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  // Helper function to get actual status based on current time
  const getActualStatus = (event) => {
    if (event.status === "CANCELLED") return "CANCELLED";
    const now = new Date();
    // Use endTime if available, otherwise use startTime
    const eventEndTime = event.endTime ? new Date(event.endTime) : new Date(event.startTime);
    const eventStartTime = new Date(event.startTime);
    
    // If event has ended, it should be COMPLETED
    if (eventEndTime < now) {
      return "COMPLETED";
    }
    // If event has started but not ended, it's IN_PROGRESS
    if (eventStartTime < now && eventEndTime >= now) {
      return "IN_PROGRESS";
    }
    return event.status || "UPCOMING";
  };

  // Filter and Search Logic
  const filteredEvents = events.filter((event) => {
    const actualStatus = getActualStatus(event);
    const matchesFilter = filter === "ALL" || actualStatus === filter;
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Stats (based on actual status)
  const totalEvents = events.length;
  const upcomingEvents = events.filter((e) => getActualStatus(e) === "UPCOMING").length;
  const completedEvents = events.filter((e) => getActualStatus(e) === "COMPLETED").length;
  const completionRate =
    totalEvents > 0 ? Math.round((completedEvents / totalEvents) * 100) : 0;

  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar />

      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Welcome back! Here's an overview of your events.
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="bg-gray-900 hover:bg-gray-700 text-white px-4 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg shadow-gray-400/50 transform hover:scale-[1.02]"
          >
            <Plus className="w-5 h-5" />
            Create Event
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-100 p-6 rounded-2xl shadow-xl shadow-gray-300/50 transition-shadow duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-200 rounded-xl text-gray-700">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">
                  Total Events
                </p>
                <h3 className="text-2xl font-extrabold text-gray-900">
                  {totalEvents}
                </h3>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 p-6 rounded-2xl shadow-xl shadow-gray-300/50 transition-shadow duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-200 rounded-xl text-gray-700">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">Upcoming</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-2xl font-extrabold text-gray-900">
                    {upcomingEvents}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 p-6 rounded-2xl shadow-xl shadow-gray-300/50 transition-shadow duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-200 rounded-xl text-gray-700">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">Completed</p>
                <h3 className="text-2xl font-extrabold text-gray-900">
                  {completedEvents}
                </h3>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 p-6 rounded-2xl shadow-xl shadow-gray-300/50 transition-shadow duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-200 rounded-xl text-gray-700">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">
                  Completion Rate
                </p>
                <h3 className="text-2xl font-extrabold text-gray-900">
                  {completionRate}%
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-300">
            {["ALL", "UPCOMING", "COMPLETED"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  filter === f
                    ? "bg-gray-900 text-white shadow-lg shadow-gray-400/50"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {f === "ALL"
                  ? "All Events"
                  : f.charAt(0) + f.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-gray-300 rounded-xl focus:border-gray-900 focus:ring-2 focus:ring-gray-200 outline-none transition-all"
            />
          </div>
        </div>

        {/* Events Grid */}
        {loading && events.length === 0 ? (
          <div className="text-center py-20">
            <div className="animate-spin w-10 h-10 border-4 border-gray-900 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Loading events...</p>
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onEdit={openEditModal}
                onDelete={handleDeleteEvent}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-100 rounded-3xl shadow-xl shadow-gray-300/50">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-lg font-extrabold text-gray-900 mb-1">
              No events found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filter !== "ALL"
                ? "Try adjusting your search or filters"
                : "Get started by creating your first event"}
            </p>
            {(searchTerm || filter !== "ALL") && (
              <button
                onClick={() => {
                  setFilter("ALL");
                  setSearchTerm("");
                }}
                className="text-gray-900 font-semibold hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </main>

      <CreateEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={editingEvent ? handleUpdateEvent : handleCreateEvent}
        initialData={editingEvent}
        isLoading={loading}
      />
    </div>
  );
};

export default Dashboard;
