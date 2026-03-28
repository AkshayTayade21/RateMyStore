export default function StoresTable({ stores }) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Address</th>
            <th className="p-3">Rating</th>
          </tr>
        </thead>

        <tbody>
          {stores.length === 0 ? (
            <tr>
              <td colSpan="4" className="p-4 text-center text-gray-500">
                No stores found
              </td>
            </tr>
          ) : (
            stores.map((store) => (
              <tr
                key={store.id}
                className="border-t hover:bg-green-50 transition"
              >
                <td className="p-3">{store.name}</td>
                <td className="p-3">{store.email}</td>
                <td className="p-3">{store.address}</td>
                <td className="p-3">⭐ {store.rating}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}