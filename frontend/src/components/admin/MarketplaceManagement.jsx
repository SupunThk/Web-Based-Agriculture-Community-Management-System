import React, { useState } from 'react';
import { Search, Eye, CheckCircle, XCircle, MoreHorizontal, ShoppingBag, Filter } from 'lucide-react';
import { MOCK_LISTINGS } from './data/mockData';

const MarketplaceManagement = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredListings = activeFilter === 'All'
    ? MOCK_LISTINGS
    : MOCK_LISTINGS.filter(listing => listing.status === activeFilter);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full min-h-[600px]">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 bg-gray-50/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <ShoppingBag size={20} className="text-green-600" />
              Marketplace Listings
            </h2>
            <p className="text-sm text-gray-500 mt-1">Manage crops and products sold by farmers</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors" size={16} />
              <input
                type="text"
                placeholder="Search products..."
                className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 w-full md:w-64 transition-all shadow-sm"
              />
            </div>
            <button className="p-2 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 hover:text-green-600 transition-colors shadow-sm">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {['All', 'Active', 'Pending', 'Rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setActiveFilter(status)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeFilter === status
                  ? 'bg-green-600 text-white shadow-md shadow-green-200'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 border-transparent'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto flex-1 bg-white">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50/50 text-gray-400 text-xs uppercase font-bold tracking-wider border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-semibold uppercase">Product</th>
              <th className="px-6 py-4 font-semibold uppercase">Price & Stock</th>
              <th className="px-6 py-4 font-semibold uppercase">Seller</th>
              <th className="px-6 py-4 font-semibold uppercase">Status</th>
              <th className="px-6 py-4 font-semibold uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredListings.map((listing) => (
              <tr key={listing.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={listing.image} 
                      alt={listing.title} 
                      className="w-12 h-12 rounded-lg object-cover border border-gray-200 shadow-sm group-hover:scale-105 transition-transform" 
                    />
                    <div>
                      <span className="font-bold text-gray-800 block text-sm group-hover:text-green-700 transition-colors">
                        {listing.title}
                      </span>
                      <span className="text-xs text-gray-400 font-medium">{listing.category}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="block font-bold text-gray-700 text-sm">{listing.price}</span>
                  <span className="text-xs text-gray-500">Stock: {listing.stock}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-600 block">{listing.seller}</span>
                  <span className="text-xs text-gray-400">{listing.date}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex w-fit items-center gap-1.5 ${
                    listing.status === 'Active' ? 'bg-green-50 text-green-700 border border-green-100' :
                    listing.status === 'Rejected' ? 'bg-red-50 text-red-700 border border-red-100' :
                    'bg-yellow-50 text-yellow-700 border border-yellow-100'
                  }`}>
                    {listing.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {listing.status === 'Pending' && (
                      <>
                        <button className="p-1.5 text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors" title="Approve">
                          <CheckCircle size={16} />
                        </button>
                        <button className="p-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors" title="Reject">
                          <XCircle size={16} />
                        </button>
                      </>
                    )}
                    <button className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="View Details">
                      <Eye size={16} />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketplaceManagement;