import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploaderProps {
  accept?: { [key: string]: string[] }; // Dynamic MIME type object
  multiple?: boolean; // Allow multiple files
  maxSize?: number; // Max file size in bytes
  onFileChange?: (files: File[]) => void; // Callback to pass selected files
}

const FileUploader: React.FC<FileUploaderProps> = ({
  accept = {
    "application/vnd.ms-excel": [],
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
    "application/pdf": [],
    "text/csv": [],
  },
  multiple = false,
  maxSize = 5000000, // Default max size: 5MB
  onFileChange,
}) => {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    const filteredFiles = acceptedFiles.filter((file) => file.size <= maxSize); // Filter files exceeding max size
    setFiles(filteredFiles);

    // Use if-statement to avoid unused expression lint error
    if (onFileChange) {
      onFileChange(filteredFiles);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    multiple,
  });

  const removeFile = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);

    if (onFileChange) {
      onFileChange(updatedFiles);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div
        {...getRootProps({
          className:
            "flex flex-col items-center justify-center border-2 border-dashed border-blue-500 bg-blue-50 p-6 rounded-lg cursor-pointer hover:bg-blue-100 transition",
        })}
      >
        <input {...getInputProps()} />
        <p className="text-gray-600 mb-2">
          Drag & drop files here, or click to select files
        </p>
        <p className="text-sm text-gray-500">
          (Supported file types are dynamically configurable)
        </p>
      </div>

      <div className="mt-4">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2"
          >
            <p className="text-gray-700 bg-red">{file.name}</p>
            <button
              onClick={() => removeFile(index)}
              className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;
