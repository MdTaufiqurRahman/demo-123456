import { useState } from "react";
import {
  Search,
  PlusCircle,
  Calendar,
  FileText,
  Filter,
  Download,
  Trash2,
  Edit2,
  ChevronDown,
} from "lucide-react";

export default function ExpenseManagement() {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      date: "2025-04-15",
      category: "Ingredients",
      subcategory: "Meat",
      description: "Weekly meat delivery",
      amount: 450.75,
      vat: 86.25,
      paymentMethod: "Bank Transfer",
      receipt: true,
    },
    {
      id: 2,
      date: "2025-04-16",
      category: "Utilities",
      subcategory: "Electricity",
      description: "Monthly electricity bill",
      amount: 210.33,
      vat: 40.07,
      paymentMethod: "Bank Transfer",
      receipt: true,
    },
    {
      id: 3,
      date: "2025-04-16",
      category: "Supplies",
      subcategory: "Cleaning",
      description: "Cleaning supplies",
      amount: 58.9,
      vat: 11.2,
      paymentMethod: "Cash",
      receipt: true,
    },
    {
      id: 4,
      date: "2025-04-17",
      category: "Maintenance",
      subcategory: "Equipment",
      description: "Oven repair",
      amount: 125.0,
      vat: 23.8,
      paymentMethod: "Cash",
      receipt: false,
    },
    {
      id: 5,
      date: "2025-04-17",
      category: "Ingredients",
      subcategory: "Vegetables",
      description: "Fresh produce delivery",
      amount: 187.45,
      vat: 35.7,
      paymentMethod: "Bank Transfer",
      receipt: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentMonth, setCurrentMonth] = useState("April 2025");
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // New expense form state
  const [newExpense, setNewExpense] = useState({
    date: new Date().toISOString().split("T")[0],
    category: "",
    subcategory: "",
    description: "",
    amount: "",
    vat: "",
    paymentMethod: "Cash",
    receipt: false,
  });

  const categories = [
    { name: "All" },
    {
      name: "Ingredients",
      subcategories: ["Meat", "Vegetables", "Dairy", "Dry Goods", "Other"],
    },
    {
      name: "Utilities",
      subcategories: ["Electricity", "Water", "Gas", "Internet", "Other"],
    },
    {
      name: "Supplies",
      subcategories: ["Cleaning", "Disposables", "Kitchen", "Office", "Other"],
    },
    {
      name: "Maintenance",
      subcategories: ["Equipment", "Building", "IT", "Other"],
    },
    {
      name: "Staff",
      subcategories: ["Wages", "Training", "Benefits", "Other"],
    },
    {
      name: "Other",
      subcategories: [
        "Marketing",
        "Insurance",
        "Subscriptions",
        "Miscellaneous",
      ],
    },
  ];

  const subcategories = newExpense.category
    ? categories.find((cat) => cat.name === newExpense.category)
        ?.subcategories || []
    : [];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewExpense({
      ...newExpense,
      [name]: type === "checkbox" ? checked : value,
    });

    // Auto-calculate VAT when amount changes
    if (name === "amount") {
      const amount = parseFloat(value) || 0;
      setNewExpense({
        ...newExpense,
        [name]: value,
        vat: (amount * 0.19).toFixed(2), // Assuming 19% VAT
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = expenses.length + 1;
    setExpenses([...expenses, { id, ...newExpense }]);
    setShowAddExpense(false);
    setNewExpense({
      date: new Date().toISOString().split("T")[0],
      category: "",
      subcategory: "",
      description: "",
      amount: "",
      vat: "",
      paymentMethod: "Cash",
      receipt: false,
    });
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setNewExpense({
      ...newExpense,
      category,
      subcategory: "", // Reset subcategory when category changes
    });
  };

  const totalAmount = expenses
    .reduce((sum, expense) => sum + parseFloat(expense.amount), 0)
    .toFixed(2);
  const totalVAT = expenses
    .reduce((sum, expense) => sum + parseFloat(expense.vat), 0)
    .toFixed(2);

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || expense.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const expensesByCategory = {};
  expenses.forEach((expense) => {
    if (!expensesByCategory[expense.category]) {
      expensesByCategory[expense.category] = 0;
    }
    expensesByCategory[expense.category] += parseFloat(expense.amount);
  });

  // Get category colors for chart
  const getCategoryColor = (category, index) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-red-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
    ];

    // Map specific categories to colors for consistency
    const categoryColors = {
      Ingredients: "bg-green-500",
      Utilities: "bg-blue-500",
      Supplies: "bg-yellow-500",
      Maintenance: "bg-red-500",
      Staff: "bg-purple-500",
      Other: "bg-gray-500",
    };

    return categoryColors[category] || colors[index % colors.length];
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            Expense Management
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm text-gray-500 mb-1">
              Total Expenses (Current Month)
            </p>
            <p className="text-2xl font-semibold text-gray-800">
              ${totalAmount}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm text-gray-500 mb-1">
              Total VAT (Current Month)
            </p>
            <p className="text-2xl font-semibold text-gray-800">${totalVAT}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm text-gray-500 mb-1">Current Period</p>
            <div className="flex justify-between items-center">
              <p className="text-2xl font-semibold text-gray-800">
                {currentMonth}
              </p>
              <button className="p-2 rounded-md hover:bg-gray-100">
                <Calendar size={20} className="text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 bg-white p-6 rounded-lg shadow">
          <div className="flex items-center w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                placeholder="Search expenses..."
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
                    <option key={category.name} value={category.name}>
                      {category.name}
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
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
              onClick={() => setShowAddExpense(!showAddExpense)}
            >
              <PlusCircle size={18} className="mr-2" />
              Add Expense
            </button>
            <button className="bg-white border border-gray-300 px-4 py-2 rounded-lg flex items-center">
              <Download size={18} className="mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Add Expense Form */}
        {showAddExpense && (
          <div className="bg-white rounded-lg shadow mb-6 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Add New Expense
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={newExpense.date}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={newExpense.category}
                    onChange={handleCategoryChange}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories
                      .filter((cat) => cat.name !== "All")
                      .map((category) => (
                        <option key={category.name} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subcategory
                  </label>
                  <select
                    name="subcategory"
                    value={newExpense.subcategory}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-3 py-2"
                    disabled={!newExpense.category}
                    required
                  >
                    <option value="">Select Subcategory</option>
                    {subcategories.map((subcat) => (
                      <option key={subcat} value={subcat}>
                        {subcat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="amount"
                    value={newExpense.amount}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="0.00"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    VAT
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="vat"
                    value={newExpense.vat}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="0.00"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Method
                  </label>
                  <select
                    name="paymentMethod"
                    value={newExpense.paymentMethod}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  >
                    <option value="Cash">Cash</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                  </select>
                </div>
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={newExpense.description}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Brief description of expense"
                    required
                  />
                </div>
                <div className="md:col-span-3 flex items-center">
                  <input
                    type="checkbox"
                    id="receipt"
                    name="receipt"
                    checked={newExpense.receipt}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <label
                    htmlFor="receipt"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Receipt Available
                  </label>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2"
                  onClick={() => setShowAddExpense(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Expenses Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  VAT
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Receipt
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredExpenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {expense.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <p className="font-medium">{expense.category}</p>
                      <p className="text-xs text-gray-500">
                        {expense.subcategory}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {expense.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${parseFloat(expense.amount).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${parseFloat(expense.vat).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {expense.paymentMethod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {expense.receipt ? (
                      <div className="flex items-center">
                        <FileText size={16} className="text-green-600 mr-1" />
                        <span>Yes</span>
                      </div>
                    ) : (
                      <span>No</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <Edit2 size={16} />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Analysis Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Expense Breakdown */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Expense Breakdown by Category
            </h3>
            <div className="space-y-4">
              {Object.entries(expensesByCategory).map(
                ([category, amount], index) => {
                  const percentage = (
                    (amount / parseFloat(totalAmount)) *
                    100
                  ).toFixed(1);
                  return (
                    <div key={category}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">{category}</span>
                        <span className="font-medium">
                          ${amount.toFixed(2)} ({percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`${getCategoryColor(
                            category,
                            index
                          )} h-2 rounded-full`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>

          {/* Monthly Trend */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Recent Expenses
            </h3>
            <div className="space-y-3">
              {expenses.slice(0, 5).map((expense) => (
                <div
                  key={expense.id}
                  className="flex justify-between items-center pb-2 border-b border-gray-100"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {expense.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      {expense.date} • {expense.category}
                    </p>
                  </div>
                  <p className="font-medium text-gray-800">
                    ${parseFloat(expense.amount).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <button className="mt-4 text-blue-600 text-sm flex items-center">
              View all expenses
              <ChevronDown size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
