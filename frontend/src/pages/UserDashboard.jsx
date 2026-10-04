import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Ticket, Clock3, CircleCheck, ArrowRight } from "lucide-react";
import {useSelector} from "react-redux";
import GetCurrentTicket from "../hooks/GetCurrentTicket";
import productImage from "../assets/user.avif";




function UserDashboard() {
  GetCurrentTicket()
  const { userData } = useSelector((state) => state.user);
    const { tickets, loading, error } = useSelector((state) => state.ticket);
  const recentTickets = tickets.slice(0, 4);

  const stats = [
    {
      label: "Total Tickets",
      value: tickets.length,
      icon: Ticket,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-500",
    },
    {
      label: "Open Tickets",
      value: tickets.filter((ticket) => ticket.status !== "Closed").length,
      icon: Clock3,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-500",
    },
    {
      label: "Resolved Tickets",
      value: tickets.filter((ticket) => ticket.status === "Closed").length,
      icon: CircleCheck,
      iconBg: "bg-green-100",
      iconColor: "text-green-500",
    },
  ];
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
          👋 Welcome back,{" "}
          {userData?.fullname?.charAt(0).toUpperCase() +
            userData?.fullname?.slice(1)}
          !
        </h2>

        <p className="text-gray-500 mt-2 text-base md:text-lg">
          Here's what's happening with your support requests.
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
            {/**Stats Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={idx}
                    className="flex items-start gap-4 bg-white rounded-xl border border-blue-100
          shadow-sm px-6 py-5 hover:shadow-md transition-shadow duration-200"
                  >
                    {/* Icon */}
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-lg ${stat.iconBg}
            flex items-center justify-center`}
                    >
                      <Icon
                        size={24}
                        strokeWidth={2}
                        className={stat.iconColor}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Label */}
                      <p className="text-gray-600 text-sm font-medium">
                        {stat.label}
                      </p>

                      {/* Value */}
                      <p className="text-3xl font-bold text-gray-900 mt-1">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/**Recent Tickets Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">
                  Recent Tickets
                </h3>
                <a
                  href="/my-tickets"
                  className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-medium"
                >
                  View All <ArrowRight className="w-4 h-4" />
                </a>
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
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {loading ? (
                    <tr><td colSpan="7" className="px-6 py-8 text-center text-sm text-gray-500">Loading Tickets...</td></tr>
                  ) : error ? (
                    <tr><td colSpan="7" className="px-6 py-8 text-center text-sm text-red-600">{error}</td></tr>
                  ) : recentTickets.length === 0 ? (
                    <tr><td colSpan="7" className="px-6 py-8 text-center text-sm text-gray-500">No tickets found.</td></tr>
                  ) : recentTickets.map((ticket) => (
                    <tr
                      key={ticket._id}
                      className="hover:bg-gray-50"
                    >
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserDashboard;
