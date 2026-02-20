import React from 'react';
import { MoreVertical } from 'lucide-react';
import { MOCK_USERS } from './data/mockData';

const UserTable = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    <div className="p-6 border-b border-gray-100/50 flex justify-between items-center bg-gray-50/30">
      <div>
        <h2 className="text-lg font-bold text-gray-800">Recent Users</h2>
        <p className="text-xs text-gray-500 mt-1">Manage and view user details</p>
      </div>
      <button className="text-sm text-green-600 font-semibold hover:text-green-700 bg-green-50 hover:bg-green-100 px-4 py-2 rounded-lg transition-colors">
        View All Users
      </button>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50/50 text-gray-400 text-xs uppercase font-bold tracking-wider">
          <tr>
            <th className="px-6 py-4 font-semibold uppercase">Name</th>
            <th className="px-6 py-4 font-semibold uppercase">Role</th>
            <th className="px-6 py-4 font-semibold uppercase">Location</th>
            <th className="px-6 py-4 font-semibold uppercase">Status</th>
            <th className="px-6 py-4 font-semibold uppercase text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {MOCK_USERS.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center text-green-700 font-bold text-sm shadow-sm ring-2 ring-white">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800 block text-sm">{user.name}</span>
                    <span className="text-xs text-gray-400">ID: #{Math.floor(Math.random() * 10000)}</span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm font-medium">{user.location}</td>
              <td className="px-6 py-4">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex w-fit items-center gap-1.5 ${user.status === 'Active'
                    ? 'bg-green-50 text-green-600 border border-green-100'
                    : 'bg-gray-100 text-gray-500 border border-gray-200'
                  }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                  {user.status}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-gray-400 hover:text-green-600 hover:bg-green-50 p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                  <MoreVertical size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default UserTable;