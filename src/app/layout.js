// app/layout.jsx
import "@/app/globals.css";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#F8FCFA] min-h-screen">
        <Navbar />
        <div className="flex">
          {/* Sidebar below Navbar */}
          <Sidebar />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
