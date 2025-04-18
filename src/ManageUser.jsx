import React, { useState } from "react";
import { PlusCircle, Edit, Trash2, ArrowLeft } from "lucide-react";
import AddUser from "./AddUser";

export default function ManageUsers() {
  const [showAddUser, setShowAddUser] = useState(false);
  const [users, setUsers] = useState([
    // example users
  ]);

  const handleSaveUser = (newUser) => {
    setUsers((prev) => [...prev, newUser]);
    setShowAddUser(false);
  };
  return (
    <div className="p-6 bg-white rounded-lg shadow-md m-6">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button
            onClick={() => window.history.back()}
            className="mr-4 p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Back Page</h1>
          </div>
        </div>
        <button
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          onClick={() => setShowAddUser(true)}
        >
          <PlusCircle className="w-5 h-5" />
          Add User
        </button>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Example Row */}
            <tr className="border-t hover:bg-gray-50">
              <td className="p-4">John Doe</td>
              <td className="p-4">john@example.com</td>
              <td className="p-4">Admin</td>
              <td className="p-4">
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                  Active
                </span>
              </td>
              <td className="p-4 flex justify-center gap-4">
                <button className="text-blue-600 hover:text-blue-800">
                  <Edit className="w-5 h-5" />
                </button>
                <button className="text-red-600 hover:text-red-800">
                  <Trash2 className="w-5 h-5" />
                </button>
              </td>
            </tr>

            {/* Another Example Row */}
            <tr className="border-t hover:bg-gray-50">
              <td className="p-4">Jane Smith</td>
              <td className="p-4">jane@example.com</td>
              <td className="p-4">Manager</td>
              <td className="p-4">
                <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
                  Inactive
                </span>
              </td>
              <td className="p-4 flex justify-center gap-4">
                <button className="text-blue-600 hover:text-blue-800">
                  <Edit className="w-5 h-5" />
                </button>
                <button className="text-red-600 hover:text-red-800">
                  <Trash2 className="w-5 h-5" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {showAddUser && (
        <AddUser
          onSave={handleSaveUser}
          onCancel={() => setShowAddUser(false)}
        />
      )}
    </div>
  );
}
