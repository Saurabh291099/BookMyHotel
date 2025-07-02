import React from "react";

interface FileListProps {
  files: File[]; // Array of selected files
  onRemove: (index: number) => void; // Callback to remove a file by index
}

const FileList: React.FC<FileListProps> = ({ files, onRemove }) => {
  return (
    <div className="mt-4">
      {files.map((file, index) => (
        <div
          key={index}
          className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2"
        >
          <p className="text-gray-700">{file.name}</p>
          <button
            onClick={() => onRemove(index)}
            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default FileList;
