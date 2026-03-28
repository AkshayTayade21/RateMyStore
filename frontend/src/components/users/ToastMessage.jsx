export default function ToastMessage({ toast }) {
  if (!toast.message) return null;

  return (
    <div
      className={`fixed top-20 right-5 z-50 px-5 py-3 rounded-xl shadow-lg backdrop-blur-sm transition-all duration-300 ${
        toast.type === "success"
          ? "bg-green-500/10 border border-green-500 text-green-700"
          : "bg-red-500/10 border border-red-500 text-red-700"
      }`}
    >
      {toast.message}
    </div>
  );
}