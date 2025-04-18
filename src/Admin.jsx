import React from "react";
import { UserPlus, Settings, FileText, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminComponent() {
  const navigate = useNavigate();
  return (
    <div className="p-6 mx-auto bg-white rounded-lg shadow-md">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <div className="flex items-center gap-4">
          <ShieldCheck className="w-8 h-8 text-indigo-600" />
        </div>
      </div>

      {/* Admin Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* User Management */}
        <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition">
          <div className="flex items-center gap-3 mb-4">
            <UserPlus className="w-8 h-8 text-blue-600" />
            <h2 className="text-xl font-semibold">User Management</h2>
          </div>
          <ul className="text-gray-600 text-sm space-y-2">
            <li>➔ Add new users</li>
            <li>➔ Edit/deactivate users</li>
            <li>➔ Set user permissions</li>
          </ul>
          <button
            onClick={() => navigate("/add-user")}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-gray-50 px-4 py-2 rounded"
          >
            Manage Users
          </button>
        </div>

        {/* System Configuration */}
        <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="w-8 h-8 text-green-600" />
            <h2 className="text-xl font-semibold">System Configuration</h2>
          </div>
          <ul className="text-gray-600 text-sm space-y-2">
            <li>➔ Manage sales averages</li>
            <li>➔ Manage categories/subcategories</li>
            <li>➔ Edit email templates</li>
          </ul>
          <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
            Configure System
          </button>
        </div>

        {/* Data Management */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-yellow-500" />
            <h2 className="text-xl font-semibold">Data & Logs</h2>
          </div>
          <ul className="text-gray-600 text-sm space-y-2">
            <li>➔ Data correction tools</li>
            <li>➔ View audit logs</li>
            <li>➔ Backup & restore</li>
          </ul>
          <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
            Manage Data
          </button>
        </div>
      </div>
    </div>
  );
}
