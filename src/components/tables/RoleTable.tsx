import { FaEdit, FaTrash } from "react-icons/fa";
interface Role {
  _id?: string;
  name: string;
  permissions: string[];
}
interface RoleTableProps {
  roles: Role[];
  onEdit: (role: Role) => void;
  onDelete: (id?: string) => void;
}

export default function RoleTable({ roles, onEdit, onDelete }: RoleTableProps) {
  return (
    <div className="overflow-x-auto border rounded">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="px-3 py-2">Role</th>
            <th className="px-3 py-2">Permissions</th>
            <th className="px-3 py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role._id} className="border-t hover:bg-gray-50">
              <td className="px-3 py-2">{role.name}</td>
              <td className="px-3 py-2 text-gray-600">
                {role.permissions.length > 0 ? role.permissions.join(", ") : "—"}
              </td>
              <td className="px-3 py-2 text-right space-x-2">
                <button
                  className="p-1 text-gray-500 hover:text-blue-600"
                  onClick={() => onEdit(role)}
                >
                  <FaEdit />
                </button>
                <button
                  className="p-1 text-gray-500 hover:text-red-600"
                  onClick={() => onDelete(role._id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
