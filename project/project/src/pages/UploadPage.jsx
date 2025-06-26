import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UploadPage() {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    if (event.dataTransfer.files.length > 0) {
      setFile(event.dataTransfer.files[0]);
    }
  };

  const handleGenerateClick = async () => {
  if (!file) {
    alert("Please upload a file first!");
    return;
  }

  const token = localStorage.getItem('token');
  if (!token) {
    alert('Please login first!');
    return;
  }

  setLoading(true);

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("http://localhost:5000/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    if (response.ok) {
      alert("Analysis complete!");
      navigate("/analysis");
    } else {
      alert("Error: " + data.error);
    }
  } catch (error) {
    alert("Failed to connect to the server!");
  }

  setLoading(false);
};

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Upload Financial Statement</h1>

      <div className="max-w-xl mx-auto">
        <div
          className={`border-2 ${
            dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
          } border-dashed rounded-lg p-12 text-center transition-all`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p className="text-gray-600 mb-4">Drag and drop your PDF here, or</p>
          <label className="bg-primary-400 text-white px-6 py-2 rounded-md hover:bg-primary-600 transition-colors cursor-pointer">
            Browse Files
            <input type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
          </label>
          {file && <p className="mt-4 text-gray-700 text-sm">{file.name}</p>}
        </div>
      </div>

      <br />

      <div className="flex justify-center">
        <button
          onClick={handleGenerateClick}
          className="bg-primary-400 text-lg text-white px-7 py-2.5 rounded-md hover:bg-primary-600 transition-colors"
          disabled={loading}
        >
          {loading ? "Processing..." : "Generate"}
        </button>
      </div>
    </div>
  );
}

export default UploadPage;
