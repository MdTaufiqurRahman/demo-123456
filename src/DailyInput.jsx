import React, { useState } from "react";

export default function DailyInputComponent() {
  const [date, setDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const [formData, setFormData] = useState({
    sales: "",
    cardSales: "",
    paragonSales: "",
    paragonVat: "",
    materialsUsage: "",
    cashAdd: "",
    cashWithdraw: "",
    dailyExpenses: "",
  });

  const isFormComplete = Object.values(formData).every((val) => val !== "");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Saved data:", { date, ...formData });
  };

  const handleSubmit = () => {
    console.log("Submitted for approval:", { date, ...formData });
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Daily Input</h1>

      {/* Date Selector */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Date:</label>
        <input
          type="date"
          className="border rounded px-4 py-2 w-full"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* Input Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sales */}
        <div>
          <label className="block text-gray-700 mb-2">Sales (Cash):</label>
          <input
            type="number"
            name="sales"
            value={formData.sales}
            onChange={handleChange}
            className="border rounded px-4 py-2 w-full"
            placeholder="Enter cash sales amount"
          />
        </div>

        {/* Card Sales */}
        <div>
          <label className="block text-gray-700 mb-2">Card Sales:</label>
          <input
            type="number"
            name="cardSales"
            value={formData.cardSales}
            onChange={handleChange}
            className="border rounded px-4 py-2 w-full"
            placeholder="Enter card sales amount"
          />
        </div>

        {/* Paragon Sales */}
        <div>
          <label className="block text-gray-700 mb-2">Paragon Sales:</label>
          <input
            type="number"
            name="paragonSales"
            value={formData.paragonSales}
            onChange={handleChange}
            className="border rounded px-4 py-2 w-full"
            placeholder="Enter paragon sales amount"
          />
        </div>

        {/* Paragon VAT */}
        <div>
          <label className="block text-gray-700 mb-2">Paragon VAT:</label>
          <input
            type="number"
            name="paragonVat"
            value={formData.paragonVat}
            onChange={handleChange}
            className="border rounded px-4 py-2 w-full"
            placeholder="Enter VAT amount"
          />
        </div>

        {/* Materials Usage */}
        <div>
          <label className="block text-gray-700 mb-2">Materials Usage:</label>
          <input
            type="number"
            name="materialsUsage"
            value={formData.materialsUsage}
            onChange={handleChange}
            className="border rounded px-4 py-2 w-full"
            placeholder="Enter material usage cost"
          />
        </div>

        {/* Cash Management */}
        <div>
          <label className="block text-gray-700 mb-2">Cash Add:</label>
          <input
            type="number"
            name="cashAdd"
            value={formData.cashAdd}
            onChange={handleChange}
            className="border rounded px-4 py-2 w-full"
            placeholder="Enter amount added to cash"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Cash Withdraw:</label>
          <input
            type="number"
            name="cashWithdraw"
            value={formData.cashWithdraw}
            onChange={handleChange}
            className="border rounded px-4 py-2 w-full"
            placeholder="Enter amount withdrawn from cash"
          />
        </div>

        {/* Daily Expenses */}
        <div>
          <label className="block text-gray-700 mb-2">Daily Expenses:</label>
          <input
            type="number"
            name="dailyExpenses"
            value={formData.dailyExpenses}
            onChange={handleChange}
            className="border rounded px-4 py-2 w-full"
            placeholder="60000"
            disabled
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={handleSave}
          disabled={!isFormComplete}
          className={`px-6 py-2 rounded text-white ${
            isFormComplete
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Save
        </button>
        <button
          onClick={handleSubmit}
          disabled={!isFormComplete}
          className={`px-6 py-2 rounded text-white ${
            isFormComplete
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Submit for Approval
        </button>
      </div>
    </div>
  );
}
