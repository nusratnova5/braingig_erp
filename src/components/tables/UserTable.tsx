"use client";

import { FaEdit, FaTrash, FaKey } from "react-icons/fa";

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  image?: string;
}

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

export default function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6">Image</th>
            <th className="py-3 px-6">Name</th>
            <th className="py-3 px-6">Email</th>
            <th className="py-3 px-6">Phone</th>
            <th className="py-3 px-6">Role</th>
            <th className="py-3 px-6">Department</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {users.map((user) => (
            <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-6">
                <img
                  src={user.image || `https://i.pravatar.cc/50?u=${user._id}`}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </td>
              <td className="py-3 px-6">{user.name}</td>
              <td className="py-3 px-6">{user.email}</td>
              <td className="py-3 px-6">{user.phone}</td>
              <td className="py-3 px-6">{user.role}</td>
              <td className="py-3 px-6">{user.department}</td>
              <td className="py-3 px-6 text-center">
                <div className="flex items-center justify-center gap-3">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => onEdit(user)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => onDelete(user._id)}
                  >
                    <FaTrash />
                  </button>
                  <button className="text-yellow-500 hover:text-yellow-600">
                    <FaKey />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
