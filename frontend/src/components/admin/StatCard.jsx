import React from 'react';

const StatCard = ({ title, value, change, icon: Icon, color }) => {
  const isPositive = change.startsWith('+');

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100/50">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">{title}</p>
          <h3 className="text-3xl font-bold text-gray-800 mt-2">{value}</h3>

          <div className="flex items-center gap-2 mt-3">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
              }`}>
              {change}
            </span>
            <span className="text-gray-400 text-xs">vs last month</span>
          </div>
        </div>

        <div className={`p-3.5 rounded-xl ${color} bg-opacity-10 backdrop-blur-sm`}>
          <Icon size={26} className={color.replace('bg-', 'text-')} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
