import Navbar from "../../components/Navbar.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import { Search, ChevronRight, Filter } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import GetAllUser from "../../hooks/GetAllUser.jsx";
import GetAllTickets from "../../hooks/GetAllTickets.jsx";
import productImage from "../../assets/user.avif";
import { clearFilters, setFilters } from "../../redux/ticketSlice";
import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../../App.jsx";
import { updateTicket } from "../../redux/ticketSlice";

function AllTickets() {
  GetAllUser();
  GetAllTickets();
  const dispatch = useDispatch();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [editStatus, setEditStatus] = useState("");
  const [editAssignedTo, setEditAssignedTo] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState("");


  const {
    tickets,
    loading: ticketsLoading,
    error: ticketsError,
    filters,
  } = useSelector((state) => state.ticket);

  const filteredTickets = tickets.filter((ticket) => {
    const searchTerm = filters.search.toLowerCase();
    const searchMatch = [ticket.title, ticket._id, ticket.category].some(
      (value) => value?.toLowerCase().includes(searchTerm),
    );

    const statusMatch =
      !filters.status ||
      filters.status === "All" ||
      ticket.status === filters.status;

    const categoryMatch =
      !filters.category ||
      filters.category === "All" ||
      ticket.category === filters.category;

    const priorityMatch =
      !filters.priority ||
      filters.priority === "All" ||
      ticket.priority === filters.priority;

    return searchMatch && statusMatch && categoryMatch && priorityMatch;
  });

  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
    setEditStatus(ticket.status);
    setEditAssignedTo(ticket.assignedTo?._id || "");
    setUpdateError("");
  };
  const handleUpdateTicket = async () => {
    if (!selectedTicket) return;

    setIsUpdating(true);
    setUpdateError("");

    try {
      const response = await axios.patch(
        `${serverUrl}/api/admin/all-tickets/${selectedTicket._id}`,
        {
          status: editStatus,
        },
        {
          withCredentials: true,
        },
      );

      dispatch(updateTicket(response.data.ticket));
      setSelectedTicket(response.data.ticket);
    } catch (error) {
      setUpdateError(
        error.response?.data?.message || "Unable to update ticket",
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "bg-green-100 text-green-800";
      case "In-Progress":
        return "bg-orange-100 text-orange-800";
      case "On-Hold":
        return "bg-yellow-100 text-yellow-800";
      case "Closed":
        return "bg-red-100 text-red-800";

      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatTicketId = (id) => `IC-${id.slice(-6).toUpperCase()}`;
  const capitalizeName = (name) =>
    name ? name.charAt(0).toUpperCase() + name.slice(1) : "You";

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
                  👋 Welcome back, Admin!
                </h2>

                <p className="text-gray-500 mt-2 text-base md:text-lg">
                  Here's what's happening with your support tickets today.
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

            {/* Filters Section */}
            <div className="max-w-7xl mx-auto px-6 pt-0 pb-3">
              <div className="bg-white rounded-lg shadow-sm border p-3 mb-4">
                <div className="flex flex-wrap items-center gap-4">
                  {/* Search */}
                  <div className="flex-1 min-w-[300px]">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search by title, ticket ID or category..."
                        value={filters.search}
                        onChange={(e) =>
                          dispatch(setFilters({ search: e.target.value }))
                        }
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Status Filter */}
                  <div className="w-40">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={filters.status}
                      onChange={(e) =>
                        dispatch(setFilters({ status: e.target.value }))
                      }
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="All">All</option>
                      <option value="New">New</option>
                      <option value="In-Progress">In-Progress</option>
                      <option value="On-Hold">On-Hold</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>

                  {/* Category Filter */}
                  <div className="w-40">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={filters.category}
                      onChange={(e) =>
                        dispatch(setFilters({ category: e.target.value }))
                      }
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="All">All</option>
                      <option value="Network">Network</option>
                      <option value="Hardware">Hardware</option>
                      <option value="Library">Library</option>
                      <option value="Examination">Examination</option>
                      <option value="Accounts">Accounts</option>
                      <option value="Admission">Admission</option>
                      <option value="Software">Software</option>
                    </select>
                  </div>

                  {/* Priority Filter */}
                  <div className="w-40">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Priority
                    </label>
                    <select
                      value={filters.priority}
                      onChange={(e) =>
                        dispatch(setFilters({ priority: e.target.value }))
                      }
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="All">All</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>

                  {/* Clear Filters */}
                  <button
                    onClick={() => dispatch(clearFilters())}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
                  >
                    <Filter className="w-4 h-4" />
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>

            {/**All Tickets Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">
                  All Tickets ({filteredTickets.length})
                </h3>
              </div>
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                      #ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                      TITLE
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                      CATEGORY
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                      STATUS
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                      LAST UPDATED ON
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                      LAST UPDATED BY
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                      RAISED BY
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                       ACTION
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {ticketsLoading ? (
                    <tr>
                      <td
                        colSpan="8"
                        className="px-6 py-8 text-center text-sm text-gray-500"
                      >
                        Loading Tickets...
                      </td>
                    </tr>
                  ) : ticketsError ? (
                    <tr>
                      <td
                        colSpan="8"
                        className="px-6 py-8 text-center text-sm text-red-600"
                      >
                        {ticketsError}
                      </td>
                    </tr>
                  ) : filteredTickets.length === 0 ? (
                    <tr>
                      <td
                        colSpan="8"
                        className="px-6 py-8 text-center text-sm text-gray-500"
                      >
                        No tickets match the selected filters.
                      </td>
                    </tr>
                  ) : (
                    filteredTickets.map((ticket) => (
                      <tr key={ticket._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                          {formatTicketId(ticket._id)}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-700">
                          {ticket.title}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-600">
                          {ticket.category}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium
                        ${getStatusColor(ticket.status)}`}
                          >
                            {ticket.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-600">
                          {new Date(ticket.updatedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-600">
                          {ticket.assignedTo?.fullname || "Unassigned"}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-600">
                          {capitalizeName(ticket.raisedBy?.fullname)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleViewTicket(ticket)}
                            className="flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-2 font-medium text-blue-600 hover:bg-blue-100 cursor-pointer"
                          >
                            View
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              {selectedTicket && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl">
                    {/* Header */}

                    <div className="flex justify-between items-center border-b px-6 py-4">
                      <h2 className="text-xl font-bold">Ticket Details</h2>
                    </div>

                    {/* Body */}

                    <div className="p-6 space-y-5">
                      <div className="grid grid-cols-2 gap-5">
                        <div>
                          <p className="text-sm text-gray-500">Ticket ID</p>
                          <h3 className="font-semibold">
                            {formatTicketId(selectedTicket._id)}
                          </h3>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">Status</p>

                          <select
                            value={editStatus}
                            onChange={(event) =>
                              setEditStatus(event.target.value)
                            }
                            className="border rounded-lg px-3 py-2 text-sm"
                          >
                            <option value="New">New</option>
                            <option value="In-Progress">In-Progress</option>
                            <option value="On-Hold">On-Hold</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">Category</p>
                          <h3>{selectedTicket.category}</h3>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">Priority</p>
                          <h3>{selectedTicket.priority}</h3>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">Raised By</p>

                          <h3>
                            {capitalizeName(selectedTicket.raisedBy?.fullname)}
                          </h3>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">Assigned To</p>

                          <h3 className="font-semibold">
                            {selectedTicket.assignedTo?.fullname ||
                              "Not assigned yet"}
                          </h3>

                          {selectedTicket.assignedTo?.email && (
                            <p className="text-xs text-gray-500">
                              {selectedTicket.assignedTo.email}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 mb-2">Title</p>

                        <div className="border rounded-lg p-3 bg-gray-50">
                          {selectedTicket.title}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 mb-2">
                          Description
                        </p>

                        <div className="border rounded-lg p-3 bg-gray-50 min-h-[120px]">
                          {selectedTicket.description}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-5">
                        <div>
                          <p className="text-sm text-gray-500">Created At</p>

                          <h3>
                            {new Date(
                              selectedTicket.createdAt,
                            ).toLocaleString()}
                          </h3>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">Last Updated</p>

                          <h3>
                            {new Date(
                              selectedTicket.updatedAt,
                            ).toLocaleString()}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}

                    <div className="border-t px-6 py-4 flex justify-between items-center">
                      {updateError && (
                        <p className="text-sm text-red-600">{updateError}</p>
                      )}

                      <div className="ml-auto flex gap-3">
                        <button
                          onClick={() => setSelectedTicket(null)}
                          disabled={isUpdating}
                          className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                        >
                          Close
                        </button>

                        <button
                          onClick={handleUpdateTicket}
                          disabled={isUpdating}
                          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                          {isUpdating ? "Updating..." : "Save Changes"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AllTickets;
