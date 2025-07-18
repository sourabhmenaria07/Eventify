
export default function ConfirmModal({ open, onClose, onConfirm, title = "Are you sure?", description }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div
        className="bg-surface rounded-lg shadow-lg p-6 w-[90%] max-w-sm text-body"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        {description && <p className="mb-4 text-sm text-muted">{description}</p>}

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-muted hover:bg-gray-300 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
