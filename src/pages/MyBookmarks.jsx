import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import databaseService from "../appwrite/database";
import EventCard from "../components/EventCard";

function MyBookmarks() {
  const userData = useSelector((state) => state.auth.userData);
  const [bookmarks, setBookmarks] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const res = await databaseService.getBookmarkByUser(userData.$id);
        setBookmarks(res.documents);

        const eventIds = res.documents.map((b) => b.eventId);
        const eventList = [];

        for (const id of eventIds) {
          const eventsRes = await databaseService.getEvents([
            databaseService.Query.equal("$id", id),
          ]);
          if (eventsRes.total > 0) {
            eventList.push(eventsRes.documents[0]);
          }
        }

        setEvents(eventList);
      } catch (err) {
        console.error("Error fetching bookmarks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [userData.$id]);

  const handleToggleBookmark = async (eventId) => {
    const bookmark = bookmarks.find((b) => b.eventId === eventId);
    if (!bookmark) return;

    try {
      await databaseService.unbookmark(bookmark.$id);
      setBookmarks((prev) => prev.filter((b) => b.$id !== bookmark.$id));
      setEvents((prev) => prev.filter((e) => e.$id !== eventId));
    } catch (error) {
      console.error("Failed to remove bookmark:", error);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading bookmarks...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-primary">
        My Bookmarked Events
      </h1>
      {events.length === 0 ? (
        <p className="text-muted">You haven't bookmarked any events yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard
              key={event.$id}
              event={event}
              showBookmark={true}
              onToggleBookmark={() => handleToggleBookmark(event.$id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookmarks;
