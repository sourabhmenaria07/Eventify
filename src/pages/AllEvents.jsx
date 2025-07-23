import { useEffect, useState, useRef, useCallback } from "react";
import databaseService from "../appwrite/database";
import EventCard from "../components/EventCard";
import { Query } from "appwrite";
import Container from "../components/Container";

function AllEvents() {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const observer = useRef();

  const loadEvents = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const queries = [Query.limit(6), Query.offset(page * 6)];
      if (search.trim()) queries.push(Query.search("title", search));
      if (category) queries.push(Query.equal("category", category));

      const res = await databaseService.getEvents(queries);

      if (res.documents.length === 0) setHasMore(false);
      else {
        setEvents((prev) => {
          const combined = [...prev, ...res.documents];
          const map = new Map();
          combined.forEach((e) => map.set(e.$id, e));
          return Array.from(map.values());
        });
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error loading events:", error);
    } finally {
      setLoading(false);
    }
  }, [page, search, category, loading, hasMore]);

  useEffect(() => {
    // Reset and fetch when search/category changes
    setEvents([]);
    setPage(0);
    setHasMore(true);
  }, [search, category]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const lastEventRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadEvents();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadEvents]
  );

  return (
    // <div className="w-full max-w-6xl mx-auto px-4 py-8 bg-surface">
    <Container>
      <h1 className="text-2xl font-bold text-body mb-4">All Events</h1>

      {/* Search & Filter */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search events by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded w-full sm:w-1/2 bg-input text-body"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border rounded bg-input text-body"
        >
          <option value="">All Categories</option>
          {/* We'll fill categories below dynamically */}
          {Array.from(new Set(events.map((e) => e.category))).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) =>
          index === events.length - 1 ? (
            <div key={event.$id} ref={lastEventRef}>
              <EventCard event={event} />
            </div>
          ) : (
            <EventCard key={event.$id} event={event} />
          )
        )}
      </div>

      {loading && <p className="text-center mt-6 text-body">Loading more...</p>}
      {!hasMore && !loading && (
        <p className="text-center mt-6 text-muted">No more events.</p>
      )}
    </Container>
    // {/* </div> */}
  );
}

export default AllEvents;
