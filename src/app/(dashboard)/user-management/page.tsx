"use client";

import UserTable from "@/components/tables/UserTable";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  image?: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data.users || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle add or update user
  const handleSaveUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      role: formData.get("role"),
      department: formData.get("department"),
    };

    try {
      let url = "/api/users";
      let method: "POST" | "PUT" = "POST";

      if (editingUser) {
        url = `/api/users/${editingUser._id}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (result.success) {
        fetchUsers(); // refresh table
        setIsModalOpen(false);
        setEditingUser(null);
      } else {
        alert("Error: " + result.error);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  // Handle edit button
  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  // Handle delete user
  const handleDeleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      const result = await res.json();
      if (result.success) {
        setUsers((prev) => prev.filter((user) => user._id !== id));
      } else {
        alert(result.error);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  if (loading) return <p className="text-gray-500">Loading users...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <button
          onClick={() => { setIsModalOpen(true); setEditingUser(null); }}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
        >
          <FaPlus /> Add User
        </button>
      </div>

      {/* User Table */}
      <UserTable
        users={users}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">
              {editingUser ? "Edit User" : "Add New User"}
            </h2>

            <form className="space-y-4" onSubmit={handleSaveUser}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full border px-3 py-2 rounded"
                defaultValue={editingUser?.name || ""}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full border px-3 py-2 rounded"
                defaultValue={editingUser?.email || ""}
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                className="w-full border px-3 py-2 rounded"
                defaultValue={editingUser?.phone || ""}
                required
              />
              <input
                type="text"
                name="role"
                placeholder="Role"
                className="w-full border px-3 py-2 rounded"
                defaultValue={editingUser?.role || ""}
                required
              />
              <input
                type="text"
                name="department"
                placeholder="Department"
                className="w-full border px-3 py-2 rounded"
                defaultValue={editingUser?.department || ""}
                required
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setIsModalOpen(false); setEditingUser(null); }}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                >
                  {editingUser ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
