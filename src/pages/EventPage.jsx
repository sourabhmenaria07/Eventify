import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import databaseService from "../appwrite/database";

function EventPage() {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = databaseService.getEventsBySlug(slug);
        setEvent(eventData);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [slug]);

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
      </div>
    </div>
  );
}

export default EventPage;
