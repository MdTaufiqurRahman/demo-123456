import React, { useState } from "react";

export default function ReportsStatements() {
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [reportType, setReportType] = useState("");
  const [category, setCategory] = useState("");

  const handleGenerateReport = () => {
    console.log("Generating report:", { dateRange, reportType, category });
  };

  const handleExport = () => {
    console.log("Exporting report...");
  };

  const handleSave = () => {
    console.log("Saving report...");
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg my-6 mx-6">
      <h1 className="text-3xl font-bold mb-6">Reports & Statements</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Date Range Selector */}
        <div>
          <label className="block text-gray-700 mb-2">Start Date:</label>
          <input
            type="date"
            className="border rounded px-4 py-2 w-full"
            value={dateRange.start}
            onChange={(e) =>
              setDateRange({ ...dateRange, start: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">End Date:</label>
          <input
            type="date"
            className="border rounded px-4 py-2 w-full"
            value={dateRange.end}
            onChange={(e) =>
              setDateRange({ ...dateRange, end: e.target.value })
            }
          />
        </div>

        {/* Report Type Selector */}
        <div>
          <label className="block text-gray-700 mb-2">Report Type:</label>
          <select
            className="border rounded px-4 py-2 w-full"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            <option value="">Select type</option>
            <option value="daily">Daily Report</option>
            <option value="weekly">Weekly Report</option>
            <option value="monthly">Monthly Report</option>
            <option value="custom">Custom Report</option>
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-gray-700 mb-2">
            Category (Optional):
          </label>
          <input
            type="text"
            className="border rounded px-4 py-2 w-full"
            placeholder="Sales, Expenses, Inventory..."
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={handleGenerateReport}
          className="px-6 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
        >
          Generate Report
        </button>
        <button
          onClick={handleExport}
          className="px-6 py-2 rounded bg-green-600 hover:bg-green-700 text-white"
        >
          Export/Print
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 rounded bg-yellow-500 hover:bg-yellow-600 text-white"
        >
          Save Report
        </button>
      </div>
    </div>
  );
}
