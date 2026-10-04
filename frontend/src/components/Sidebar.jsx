import {
  Book,
  Bot,
  GraduationCap,
  Home,
  LogOut,
  Plus,
  Ticket,
  User,
} from "lucide-react";
import React from "react";

function Sidebar() {
  const navItems = [
    { icon: Home, label: "Dashboard", path: "/user-dashboard" },
    { icon: Ticket, label: "My Tickets", path: "/my-tickets" },
    { icon: Plus, label: "Raise Ticket", path: "/raise-ticket" },
    { icon: Bot, label: "Ai Copilot", path: "/copilot" },
    { icon: Book, label: "Knowledge Base", path: "/knowledge-base" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen">
      {/**Logo */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold">IntelliCampus</h1>
        </div>
      </div>

      {/**Navigation Items */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path
          return (<a 
          href={item.path} 
          key={item.path}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
            isActive?'bg-blue-600 text-white':'text-gray-300 hover:bg-slate-800'}`}
          >
           <Icon className="w-5 h-5"/>
           <span className="text-sm font-medium">{item.label}</span>
          </a>
          )
        })}
      </nav>
     {/**Logout Button */}
     <div className="p-4 border-t border-slate-700 ">
      <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:bg-slate-800 rounded-lg transition cursor-pointer">
        <LogOut className="w-5 h-5"/>
        <span className="text-sm font-medium">
          Logout
        </span>
      </button>
     </div>
    </aside>
  );
}

export default Sidebar;
