export default function StoreSearchBar({
  search,
  setSearch,
  onSearch,
}) {
  return (
    <div className="flex gap-4 mb-4">
      <input
        type="text"
        placeholder="Search by store name, email or address"
        className="border border-gray-300 p-2 rounded-lg w-80"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button
        onClick={onSearch}
        className="bg-blue-500 hover:bg-blue-600 text-white px-5 rounded-lg transition"
      >
        Search
      </button>
    </div>
  );
}