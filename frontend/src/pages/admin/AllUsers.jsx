import Navbar from "../../components/Navbar.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import { useSelector } from "react-redux";
import GetAllUser from "../../hooks/GetAllUser.jsx";
import productImage from "../../assets/user.avif";

function AllUsers() {
  GetAllUser();

  const { allUsers, loading, error } = useSelector((state) => state.allUser);

  const getStatusColor = (active) =>
    active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";

  const getRoleColor = (role) =>
    role === "Student"
      ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200"
      : "bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200";

  const formatTicketId = (id) => `IC-${id.slice(-6).toUpperCase()}`;
  const capitalizeName = (name) =>
    name
      ? name
          .trim()
          .split(/\s+/)
          .map(
            (part) =>
              part.charAt(0).toUpperCase() + part.slice(1).toLowerCase(),
          )
          .join(" ")
      : "You";

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="felx-1 overflow-y-auto">
          <div className="p-3 space-y-4">
            {/**Welcome Banner */}
            <div className="relative overflow-hidden rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-blue-100 px-6 py-5 min-h-[145px] flex items-center justify-between">
              {/* Left Content */}
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-slate-900 leading-tight">
                  All Users
                </h2>

                <p className="text-gray-500 mt-2 text-base md:text-lg">
                  Manage and view all registered users in the system.
                </p>
              </div>

              {/* Right Image */}
              <div className="absolute right-4 bottom-0 w-[240px] h-[150px] flex items-end justify-center">
                <img
                  src={productImage}
                  alt="Welcome"
                  loading="lazy"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/**All Tickets Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">
                  All Tickets ({allUsers.length})
                </h3>
              </div>
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                      #ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                      NAME
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                      EMAIL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                      STATUS
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                      ROLE
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                      ACTION
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-8 text-center text-sm text-gray-500"
                      >
                        Loading Tickets...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-8 text-center text-sm text-red-600"
                      >
                        {error}
                      </td>
                    </tr>
                  ) : allUsers.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-8 text-center text-sm text-gray-500"
                      >
                        No Users.
                      </td>
                    </tr>
                  ) : (
                    allUsers.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                          {formatTicketId(user._id)}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-700">
                          {capitalizeName(user.fullname)}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-600">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium
                        ${getStatusColor(user.isActive)}`}
                          >
                            {user.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getRoleColor(
                              user.role,
                            )}`}
                          >
                            {user.role === "Admin" ? "Faculty" : "Student"}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AllUsers;
