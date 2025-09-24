"use client";

import RoleTable from "@/components/tables/RoleTable";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";

interface Role {
  _id?: string;
  name: string;
  permissions: string[];
}

export default function RoleManagementPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [open, setOpen] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [editingRoleId, setEditingRoleId] = useState<string>("");

  const permissions = [
    "Create User",
    "Edit User",
    "Delete User",
    "View Reports",
    "Manage Products",
    "Approve Orders",
  ];

  // 👉 Fetch roles from API
  const fetchRoles = async () => {
    try {
      const res = await fetch("/api/roles");
      const data = await res.json();
      setRoles(data);
    } catch (error) {
      console.error("Failed to fetch roles", error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  // 👉 Submit new role or update existing role
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleName) return;

    try {
      const method = editingRoleId ? "PUT" : "POST";
      const url = editingRoleId ? `/api/roles/${editingRoleId}` : "/api/roles";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: roleName,
          permissions: selectedPermissions,
        }),
      });

      if (res.ok) {
        setRoleName("");
        setSelectedPermissions([]);
        setOpen(false);
        setEditingRoleId("");
        fetchRoles();
      }
    } catch (error) {
      console.error("Failed to save role", error);
    }
  };

  // 👉 Delete role
  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this role?")) return;

    try {
      const res = await fetch(`/api/roles/${id}`, { method: "DELETE" });
      if (res.ok) fetchRoles();
    } catch (error) {
      console.error("Failed to delete role", error);
    }
  };

  // 👉 Edit role
  const handleEdit = (role: Role) => {
    setRoleName(role.name);
    setSelectedPermissions(role.permissions);
    setEditingRoleId(role._id || "");
    setOpen(true);
  };

  // 👉 Toggle permission selection
  const togglePermission = (permission: string) => {
    if (selectedPermissions.includes(permission)) {
      setSelectedPermissions(selectedPermissions.filter((p) => p !== permission));
    } else {
      setSelectedPermissions([...selectedPermissions, permission]);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Role Management</h1>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center px-3 py-2 text-sm bg-gray-800 text-white rounded hover:bg-gray-700"
        >
          <FaPlus className="mr-2" /> Add Role
        </button>
      </div>

      {/* Table Component */}
      <RoleTable roles={roles} onEdit={handleEdit} onDelete={handleDelete} />

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30">
          <div className="bg-white w-full max-w-sm rounded border p-5">
            <h2 className="text-base font-semibold mb-3">
              {editingRoleId ? "Edit Role" : "Add Role"}
            </h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Role name"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                className="w-full border px-3 py-2 rounded mb-4 text-sm"
              />

              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Permissions:</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {permissions.map((perm) => (
                    <label key={perm} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedPermissions.includes(perm)}
                        onChange={() => togglePermission(perm)}
                      />
                      <span>{perm}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2 text-sm">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setEditingRoleId("");
                    setRoleName("");
                    setSelectedPermissions([]);
                  }}
                  className="px-3 py-1 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700"
                >
                  {editingRoleId ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
