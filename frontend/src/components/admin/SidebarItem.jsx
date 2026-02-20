import React from 'react';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    aria-current={active ? 'page' : undefined}
    className={
      `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ` +
      (active
        ? 'bg-white/20 text-white'
        : 'text-green-100 hover:bg-white/10 hover:text-white')
    }
  >
    <span
      className={
        `grid place-items-center w-9 h-9 rounded-lg transition-colors shrink-0 ` +
        (active
          ? 'bg-white/20'
          : 'group-hover:bg-white/10')
      }
    >
      <Icon
        size={19}
        className="transition-colors"
      />
    </span>

    <span className={active ? 'text-sm font-semibold' : 'text-sm font-medium'}>{label}</span>

    {active && (
      <span className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-5 rounded-full bg-white/80" />
    )}
  </button>
);

export default SidebarItem;