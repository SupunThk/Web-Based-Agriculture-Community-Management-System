import React, { useState } from 'react';
import { Settings, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { MOCK_USERS } from './data/mockData';

const STATUSES = ['All', 'Active', 'Inactive'];
const PAGE_SIZE = 6;

const statusColor = (status) =>
  status === 'Active'
    ? 'text-green-600 bg-green-50 border border-green-100'
    : 'text-gray-400 bg-gray-100 border border-gray-200';

const roleBadge = (role) =>
  'bg-gray-100 text-gray-600 border border-gray-200';

const UserTable = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [page, setPage] = useState(1);

  const filtered = activeFilter === 'All'
    ? MOCK_USERS
    : MOCK_USERS.filter(u => u.status === activeFilter);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilter = (f) => { setActiveFilter(f); setPage(1); };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-gray-800">Recent Users</h2>
          <p className="text-xs text-gray-400 mt-0.5">{filtered.length} users found</p>
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
          {STATUSES.map(s => (
            <button
              key={s}
              onClick={() => handleFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeFilter === s
                ? 'bg-green-600 text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-800'
                }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/60 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              <th className="px-6 py-3">
                <div className="flex items-center gap-1 cursor-pointer select-none hover:text-gray-600">
                  ID <ChevronDown size={12} />
                </div>
              </th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Location</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginated.map((user, idx) => (
              <tr
                key={user.id}
                className="hover:bg-green-50/40 transition-colors group"
              >
                <td className="px-6 py-4 text-xs font-mono text-gray-400">
                  #{String(user.id).padStart(4, '0')}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-sm shadow-sm shrink-0">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800 block text-sm">{user.name}</span>
                      <span className="text-[11px] text-gray-400">{user.email || `user${user.id}@agrolink.com`}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${roleBadge(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 font-medium">{user.location}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex w-fit items-center gap-1.5 ${statusColor(user.status)}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all" title="Settings">
                      <Settings size={15} />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all" title="Expand">
                      <ChevronDown size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Pagination */}
      <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-gray-400">
          Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${p === page
                ? 'bg-green-600 text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'
                }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTable;