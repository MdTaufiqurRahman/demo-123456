import { useState } from "react";
import {
  ArrowLeft,
  Save,
  X,
  HelpCircle,
  Plus,
  Calendar,
  BarChart2,
} from "lucide-react";

export default function InventoryAddItem() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    unitType: "kg",
    quantity: "",
    cost: "",
    supplier: "",
    minStockLevel: "",
    expiryDate: "",
    storageLocation: "",
    description: "",
    trackExpiryDate: false,
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const categories = [
    "Meat",
    "Seafood",
    "Dairy",
    "Produce",
    "Dry Goods",
    "Beverages",
    "Cleaning Supplies",
    "Paper Goods",
    "Condiments",
    "Spices",
    "Other",
  ];

  const unitTypes = [
    "kg",
    "g",
    "L",
    "ml",
    "pcs",
    "boxes",
    "packs",
    "bottles",
    "cans",
    "bags",
  ];

  const suppliers = [
    "Metro Wholesale",
    "Fresh Farm Produce",
    "Quality Meats",
    "Ocean Catch Seafood",
    "Beverage Distributors Inc.",
    "Restaurant Supply Co.",
    "CleanPro Supplies",
    "Other",
  ];

  const storageLocations = [
    "Main Kitchen",
    "Dry Storage",
    "Walk-in Cooler",
    "Freezer",
    "Bar Area",
    "Front Storage",
    "Other",
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error when field is being edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Item name is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.quantity) newErrors.quantity = "Quantity is required";
    else if (isNaN(formData.quantity) || parseFloat(formData.quantity) < 0)
      newErrors.quantity = "Quantity must be a positive number";

    if (
      formData.cost &&
      (isNaN(formData.cost) || parseFloat(formData.cost) < 0)
    )
      newErrors.cost = "Cost must be a positive number";

    if (
      formData.minStockLevel &&
      (isNaN(formData.minStockLevel) || parseFloat(formData.minStockLevel) < 0)
    )
      newErrors.minStockLevel = "Minimum stock level must be a positive number";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData);

    // Show success message
    setShowSuccess(true);

    // Reset form after success (in a real app, you might want to wait for API confirmation)
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        name: "",
        category: "",
        unitType: "kg",
        quantity: "",
        cost: "",
        supplier: "",
        minStockLevel: "",
        expiryDate: "",
        storageLocation: "",
        description: "",
        trackExpiryDate: false,
        image: null,
      });
    }, 3000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={() => window.history.back()}
              className="mr-4 p-2 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                Add New Inventory Item
              </h1>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 flex items-center"
            >
              <X size={18} className="mr-2" />
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center"
            >
              <Save size={18} className="mr-2" />
              Save Item
            </button>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-6 right-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md z-50 animate-fade-in-down">
          <div className="flex">
            <div className="py-1">
              <svg
                className="h-6 w-6 text-green-500 mr-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <p className="font-bold">Success!</p>
              <p className="text-sm">Item has been added to inventory.</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1">
        <form onSubmit={handleSubmit} className=" mt-4 mx-auto">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Basic Information Section */}
            <div className="p-6 border-b">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Item Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="E.g., Chicken Breast"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`w-full border ${
                      errors.category ? "border-red-500" : "border-gray-300"
                    } rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500`}
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.category}
                    </p>
                  )}
                </div>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      className={`w-full border ${
                        errors.quantity ? "border-red-500" : "border-gray-300"
                      } rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="0.00"
                    />
                    {errors.quantity && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.quantity}
                      </p>
                    )}
                  </div>
                  <div className="w-1/3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Unit Type
                    </label>
                    <select
                      name="unitType"
                      value={formData.unitType}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {unitTypes.map((unit) => (
                        <option key={unit} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cost Per Unit
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input
                      type="number"
                      name="cost"
                      value={formData.cost}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      className={`w-full border ${
                        errors.cost ? "border-red-500" : "border-gray-300"
                      } rounded-lg pl-8 pr-4 py-2 focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="0.00"
                    />
                  </div>
                  {errors.cost && (
                    <p className="mt-1 text-sm text-red-500">{errors.cost}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="p-6 border-b">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Additional Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Supplier
                  </label>
                  <select
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Supplier</option>
                    {suppliers.map((supplier) => (
                      <option key={supplier} value={supplier}>
                        {supplier}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum Stock Level
                    <span className="ml-1 inline-flex items-center">
                      <HelpCircle
                        size={14}
                        className="text-gray-400"
                        title="Set threshold for low stock alerts"
                      />
                    </span>
                  </label>
                  <input
                    type="number"
                    name="minStockLevel"
                    value={formData.minStockLevel}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className={`w-full border ${
                      errors.minStockLevel
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="0.00"
                  />
                  {errors.minStockLevel && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.minStockLevel}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Storage Location
                  </label>
                  <select
                    name="storageLocation"
                    value={formData.storageLocation}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Location</option>
                    {storageLocations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="trackExpiryDate"
                        name="trackExpiryDate"
                        checked={formData.trackExpiryDate}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor="trackExpiryDate"
                        className="ml-2 text-xs text-gray-500"
                      >
                        Track expiry
                      </label>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <Calendar size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="date"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      disabled={!formData.trackExpiryDate}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Description
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Item Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add any additional notes or details about this item..."
                ></textarea>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-between bg-white p-4 rounded-lg shadow mb-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <div className="flex space-x-4">
              <button
                type="button"
                className="px-6 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-200 flex items-center"
              >
                <Plus size={18} className="mr-2" />
                Save & Add Another
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
              >
                <Save size={18} className="mr-2" />
                Save Item
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
