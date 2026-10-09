import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Plus, ChevronRight, Search, Filter } from "lucide-react";
import ticketBanner from "../assets/ticketBanner.avif";
import { useDispatch, useSelector } from "react-redux";
import GetCurrentTicket from "../hooks/GetCurrentTicket";
import { useNavigate } from "react-router-dom";
import { setFilters, clearFilters } from "../redux/ticketSlice";

function MyTickets() {
  GetCurrentTicket();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const { userData } = useSelector((state) => state.user);
  const { tickets, loading, error, filters } = useSelector(
    (state) => state.ticket,
  );

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
            <div className="relative overflow-hidden rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-blue-100 px-6 py-5 min-h-[145px] flex items-center justify-between">
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-slate-900 leading-tight">
                  👋 Welcome back,{" "}
                  {userData?.fullname?.charAt(0).toUpperCase() +
                    userData?.fullname?.slice(1)}
                  !
                </h2>
                <p className="text-gray-500 mt-2 text-base md:text-lg">
                  Need help? Raise a support ticket and we&apos;ll get back to
                  you soon.
                </p>
              </div>
              <div className="absolute right-4 bottom-0 w-[240px] h-[150px] flex items-end justify-center">
                <img
                  src={ticketBanner}
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
                      <option>All</option>
                      <option>Open</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                      <option>Closed</option>
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
                      <option>All</option>
                      <option>Network</option>
                      <option>Hardware</option>
                      <option>Library</option>
                      <option>Examination</option>
                      <option>Accounts</option>
                      <option>Admission</option>
                      <option>Software</option>
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
                      <option>All</option>
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
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

              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">
                    Your Tickets ({filteredTickets.length})
                  </h3>
                  <button
                    onClick={() => navigate("/raise-ticket")}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                  >
                    <Plus className="w-5 h-5" />
                    Raise New Ticket
                  </button>
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
                    {loading ? (
                      <tr>
                        <td
                          colSpan="8"
                          className="px-6 py-8 text-center text-sm text-gray-500"
                        >
                          Loading Tickets...
                        </td>
                      </tr>
                    ) : error ? (
                      <tr>
                        <td
                          colSpan="8"
                          className="px-6 py-8 text-center text-sm text-red-600"
                        >
                          {error}
                        </td>
                      </tr>
                    ) : tickets.length === 0 ? (
                      <tr>
                        <td
                          colSpan="8"
                          className="px-6 py-8 text-center text-sm text-gray-500"
                        >
                          No tickets found.
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
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}
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
                              onClick={() => setSelectedTicket(ticket)}
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

                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTicket.status)}`}
                            >
                              {selectedTicket.status}
                            </span>
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
                              {capitalizeName(
                                selectedTicket.raisedBy?.fullname,
                              )}
                            </h3>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">Assigned To</p>

                            <h3>
                              {selectedTicket.assignedTo?.fullname ||
                                "Unassigned"}
                            </h3>
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
                            <p className="text-sm text-gray-500">
                              Last Updated
                            </p>

                            <h3>
                              {new Date(
                                selectedTicket.updatedAt,
                              ).toLocaleString()}
                            </h3>
                          </div>
                        </div>
                      </div>

                      {/* Footer */}

                      <div className="border-t px-6 py-4 flex justify-end">
                        <button
                          onClick={() => setSelectedTicket(null)}
                          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default MyTickets;
