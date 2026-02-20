import React from 'react';
import { MOCK_DISEASES } from './data/mockData';

const DiseaseRegistry = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
      <h2 className="text-lg font-bold text-gray-800">Disease Knowledge Base</h2>
      <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
        + Add New Disease
      </button>
    </div>
    <div className="p-6 grid gap-4">
      {MOCK_DISEASES.map((disease) => (
        <div key={disease.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-gray-800">{disease.name}</h3>
            <p className="text-sm text-gray-500">Affects: {disease.crop}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-gray-400">Severity</p>
              <span className={`text-xs font-bold ${disease.severity === 'High' ? 'text-red-600' : 'text-yellow-600'
                }`}>{disease.severity}</span>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Reports</p>
              <span className="text-sm font-bold text-gray-700">{disease.reports}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default DiseaseRegistry;