import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import databaseService from "../appwrite/database";
import { Trash2, Pencil, CloudCog } from "lucide-react";
import EventCard from "../components/EventCard";

function Dashboard() {
  const navigate = useNavigate();
  const { status, userData } = useSelector((state) => state.auth);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const options = ["Music", "Tech", "Education"];

  useEffect(() => {
    if (status === "loggedIn" && userData.$id) {
      databaseService
        .getEvents([Query.equal("userId", userData.$id)])
        .then((res) => setEvents(res.documents || []))
        .catch((err) => console.error("Error loading user events", err))
        .finally(() => setLoading(false));
    }
  }, [status, userData]);

  const filteredEvents = events
    .filter((event) => {
      const matchesSearch = event.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter
        ? event.category === categoryFilter
        : true;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  const handleDelete = async (event) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirm) return;

    try {
      await databaseService.deleteEvent(event.$id);
      if (event.coverImage) await databaseService.deleteCover(event.coverImage);
      setEvents((prev) => prev.filter((e) => e.$id !== event.$id));
    } catch (error) {
      alert("Error deleting event. Please try again.");
    }
  };
  if (loading) {
    return <p className="text-center mt-10">Loading your events...</p>;
  }

  if (!events.length) {
    return (
      <p className="text-center mt-10 text-muted">
        You haven't created any events yet.
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">
            My Events ({filteredEvents.length})
          </h1>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-4 items-center">
          <input
            type="text"
            placeholder="Search by title"
            className="px-3 py-1 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="px-3 py-1 border rounded"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="" disabled hidden>
              --All Categories--
            </option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select
            className="px-3 py-1 border rounded"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
      </div>
      {filteredEvents.length === 0 ? (
        <p className="text-center text-muted">No events found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard
              key={event.$id}
              event={event}
              showActions={true}
              onEdit={(e) => navigate(`/edit-event/${e.$id}`)}
              onDelete={(e) => handleDelete(e.$id)}
            />

            // <div
            //   key={event.$id}
            //   className="bg-surface rounded-xl shadow-md overflow-hidden p-4"
            // >
            //   <Link to={`/event/${event.slug}`}>
            //     <img
            //       src={databaseService.getFilePreview(event.coverImage)}
            //       alt={event.title}
            //       className="w-full h-40 object-cover rounded mb-3"
            //     />
            //   </Link>
            //   <div className="p-4 space-y-2 text-body">
            //     <h2 className="text-xl font-semibold">{event.title}</h2>
            //     <p className="text-sm text-muted">{event.category}</p>
            //     <p className="text-sm text-muted">
            //       {event.date} at {event.time}
            //     </p>
            //     <p className="text-sm text-muted">{event.location}</p>
            //     <div className="flex gap-4 pt-3">
            //       <button
            //         className="text-sm text-primary hover:underline flex items-center gap-1"
            //         onClick={() => navigate(`/edit-event/${event.slug}`)}
            //       >
            //         <Pencil size={16} /> Edit
            //       </button>
            //       <button
            //         className="text-sm text-red-500 hover:underline flex items-center gap-1"
            //         onClick={() => handleDelete(event)}
            //       >
            //         <Trash2 size={16} /> Delete
            //       </button>
            //     </div>
            //   </div>
            // </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
