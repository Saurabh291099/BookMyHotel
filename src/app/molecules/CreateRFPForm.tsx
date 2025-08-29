import React from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";

interface Material {
  name: string;
  quantity: number;
  unit: string;
}

interface CreateRFPFormInputs {
  title: string;
  description?: string;
  siteName?: string;
  siteAddress?: string;
  currency: string;
  materials: Material[];
  shipmentDate?: string;
  notes?: string;
}

interface CreateRFPFormProps {
  onSave: (formData: CreateRFPFormInputs) => void;
  onSend: (formData: CreateRFPFormInputs) => void;
}

const CreateRFPForm: React.FC<CreateRFPFormProps> = ({ onSave, onSend }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateRFPFormInputs>({
    defaultValues: {
      title: "",
      description: "",
      siteName: "",
      siteAddress: "",
      currency: "",
      materials: [],
      shipmentDate: "",
      notes: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "materials",
  });

  const handleAddMaterial = () => {
    append({ name: "", quantity: 0, unit: "Piece / PCS" });
  };

  const onSubmit: SubmitHandler<CreateRFPFormInputs> = (data) => {
    onSave(data);
  };

  const onSendRFP: SubmitHandler<CreateRFPFormInputs> = (data) => {
    // onSend(data);
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-3xl mx-auto p-4 bg-white shadow-md rounded-md"
    >
      <h2 className="text-xl font-bold mb-4">Create RFP</h2>

      {/* Title */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">RFP Title *</label>
        <input
          {...register("title", { required: "Title is required" })}
          placeholder="Enter Title"
          className="w-full p-2 border rounded-md"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          {...register("description")}
          placeholder="Add Here"
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* Site Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Site Name</label>
        <input
          {...register("siteName")}
          placeholder="Enter Site Name"
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* Site Address */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Site Address</label>
        <input
          {...register("siteAddress")}
          placeholder="Enter Address"
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* Currency */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">RFP Currency *</label>
        <select
          {...register("currency", { required: "Currency is required" })}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select Currency</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="INR">INR</option>
        </select>
        {errors.currency && (
          <p className="text-red-500 text-sm">{errors.currency.message}</p>
        )}
      </div>

      {/* Materials */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Materials</label>
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2 mb-2">
            <input
              {...register(`materials.${index}.name`, {
                required: "Material name is required",
              })}
              placeholder="Material Name"
              className="flex-1 p-2 border rounded-md"
            />
            <input
              {...register(`materials.${index}.quantity`, {
                required: "Quantity is required",
                valueAsNumber: true,
                min: { value: 1, message: "Quantity must be at least 1" },
              })}
              type="number"
              placeholder="Quantity"
              className="w-24 p-2 border rounded-md"
            />
            <select
              {...register(`materials.${index}.unit`)}
              className="p-2 border rounded-md"
            >
              <option value="Piece / PCS">Piece / PCS</option>
              <option value="Metric Ton / MT">Metric Ton / MT</option>
            </select>
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddMaterial}
          className="bg-yellow-500 text-white px-4 py-2 rounded-md"
        >
          + Add Materials
        </button>
      </div>

      {/* Shipment Date */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Shipment Date</label>
        <input
          {...register("shipmentDate")}
          type="date"
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* Notes */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Notes</label>
        <textarea
          {...register("notes")}
          placeholder="Add Notes"
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          className="bg-gray-200 px-4 py-2 rounded-md"
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleSubmit(onSendRFP)}
          className="bg-slate-500 text-white px-4 py-2 rounded-md"
        >
          Send RFP
        </button>
      </div>
    </form>
  );
};

export default CreateRFPForm;
