import React from 'react';


function ResultsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Analysis Results</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600 text-center">No results available yet. Please upload a document first.</p>
      </div>
    </div>
  );
}
export default ResultsPage;
