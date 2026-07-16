import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import Footer from "./Footer.jsx";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex flex-1">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 min-w-0 px-4 md:px-8 py-6 max-w-6xl mx-auto w-full">
          {children}
        </main>
      </div>
      <Footer />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: { background: "#1B2233", color: "#E7EAF3", fontSize: 13, borderRadius: 12 },
        }}
      />
    </div>
  );
}
