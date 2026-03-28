import { Link } from "react-router-dom";

export default function UsersTable({ users }) {
  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200 text-center">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Address</th>
            <th className="p-3">Role</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr
                key={user.id}
                className="text-center border-t hover:bg-gray-50"
              >
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.address}</td>
                <td className="p-3 capitalize">{user.role}</td>
                <td className="p-3">
                  <Link
                    to={`/admin/users/${user.id}`}
                    className="text-blue-500 hover:text-blue-700 font-medium"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}