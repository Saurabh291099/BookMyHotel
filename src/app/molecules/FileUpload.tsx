import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import FileList from "@/app/atoms/FileList"; // Import the FileList component

interface FileUploadProps {
  accept?: { [key: string]: string[] };
  multiple?: boolean;
  maxSize?: number;
  onFileChange?: (files: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  accept = {
    "application/vnd.ms-excel": [],
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
    "application/pdf": [],
    "text/csv": [],
  },
  multiple = false,
  maxSize = 5000000,
  onFileChange,
}) => {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    const filteredFiles = acceptedFiles.filter((file) => file.size <= maxSize);
    setFiles(filteredFiles);
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

      {/* Use the FileList atom here */}
      <FileList files={files} onRemove={removeFile} />
    </div>
  );
};

export default FileUpload;
