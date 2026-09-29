import React, { lazy } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import productImage from "../assets/user.avif";

function UserDashboard() {
  const { userData } = useSelector((state) => state.user);
  const stats = [
    { label: "Total Tickets", value: "5" },
    { label: "Open Tickets", value: "5" },
    { label: "Resolved Tickets", value: "5" },
  ];
  const tickets = [
    {
      id: "IC-001",
      title: "Laptop not working",
      category: "Hardware",
      discription: "hello",
      status: "Open",
      date: "Apr 26, 2025",
    },
    {
      id: "IC-002",
      title: "WiFi not connecting",
      category: "Network",
      discription: "hello",
      status: "In Progress",
      date: "Apr 24, 2025",
    },
    {
      id: "IC-003",
      title: "Library access issue",
      category: "Access",
      discription: "hello",
      status: "Resolved",
      date: "Apr 22, 2025",
    },
    {
      id: "IC-004",
      title: "Software installation",
      category: "Software",
      discription: "hello",
      status: "Resolved",
      date: "Apr 20, 2025",
    },
    {
      id: "IC-005",
      title: "Fee payment problem",
      category: "Finance",
      discription: "hello",
      status: "Open",
      date: "Apr 18, 2025",
    },
  ];
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="felx-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/**Welcome Banner */}
            <div className="relative overflow-hidden rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-blue-100 px-6 py-5 min-h-[145px] flex items-center justify-around">
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
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="w-[300px] bg-white rounded-xl border border-gray-100 shadow-sm px-3 py-3 
                 hover:shadow-md transition-all duration-200"
                >
                  <p className="text-gray-500 text-sm font-medium">
                    {stat.label}
                  </p>

                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>

        
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserDashboard;
