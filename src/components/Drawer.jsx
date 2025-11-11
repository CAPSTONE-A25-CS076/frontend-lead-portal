export default function Drawer({ open, onClose, children }) {
  return (
    <div className={`fixed inset-0 z-40 ${open ? "" : "pointer-events-none"}`}>
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-semibold">Lead Detail</h2>
          <button
            onClick={onClose}
            className="text-sm text-gray-600 hover:text-black"
          >
            Close
          </button>
        </div>
        <div className="p-4 overflow-y-auto h-[calc(100%-56px)]">
          {children}
        </div>
      </aside>
    </div>
  );
}
