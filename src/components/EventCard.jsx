import { Link } from "react-router-dom";
import databaseService from "../appwrite/database";
import { Pencil, Trash2, Bookmark, BookmarkCheck } from "lucide-react";
import Button from "./ui/Button";
import { useState } from "react";

function EventCard({
  event,
  onEdit,
  onDelete,
  showActions = false,
  showBookmark = false,
  isBookmarked = false,
  onToggleBookmark = () => {},
}) {
  const [bookmarking, setBookmarking] = useState(false);

  const handleBookmarkClick = async () => {
    if (bookmarking) return;
    setBookmarking(true);
    await onToggleBookmark(event);
    setBookmarking(false);
  };

  return (
    <div className="bg-surface shadow-md rounded-lg overflow-hidden flex flex-col">
      <Link to={`/event/${event.slug}`}>
        <img
          src={databaseService.getFilePreview(event.coverImage)}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-lg font-bold text-primary line-clamp-1">
          {event.title}
        </h2>
        <p className="text-sm text-muted">
          {event.date} • {event.location}
        </p>
        <p className="text-sm text-body line-clamp-2 mt-2">
          {event.description}
        </p>

        <div className="mt-auto pt-4 flex justify-between items-center">
          <Link
            to={`/event/${event.slug}`}
            className="text-sm text-primary font-medium hover:underline"
          >
            View Details
          </Link>

          <div className="flex items-center gap-2">
            {showBookmark && (
              <Button
                onClick={handleBookmarkClick}
                title={isBookmarked ? "Remove Bookmark" : "Bookmark"}
                className="p-2 hover:bg-muted rounded-full text-primary"
              >
                {isBookmarked ? (
                  <BookmarkCheck className="w-5 h-5" />
                ) : (
                  <Bookmark className="w-5 h-5" />
                )}
              </Button>
            )}
            {showActions && (
              <>
                <Button
                  onClick={() => onEdit?.(event)}
                  className="p-2 hover:bg-muted rounded-full"
                  title="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => onDelete?.(event)}
                  className="p-2 hover:bg-red-300 text-red-600 rounded-full"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
