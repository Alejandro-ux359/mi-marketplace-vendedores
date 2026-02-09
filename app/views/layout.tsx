"use client";

import { useState } from "react";
import Menu from "@/components/landing/views/Menu";
import TopBar from "@/components/landing/views/TopBar";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Menu isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main */}
      <main
        className={`
          flex-1 transition-all duration-300 ease-in-out
          min-h-screen overflow-y-auto
          ${isSidebarOpen ? "lg:ml-56" : "lg:ml-18"}
        `}
      >
        {/* Header móvil */}
        <div className="lg:hidden px-6 py-4 flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
          <span className="font-semibold text-lg">RenshaMarket</span>
        </div>

        {/* TopBar desktop */}
        <div className="hidden lg:block">
          <TopBar />
        </div>

        {/* Contenido */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
