import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import {
  Bell,
  LogOut,
  ChevronDown,
  PieChart,
  Users,
  ShoppingCart,
  Clipboard,
  DollarSign,
  CreditCard,
  Calendar,
  TrendingUp,
  TrendingDown,
  Menu,
  Plus,
} from "lucide-react";
import ExpenseManagement from "./Expenses";
import InventoryManagement from "./Inventory";
import InventoryAddItem from "./AddNewItem";
import DailyInputComponent from "./DailyInput";
import ReportsStatements from "./ReportsStatements";
import AdminComponent from "./Admin";
import ManageUsers from "./ManageUser";

// Dashboard Component (existing code)
function Dashboard() {
  // Mock data for dashboard
  const dashboardData = {
    dailySales: 2845.5,
    cardSales: 1732.2,
    cashBalance: 1113.3,
    dailyAverage: {
      value: 2650.75,
      trend: "up",
      percentage: 7.3,
    },
    recentActivities: [
      {
        id: 1,
        user: "Maria",
        action: "Added cash sale",
        amount: 154.5,
        time: "10 min ago",
      },
      {
        id: 2,
        user: "John",
        action: "Recorded daily expenses",
        amount: 87.25,
        time: "25 min ago",
      },
      {
        id: 3,
        user: "Anna",
        action: "Updated inventory",
        item: "Beef",
        time: "1 hour ago",
      },
      {
        id: 4,
        user: "Michael",
        action: "Processed card payment",
        amount: 243.75,
        time: "2 hours ago",
      },
    ],
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="p-4">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Hello, John!</h2>
          <p className="text-gray-600">{currentDate}</p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
            <Plus size={16} className="mr-1" />
            New Entry
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Daily Sales</h3>
            <div className="p-2 bg-blue-100 rounded-md">
              <DollarSign size={20} className="text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            ${dashboardData.dailySales.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 mt-2">Today's total sales</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Card Sales</h3>
            <div className="p-2 bg-green-100 rounded-md">
              <CreditCard size={20} className="text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            ${dashboardData.cardSales.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 mt-2">Total card transactions</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Cash Balance</h3>
            <div className="p-2 bg-yellow-100 rounded-md">
              <DollarSign size={20} className="text-yellow-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            ${dashboardData.cashBalance.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 mt-2">Current cash on hand</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Daily Average</h3>
            <div className="p-2 bg-purple-100 rounded-md">
              {dashboardData.dailyAverage.trend === "up" ? (
                <TrendingUp size={20} className="text-green-600" />
              ) : (
                <TrendingDown size={20} className="text-red-600" />
              )}
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            ${dashboardData.dailyAverage.value.toFixed(2)}
          </p>
          <p
            className={`text-sm flex items-center mt-2 ${
              dashboardData.dailyAverage.trend === "up"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {dashboardData.dailyAverage.trend === "up" ? (
              <TrendingUp size={14} className="mr-1" />
            ) : (
              <TrendingDown size={14} className="mr-1" />
            )}
            {dashboardData.dailyAverage.percentage}% from last week
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Access */}
        <div className="bg-white rounded-lg shadow-sm p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Access
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <button className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg flex flex-col items-center justify-center">
              <div className="p-3 bg-blue-100 rounded-full mb-2">
                <Clipboard size={20} className="text-blue-600" />
              </div>
              <span className="text-gray-700 text-sm">Add Daily Input</span>
            </button>

            <button className="bg-green-50 hover:bg-green-100 p-4 rounded-lg flex flex-col items-center justify-center">
              <div className="p-3 bg-green-100 rounded-full mb-2">
                <ShoppingCart size={20} className="text-green-600" />
              </div>
              <span className="text-gray-700 text-sm">Add Inventory</span>
            </button>

            <button className="bg-yellow-50 hover:bg-yellow-100 p-4 rounded-lg flex flex-col items-center justify-center">
              <div className="p-3 bg-yellow-100 rounded-full mb-2">
                <DollarSign size={20} className="text-yellow-600" />
              </div>
              <span className="text-gray-700 text-sm">Expenses</span>
            </button>

            <button className="bg-purple-50 hover:bg-purple-100 p-4 rounded-lg flex flex-col items-center justify-center">
              <div className="p-3 bg-purple-100 rounded-full mb-2">
                <Calendar size={20} className="text-purple-600" />
              </div>
              <span className="text-gray-700 text-sm">Reports</span>
            </button>
          </div>
        </div>

        {/* Mini Calendar */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Calendar</h3>
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <button className="text-gray-500 hover:text-gray-700">
                &lt;
              </button>
              <h4 className="font-medium">April 2025</h4>
              <button className="text-gray-500 hover:text-gray-700">
                &gt;
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              <div className="text-gray-500">Su</div>
              <div className="text-gray-500">Mo</div>
              <div className="text-gray-500">Tu</div>
              <div className="text-gray-500">We</div>
              <div className="text-gray-500">Th</div>
              <div className="text-gray-500">Fr</div>
              <div className="text-gray-500">Sa</div>

              {/* Calendar days - this would be dynamically generated */}
              <div className="text-gray-400 py-1">30</div>
              <div className="text-gray-400 py-1">31</div>
              <div className="py-1">1</div>
              <div className="py-1">2</div>
              <div className="py-1">3</div>
              <div className="py-1">4</div>
              <div className="py-1">5</div>
              <div className="py-1">6</div>
              <div className="py-1">7</div>
              <div className="py-1">8</div>
              <div className="py-1">9</div>
              <div className="py-1">10</div>
              <div className="py-1">11</div>
              <div className="py-1">12</div>
              <div className="py-1">13</div>
              <div className="py-1">14</div>
              <div className="py-1">15</div>
              <div className="py-1">16</div>
              <div className="bg-blue-100 text-blue-800 rounded-full py-1">
                17
              </div>
              <div className="py-1">18</div>
              <div className="py-1">19</div>
              <div className="py-1">20</div>
              <div className="py-1">21</div>
              <div className="py-1">22</div>
              <div className="py-1">23</div>
              <div className="py-1">24</div>
              <div className="py-1">25</div>
              <div className="py-1">26</div>
              <div className="py-1">27</div>
              <div className="py-1">28</div>
              <div className="py-1">29</div>
              <div className="py-1">30</div>
              <div className="text-gray-400 py-1">1</div>
              <div className="text-gray-400 py-1">2</div>
              <div className="text-gray-400 py-1">3</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Activities
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dashboardData.recentActivities.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {activity.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {activity.action}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {activity.amount
                      ? `$${activity.amount.toFixed(2)}`
                      : activity.item || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {activity.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-right">
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View All Activities
          </button>
        </div>
      </div>
    </div>
  );
}

// Placeholder components for other routes
function DailyInput() {
  return (
    <div className="p-6">
      <DailyInputComponent />
    </div>
  );
}

function Inventory() {
  return (
    <div className="p-4">
      <InventoryManagement />
    </div>
  );
}

function Expenses() {
  return (
    <div className="p-6">
      <ExpenseManagement />
    </div>
  );
}

function Admin() {
  return (
    <div className="p-6">
      <AdminComponent />
    </div>
  );
}

// Navigation Component
function SidebarNav({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();

  // Navigation items configuration
  const navItems = [
    { path: "/", icon: <PieChart size={20} />, label: "Dashboard" },
    {
      path: "/daily-input",
      icon: <Clipboard size={20} />,
      label: "Daily Input",
    },
    {
      path: "/inventory",
      icon: <ShoppingCart size={20} />,
      label: "Inventory",
    },
    { path: "/expenses", icon: <DollarSign size={20} />, label: "Expenses" },
    { path: "/admin", icon: <Users size={20} />, label: "Admin" },
    {
      path: "/report",
      icon: <TrendingUp size={20} />,
      label: "Report",
    },
  ];

  return (
    <div
      className={`${
        sidebarOpen ? "w-64" : "w-20"
      } bg-blue-800 text-white transition-all duration-300 ease-in-out`}
    >
      <div className="p-4 flex items-center justify-between">
        <h2 className={`font-bold text-xl ${!sidebarOpen && "hidden"}`}>
          Restaurant Name
        </h2>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1 rounded-full hover:bg-blue-700"
        >
          <Menu size={20} />
        </button>
      </div>

      <nav className="mt-6">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-3 flex items-center rounded-md mx-2 mt-2 ${
                isActive
                  ? "bg-blue-900 text-white"
                  : "text-blue-200 hover:bg-blue-700 hover:text-white"
              }`}
            >
              {item.icon}
              <span className={`ml-3 ${!sidebarOpen && "hidden"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

// Layout Component
function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  // Get current page title
  const getCurrentPageTitle = () => {
    const path = location.pathname;
    if (path === "/") return "Dashboard";
    if (path === "/daily-input") return "Daily Input";
    if (path === "/inventory") return "Inventory";
    if (path === "/expenses") return "Expenses";
    if (path === "/admin") return "Admin";
    if (path === "/add-new") return "Add New Item";
    if (path === "/report") return "Report";
    if (path === "/admin") return "Manage Users";
    return "Restaurant Name";
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SidebarNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Top Navigation */}
        <div className="bg-white shadow-sm flex justify-between items-center p-4 sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-gray-800">
            {getCurrentPageTitle()}
          </h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                JD
              </div>
              <span className="text-gray-700">John Doe</span>
              <ChevronDown size={16} />
            </div>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {/* Page Content */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/daily-input" element={<DailyInput />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/add-new" element={<InventoryAddItem />} />
          <Route path="/add-user" element={<ManageUsers />} />
          <Route path="/report" element={<ReportsStatements />} />
        </Routes>
      </div>
    </div>
  );
}

// Main App Component
export default function RestaurantDashboard() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
