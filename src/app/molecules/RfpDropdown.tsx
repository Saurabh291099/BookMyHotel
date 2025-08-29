import React, { useState } from "react";
import Modal from "./Modal"; // Assuming the previously built Modal component is in the same folder

const RfpDropdown: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Controls dropdown visibility
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls modal visibility

  // Handles the dropdown option clicks
  const handleOptionClick = (option: string) => {
    if (option === "createRFP") {
      setIsModalOpen(true); // Open the modal
      setIsDropdownOpen(false); // Close the dropdown
    }
    if (option === "importRFP") {
      alert("Import RFP functionality will be implemented.");
    }
  };

  return (
    <div className="relative">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="bg-gray-200 px-4 py-2 rounded-md text-sm font-medium"
      >
        Open Dropdown
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute top-full left-0 bg-white shadow-lg border rounded-md mt-2">
          <button
            onClick={() => handleOptionClick("createRFP")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Create RFP
          </button>
          <button
            onClick={() => handleOptionClick("importRFP")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Import RFP
          </button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          {/* Modal Content */}
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
            <h2 className="text-lg font-bold mb-4">Create RFP</h2>
            {/* Placeholder for modal content */}
            <Modal />
            {/* Modal Buttons */}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsModalOpen(false)} // Cancel functionality
                className="bg-gray-200 px-4 py-2 rounded-md text-sm font-medium mr-2 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => alert("RFP Created!")} // Replace with your submit functionality
                className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RfpDropdown;
