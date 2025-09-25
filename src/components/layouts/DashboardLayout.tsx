"use client";
import { ReactNode, useState } from "react";
import { FaTachometerAlt, FaShoppingCart, FaUsers, FaBox, FaSearch, FaBars } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import avatar from "../../../public/images/avatar.png";
import logo from "../../../public/images/logo.webp";
import { logout } from "../../../lib/auth";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const menuItems = [
    { text: "Dashboard", icon: <FaTachometerAlt />, path: "/" },
    { text: "Role Management", icon: <FaShoppingCart />, path: "/role-management" },
    { text: "User Management", icon: <FaUsers />, path: "/user-management" },
    { text: "Products", icon: <FaBox />, path: "/products" },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-[#FF5722] shadow-md transition-transform duration-300 z-50 w-64 transform ${open ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0
        `}
      >
        <Image width={180} height={71} src={logo} className="pl-2 pt-5 pb-7"  alt="logo"/>
        <nav className="pl-2">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.text}>
                <Link
                  href={item.path}
                  className="flex items-center gap-3 p-2 hover:bg-[#060a2f] text-white"
                >
                  {item.icon}
                  <span>{item.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        <header className="h-14 flex items-center justify-between px-4 text-white shadow z-30">
          <div className="md:hidden">
            <FaBars
              onClick={() => setOpen(!open)}
              className="w-8 h-8 text-red-500 cursor-pointer"
            />
          </div>

          <div className="relative hidden md:block flex-1 mx-4">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-3 py-1 rounded-md bg-gray-200 text-black focus:outline-none"
            />
          </div>

          <div className="relative">
            <Image
              width={56}
              height={56}
              src={avatar}
              alt="Avatar"
              className="rounded-full cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded-md shadow-lg overflow-hidden">
                <button className="block w-full px-4 py-2 hover:bg-gray-200 text-left">
                  Profile
                </button>
                <button onClick={logout} className="block w-full px-4 py-2 hover:bg-gray-200 text-left">
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-6 pt-16">{children}</main>
      </div>
    </div>
  );
}
