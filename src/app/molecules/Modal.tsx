import React, { useState } from "react";

interface Option {
  id: string;
  label: string;
  relatedTo?: string; // To link options for filtering
}

const materials: Option[] = [
  { id: "aluminum", label: "Aluminum" },
  { id: "mildSteel", label: "Mild Steel" },
  { id: "chrome", label: "Chrome" },
  { id: "hardware", label: "Hardware" },
];

const categories: Option[] = [
  { id: "galvanizedSheet", label: "Galvanized Sheet", relatedTo: "mildSteel" },
  { id: "mSBar", label: "MS Bar", relatedTo: "mildSteel" },
  { id: "mSPlate", label: "MS Plate", relatedTo: "mildSteel" },
  { id: "beams", label: "Beams", relatedTo: "aluminum" },
  // Add more categories
];

const subcategories: Option[] = [
  { id: "angle", label: "Angle", relatedTo: "galvanizedSheet" },
  { id: "bulb", label: "Bulb", relatedTo: "mSBar" },
  { id: "channel", label: "Channel", relatedTo: "mSPlate" },
  // Add more subcategories
];

const Modal: React.FC = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );
  const [dimension, setDimension] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);

  const handleMaterialSelect = (material: string) => {
    setSelectedMaterial(material);
    setSelectedCategory(null); // Reset category when material changes
    setSelectedSubCategory(null); // Reset subcategory when material changes
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubCategory(null); // Reset subcategory when category changes
  };

  const handleSubmit = () => {
    const formData = {
      material: selectedMaterial,
      category: selectedCategory,
      subCategory: selectedSubCategory,
      dimension,
      quantity,
    };
    console.log("Submitted Data:", formData);
  };

  return (
    <div className="modal bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-lg font-bold mb-4">Create RFP</h2>

      {/* Material Selection */}
      <div>
        <h3 className="font-semibold mb-2">Choose a Material</h3>
        <div className="flex flex-wrap gap-2">
          {materials.map((material) => (
            <button
              key={material.id}
              onClick={() => handleMaterialSelect(material.id)}
              className={`px-4 py-2 rounded-md ${
                selectedMaterial === material.id
                  ? "bg-slate-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {material.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category Selection */}
      {selectedMaterial && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Choose a Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories
              .filter((category) => category.relatedTo === selectedMaterial)
              .map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className={`px-4 py-2 rounded-md ${
                    selectedCategory === category.id
                      ? "bg-slate-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {category.label}
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Sub-Category Selection */}
      {selectedCategory && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Choose a Sub-Category</h3>
          <div className="flex flex-wrap gap-2">
            {subcategories
              .filter(
                (subcategory) => subcategory.relatedTo === selectedCategory
              )
              .map((subcategory) => (
                <button
                  key={subcategory.id}
                  onClick={() => setSelectedSubCategory(subcategory.id)}
                  className={`px-4 py-2 rounded-md ${
                    selectedSubCategory === subcategory.id
                      ? "bg-slate-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {subcategory.label}
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Additional Inputs */}
      {selectedSubCategory && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Choose a Dimension</h3>
          <input
            type="text"
            placeholder="Enter dimension (e.g., 20X20X2MMX6MTR)"
            value={dimension}
            onChange={(e) => setDimension(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />

          <h3 className="font-semibold mt-4 mb-2">Add Quantity</h3>
          <input
            type="number"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-6 flex justify-end gap-4">
        <button className="px-4 py-2 bg-gray-200 rounded-md">Cancel</button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-slate-600 text-white rounded-md"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Modal;
