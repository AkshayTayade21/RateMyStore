export default function StoreRatingsList({ averageRatings }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        My Store Ratings
      </h2>

      {averageRatings.length === 0 ? (
        <div className="bg-white rounded-2xl shadow border border-gray-200 p-6 text-gray-500">
          No store ratings found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {averageRatings.map((store, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow border border-gray-200 p-5 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg text-gray-800">
                {store.store_name}
              </h3>
              <p className="mt-2 text-yellow-600 font-bold text-2xl">
                ⭐ {store.average_rating}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}