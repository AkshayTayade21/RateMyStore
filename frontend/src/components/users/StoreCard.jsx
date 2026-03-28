export default function StoreCard({ store, onRate }) {
  return (
    <div className="bg-white p-4 rounded shadow border border-gray-200 transition-all duration-300 hover:scale-105 hover:bg-emerald-500/10 hover:border-green-500 hover:shadow-lg">
      <h2 className="font-bold text-lg">{store.name}</h2>
      <p className="text-gray-600">{store.address}</p>

      <p className="mt-2">⭐ {store.overall_rating}</p>
      <p>Your Rating: {store.user_rating || "Not rated"}</p>

      <div className="flex gap-2 mt-3 flex-wrap">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            onClick={() => onRate(store.id, num, store.user_rating)}
            className={`px-2 py-1 rounded transition ${
              store.user_rating === num
                ? "bg-yellow-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {num}⭐
          </button>
        ))}
      </div>
    </div>
  );
}