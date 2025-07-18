import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-surface border-t text-sm text-muted">
      <div className="max-w-screen-xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between">
        <p className="mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} Eventify. All rights reserved.
        </p>
        <nav className="flex space-x-4">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <Link to="/all-posts" className="hover:text-primary">
            All Events
          </Link>
          <Link to="/dashboard" className="hover:text-primary">
            Dashboard
          </Link>
          <Link to="/create-event" className="hover:text-primary">
            Create
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
