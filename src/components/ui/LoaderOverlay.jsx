import { useSelector } from "react-redux";

export default function LoaderOverlay() {
  const isLoading = useSelector((state) => state.app.globalLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
