import React from 'react';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    aria-current={active ? 'page' : undefined}
    className={
      `w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all duration-200 group relative ` +
      (active
        ? 'bg-green-600 text-white shadow-sm'
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900')
    }
  >
    <span
      className={
        `grid place-items-center w-10 h-10 rounded-xl border transition-colors shrink-0 ` +
        (active
          ? 'bg-white/15 border-white/20'
          : 'bg-white border-slate-200/70 group-hover:border-slate-200')
      }
    >
      <Icon
        size={20}
        className={
          `transition-colors ` +
          (active ? 'text-white' : 'text-slate-500 group-hover:text-slate-700')
        }
      />
    </span>

    <span className={active ? 'text-sm font-semibold' : 'text-sm font-medium'}>{label}</span>

    {active && (
      <span className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/80" />
    )}
  </button>
);

export default SidebarItem;