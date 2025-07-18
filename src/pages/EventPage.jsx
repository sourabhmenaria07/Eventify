import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Bookmark, BookmarkCheck } from "lucide-react";
import databaseService from "../appwrite/database";
import Button from "../components/ui/Button";
import ConfirmModal from "../components/ui/ConfirmModal";

function EventPage() {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkId, setBookmarkId] = useState(null);

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isOwner = userData?.$id === event.userId;
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await databaseService.getEventsBySlug(slug);
        setEvent(eventData);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [slug]);

  useEffect(() => {
    const checkBookmark = async () => {
      if (userData && event) {
        const bookmarks = await databaseService.getBookmarkByUser(userData.$id);
        const match = bookmarks.documents.find((b) => b.eventId === event.$id);
        if (match) {
          setBookmarked(true);
          setBookmarkId(match.$id);
        }
      }
    };
    checkBookmark();
  }, [event, userData]);

  const handleToggleBookmark = async () => {
    if (!userData || !event) return;

    try {
      if (bookmarked) {
        await databaseService.unbookmark(bookmarkId);
        setBookmarked(false);
        setBookmarkId(null);
      } else {
        const res = await databaseService.bookmarkEvent({
          userId: userData.$id,
          eventId: event.$id,
        });
        setBookmarked(true);
        setBookmarkId(res.$id);
      }
    } catch (error) {
      console.error("Bookmark toggle failed:", error);
      alert("Failed to update bookmark.");
    }
  };

  const handleDelete = async () => {
    try {
      await databaseService.deleteEvent(event.$id);
      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to delete event:", err);
      alert("Failed to delete event. Please try again.");
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-body">Loading event...</p>;
  }

  if (!event) {
    return <p className="text-center mt-10 text-red-500">Event not found</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row md:gap-8">
        <div className="md:w-1/2 w-full mb-6 md:mb-0">
          <img
            src={databaseService.getFilePreview(event.coverImage)}
            alt={event.title}
            className="w-full h-auto rounded-xl shadow-md"
          />
        </div>
        {/* Event Details */}
        <div className="md:w-1/2 w-full text-body space-y-4">
          <h1 className="text-3xl font-bold text-primary">{event.title}</h1>
          {userData && (
            <button
              onClick={handleToggleBookmark}
              className="flex items-center gap-2 px-3 py-1 border rounded-full text-sm bg-muted hover:bg-muted/80 transition"
            >
              {bookmarked ? (
                <>
                  <BookmarkCheck size={18} className="text-primary" />
                  <span>Bookmarked</span>
                </>
              ) : (
                <>
                  <Bookmark size={18} />
                  <span>Bookmark</span>
                </>
              )}
            </button>
          )}
          <p className="text-sm text-muted">Organized by {event.organizer}</p>
          <p className="text-sm text-muted">
            {event.date} at {event.time}
          </p>
          <p className="text-sm text-muted">{event.location}</p>

          {event.isFree ? (
            <span className="text-green-600 font-semibold">Free Event</span>
          ) : (
            <div>
              <p className="font-medium text-lg">
                ₹{event.price}
                {event.discount > 0 && (
                  <span className="ml-2 text-sm text-green-500">
                    ({event.discount}% off)
                  </span>
                )}
              </p>
            </div>
          )}

          <div className="pt-4">
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <p className="text-base whitespace-pre-line">{event.description}</p>
          </div>
        </div>
        {isOwner && (
          <div className="mt-6 flex justify-end gap-4">
            <Button
              onClick={() => navigate(`/edit-event/${event.slug}`)}
              className="w-full max-w-xs block mx-auto mt-10"
            >
              Edit
            </Button>
            <Button
              onClick={() => setConfirmOpen(true)}
              className="bg-red-600 text-white px-4 py-2 hover:bg-red-700 w-full max-w-xs block mx-auto mt-10"
            >
              Delete
            </Button>
          </div>
        )}
      </div>
      <ConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete this event?"
        description="This action cannot be undone. The event will be permanently removed."
      />
    </div>
  );
}

export default EventPage;
