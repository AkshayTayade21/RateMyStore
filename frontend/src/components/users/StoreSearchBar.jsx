export default function StoreSearchBar({ search, setSearch, onSearch }) {
  return (
    <div className="flex gap-4 mb-6">
      <input
        type="text"
        placeholder="Search by store name or address"
        className="border p-2 rounded w-80"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button
        onClick={onSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Search
      </button>
    </div>
  );
}