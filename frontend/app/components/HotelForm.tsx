"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit2, Save, X } from "lucide-react";
import { useState } from "react";

export type FieldType = "text" | "email" | "number" | "url" | "date" | "textarea" | "select";

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  rows?: number; // for textarea
  min?: string | number;
  max?: string | number;
  step?: string | number;
  options?: { value: string; label: string }[]; // for select
  gridCol?: number; // 1 or 2 columns
}

export interface GenericFormData {
  [key: string]: string | number;
}

interface GenericFormProps {
  id: string;
  fields: FormField[];
  initialData?: GenericFormData;
  onSuccess?: (data: GenericFormData) => void;
  onError?: (error: Error) => void;
  title?: string;
  subtitle?: string;
  showCurrentInfo?: boolean;
  apiEndpoint: string;
  method?: "POST" | "PATCH" | "PUT";
  buttonText?: string;
  showConsoleHint?: boolean;
}

const getDefaultValue = (field: FormField): string | number => {
  if (field.type === "number") return "0";
  return "";
};

export default function GenericForm({
  id,
  fields,
  initialData = {},
  onSuccess,
  onError,
  title = "Form",
  subtitle = "Edit your information",
  showCurrentInfo = true,
  apiEndpoint,
  method = "PATCH",
  buttonText = "Edit Information",
  showConsoleHint = true,
}: GenericFormProps) {
  // Initialize form data with all fields
  const defaultData = fields.reduce((acc, field) => {
    acc[field.name] = initialData[field.name] ?? getDefaultValue(field);
    return acc;
  }, {} as GenericFormData);

  const [showEditForm, setShowEditForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<GenericFormData>(defaultData);
  const [savedData, setSavedData] = useState<GenericFormData>(defaultData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(`Field ${name} updated to:`, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("Form Submitted!");
    console.log("ID:", id);
    console.log("Form Data:", formData);

    try {
      const response = await fetch(`${apiEndpoint}/${id}`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok) {
        setSavedData(formData);
        setShowEditForm(false);
        alert("Information updated successfully!");
        onSuccess?.(formData);
      } else {
        alert("Failed to update information");
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      console.log("Error updating:", err);
      alert("Error updating information");
      onError?.(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(savedData);
    setShowEditForm(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground mt-1">{subtitle}</p>
        </div>
        <Button
          onClick={() => setShowEditForm(!showEditForm)}
          className="gap-2"
        >
          <Edit2 className="w-4 h-4" />
          {showEditForm ? "Close Form" : buttonText}
        </Button>
      </div>

      {/* Edit Form */}
      {showEditForm && (
        <Card className="p-8 bg-blue-50 border-blue-200">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Edit {title}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Dynamic Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fields.map((field) => {
                // Check if field should span 2 columns
                const colSpan = field.gridCol === 1 ? "md:col-span-1" : "md:col-span-2";
                
                // Single column fields
                if (field.gridCol === 1) {
                  return (
                    <div key={field.name} className="space-y-2">
                      <Label
                        htmlFor={field.name}
                        className="text-foreground font-semibold"
                      >
                        {field.label} {field.required && "*"}
                      </Label>

                      {field.type === "textarea" ? (
                        <textarea
                          id={field.name}
                          name={field.name}
                          placeholder={field.placeholder}
                          value={formData[field.name] || ""}
                          onChange={handleChange}
                          rows={field.rows || 4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                          required={field.required}
                        />
                      ) : field.type === "select" ? (
                        <select
                          id={field.name}
                          name={field.name}
                          value={formData[field.name] || ""}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required={field.required}
                        >
                          <option value="">Select {field.label}</option>
                          {field.options?.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <Input
                          id={field.name}
                          name={field.name}
                          type={field.type}
                          placeholder={field.placeholder}
                          value={formData[field.name] || ""}
                          onChange={handleChange}
                          className="border-gray-300"
                          required={field.required}
                          min={field.min}
                          max={field.max}
                          step={field.step}
                        />
                      )}
                    </div>
                  );
                }

                // Full width fields (2 columns)
                return (
                  <div key={field.name} className={`space-y-2 ${colSpan}`}>
                    <Label
                      htmlFor={field.name}
                      className="text-foreground font-semibold"
                    >
                      {field.label} {field.required && "*"}
                    </Label>

                    {field.type === "textarea" ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        rows={field.rows || 4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        required={field.required}
                      />
                    ) : field.type === "select" ? (
                      <select
                        id={field.name}
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required={field.required}
                      >
                        <option value="">Select {field.label}</option>
                        {field.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <Input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        className="border-gray-300"
                        required={field.required}
                        min={field.min}
                        max={field.max}
                        step={field.step}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 gap-2"
                disabled={loading}
              >
                <Save className="w-4 h-4" />
                {loading ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </Button>
            </div>

            {/* Console Helper */}
            {showConsoleHint && (
              <div className="mt-6 p-4 bg-blue-100 border border-blue-300 rounded-lg text-sm text-blue-900">
                💡 Open browser console (F12) to see:
                <ul className="mt-2 ml-4 space-y-1 list-disc">
                  <li>ID when page loads</li>
                  <li>Field values as you type</li>
                  <li>Complete form data on submit</li>
                  <li>API response with success/error</li>
                </ul>
              </div>
            )}
          </form>
        </Card>
      )}

      {/* Current Info */}
      {showCurrentInfo && Object.keys(savedData).length > 0 && Object.values(savedData).some(v => v) && (
        <Card className="p-8 bg-green-50 border-green-200">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Current {title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map((field) => {
              const value = savedData[field.name];
              if (!value) return null;

              return (
                <div key={field.name}>
                  <p className="text-sm text-muted-foreground">{field.label}</p>
                  {field.type === "url" ? (
                    <a
                      href={String(value)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-lg font-semibold break-all"
                    >
                      View
                    </a>
                  ) : (
                    <p className="text-lg font-semibold text-foreground break-words">
                      {String(value)}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
