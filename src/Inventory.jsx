import { useState } from "react";
import {
  Search,
  PlusCircle,
  AlertCircle,
  Download,
  Filter,
  RefreshCw,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function InventoryManagement() {
  const [inventoryItems, setInventoryItems] = useState([
    {
      id: 1,
      name: "Chicken",
      category: "Meat",
      quantity: 12.5,
      unit: "kg",
      status: "normal",
      lastUpdated: "2025-04-15",
    },
    {
      id: 2,
      name: "Beef",
      category: "Meat",
      quantity: 5.2,
      unit: "kg",
      status: "low",
      lastUpdated: "2025-04-16",
    },
    {
      id: 3,
      name: "Mayonnaise",
      category: "Condiments",
      quantity: 3,
      unit: "L",
      status: "normal",
      lastUpdated: "2025-04-14",
    },
    {
      id: 4,
      name: "Tomatoes",
      category: "Vegetables",
      quantity: 8.7,
      unit: "kg",
      status: "normal",
      lastUpdated: "2025-04-17",
    },
    {
      id: 5,
      name: "Lettuce",
      category: "Vegetables",
      quantity: 2.1,
      unit: "kg",
      status: "low",
      lastUpdated: "2025-04-16",
    },
    {
      id: 6,
      name: "Cheese",
      category: "Dairy",
      quantity: 4.5,
      unit: "kg",
      status: "normal",
      lastUpdated: "2025-04-15",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const categories = ["All", "Meat", "Vegetables", "Condiments", "Dairy"];

  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "low":
        return "text-red-600";
      case "normal":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            Inventory Management
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        {/* Action Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                placeholder="Search inventory..."
                className="pl-10 pr-4 py-2 border rounded-lg w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>
            <div className="ml-2">
              <div className="relative">
                <select
                  className="appearance-none bg-white border rounded-lg px-4 py-2 pr-8"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-2 top-2.5 text-gray-400 pointer-events-none"
                  size={18}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <button
              onClick={() => navigate("/add-new")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <PlusCircle size={18} className="mr-2" />
              Add Item
            </button>

            <button className="bg-white border border-gray-300 px-4 py-2 rounded-lg flex items-center">
              <Download size={18} className="mr-2" />
              Export
            </button>
            <button className="bg-white border border-gray-300 px-4 py-2 rounded-lg flex items-center">
              <RefreshCw size={18} />
            </button>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.quantity} {item.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {item.status === "low" && (
                        <AlertCircle size={16} className="text-red-600 mr-1" />
                      )}
                      <span
                        className={`text-sm ${getStatusColor(item.status)}`}
                      >
                        {item.status.charAt(0).toUpperCase() +
                          item.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.lastUpdated}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Usage Statistics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Low Stock Items
            </h3>
            <ul className="space-y-3">
              {inventoryItems
                .filter((item) => item.status === "low")
                .map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <AlertCircle size={16} className="text-red-600 mr-2" />
                      <span className="text-gray-800">{item.name}</span>
                    </div>
                    <span className="text-gray-600">
                      {item.quantity} {item.unit}
                    </span>
                  </li>
                ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Inventory by Category
            </h3>
            <div className="space-y-4">
              {categories
                .filter((c) => c !== "All")
                .map((category) => (
                  <div key={category}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{category}</span>
                      <span className="font-medium">
                        {
                          inventoryItems.filter(
                            (item) => item.category === category
                          ).length
                        }{" "}
                        items
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${
                            (inventoryItems.filter(
                              (item) => item.category === category
                            ).length /
                              inventoryItems.length) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              <div className="flex">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <PlusCircle size={16} className="text-green-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    Added 5kg of Chicken
                  </p>
                  <p className="text-xs text-gray-500">Today, 10:30 AM</p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <RefreshCw size={16} className="text-blue-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    Updated Mayonnaise stock
                  </p>
                  <p className="text-xs text-gray-500">Yesterday, 3:45 PM</p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle size={16} className="text-red-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    Lettuce stock is low
                  </p>
                  <p className="text-xs text-gray-500">Yesterday, 2:15 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
