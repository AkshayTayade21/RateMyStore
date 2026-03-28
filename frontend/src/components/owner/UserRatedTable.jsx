export default function UsersRatedTable({ ratedUsers }) {
  return (
    <div className="bg-white rounded-2xl shadow border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-700">
          Users Who Rated
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="text-left px-6 py-3">Name</th>
              <th className="text-left px-6 py-3">Email</th>
              <th className="text-left px-6 py-3">Rating</th>
              <th className="text-left px-6 py-3">Store</th>
            </tr>
          </thead>

          <tbody>
            {ratedUsers.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-6 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              ratedUsers.map((user, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-green-50 transition"
                >
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4 font-semibold text-yellow-600">
                    ⭐ {user.rating}
                  </td>
                  <td className="px-6 py-4">{user.store_name}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}