import React, { useState } from 'react';
import {
  Search,
  Eye,
  Flag,
  XCircle,
  CheckCircle,
  MoreHorizontal,
  List,
  Grid,
  Send
} from 'lucide-react';
import { MOCK_BLOGS } from './data/mockData';

const BlogModeration = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'grid'

  const filteredBlogs = activeFilter === 'All'
    ? MOCK_BLOGS
    : MOCK_BLOGS.filter(blog => blog.status === activeFilter);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full min-h-[600px] overflow-hidden">
      {/* Header & Controls */}
      <div className="p-6 border-b border-gray-100 bg-gray-50/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Content Moderation</h2>
            <p className="text-sm text-gray-500 mt-1">Manage community posts and knowledge sharing</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors" size={16} />
              <input
                type="text"
                placeholder="Search posts..."
                className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 w-full md:w-64 transition-all shadow-sm"
              />
            </div>

            <div className="flex items-center bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <List size={18} />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Grid size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {['All', 'Pending', 'Approved', 'Rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setActiveFilter(status)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeFilter === status
                ? 'bg-green-600 text-white shadow-md shadow-green-200'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 border-transparent'
                }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Moderation List/Grid */}
      <div className={`flex-1 overflow-y-auto p-6 bg-gray-50/50 ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}`}>
        {filteredBlogs.map((blog) => (
          <div
            key={blog.id}
            className={`bg-white rounded-xl border border-gray-200/60 hover:border-green-200 hover:shadow-lg transition-all duration-300 group relative 
              ${viewMode === 'list' ? 'p-5' : 'flex flex-col h-full overflow-hidden'}`}
          >

            <div className={viewMode === 'list' ? 'flex flex-col md:flex-row gap-6' : 'flex flex-col h-full'}>

              {/* Thumbnail */}
              <div className={`shrink-0 bg-gray-100 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500 ${viewMode === 'list' ? 'w-full md:w-56 h-36 rounded-xl' : 'w-full h-48'}`}>
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wide rounded-md">
                    {blog.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className={`flex-1 flex flex-col justify-between ${viewMode === 'grid' ? 'p-5' : ''}`}>
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-gray-800 text-lg leading-snug group-hover:text-green-700 transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    {viewMode === 'list' && (
                      <span className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-bold border ${blog.status === 'Approved' ? 'bg-green-50 text-green-700 border-green-100' :
                        blog.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-100' :
                          'bg-yellow-50 text-yellow-700 border-yellow-100'
                        }`}>
                        {blog.status}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">{blog.excerpt}</p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 md:mb-0">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-[10px] shadow-sm">
                        {blog.author.charAt(0)}
                      </div>
                      <span className="font-semibold text-gray-600 truncate max-w-[100px]">{blog.author}</span>
                    </div>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span>{blog.date}</span>
                  </div>
                </div>

                {/* Actions Toolbar */}
                <div className={`flex items-center justify-between pt-4 border-t border-gray-100 mt-auto ${viewMode === 'grid' ? 'gap-3' : ''}`}>
                  {viewMode === 'grid' ? (
                    <div className="flex items-center gap-2 w-full">
                      {blog.status === 'Pending' ? (
                        <>
                          <button className="flex-1 flex justify-center items-center gap-1.5 py-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                            Reject
                          </button>
                          <button className="flex-1 flex justify-center items-center gap-1.5 py-2 text-xs font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors shadow-sm shadow-green-200">
                            Approve
                          </button>
                        </>
                      ) : (
                        <div className={`flex-1 text-xs text-center font-bold py-2 rounded-lg ${blog.status === 'Approved' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                          }`}>
                          {blog.status}
                        </div>
                      )}
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-600 bg-white border border-gray-200 hover:border-green-300 hover:text-green-700 rounded-lg transition-all">
                          <Eye size={14} /> View
                        </button>

                        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-600 bg-white border border-gray-200 hover:border-orange-300 hover:text-orange-700 rounded-lg transition-all" title="Send Feedback to Author">
                          <Send size={14} /> Feedback
                        </button>

                        <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Flag Content">
                          <Flag size={14} />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        {blog.status === 'Pending' && (
                          <>
                            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                              <XCircle size={14} /> Reject
                            </button>
                            <button className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors shadow-sm shadow-green-200">
                              <CheckCircle size={14} /> Approve
                            </button>
                          </>
                        )}
                        <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100" title="More Options">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogModeration;