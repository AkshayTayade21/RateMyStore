export default function UserSearchFilters({
  search,
  setSearch,
  role,
  setRole,
  onSearch,
}) {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <input
        type="text"
        placeholder="Search by name, email or address"
        className="border p-2 rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="border p-2 rounded"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="">All Roles</option>
        <option value="user">User</option>
        <option value="admin">Admin</option>
        <option value="owner">Owner</option>
      </select>

      <button
        onClick={onSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Search
      </button>
    </div>
  );
}