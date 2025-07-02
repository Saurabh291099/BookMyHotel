import React, { useState } from "react";
import FileList from "@/app/atoms/FileList";

const MyMolecule: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleRemove = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Uploaded Files</h2>
      <FileList files={selectedFiles} onRemove={handleRemove} />
    </div>
  );
};

export default MyMolecule;
