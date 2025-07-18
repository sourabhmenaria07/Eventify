import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import databaseService from "../appwrite/database";
import EventForm from "../components/ui/forms/EventForm";

function EditEvent() {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const fetched = await databaseService.getEventsBySlug(slug);
        if (fetched) setEvent(fetched);
      } catch (err) {
        console.error("Error loading event:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [slug]);

  if (loading) return <p className="text-center mt-10 text-body">Loading...</p>;
  if (!event) return <p className="text-center mt-10 text-red-500">Event not found</p>;

  return <EventForm event={event} />;
}

export default EditEvent;
