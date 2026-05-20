import React from 'react';

const Header = ({ user, onSearch }) => {
  return (
    <header className="h-16 bg-dark-900/50 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-6">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative flex-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
          <input 
            type="text" 
            placeholder="Search emails, messages, or ask AI..."
            onChange={(e) => onSearch?.(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-2.5 text-white placeholder-gray-500 outline-none focus:border-primary-500/50 focus:bg-white/10 transition-all duration-300"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <kbd className="px-2 py-0.5 text-xs bg-white/10 text-gray-500 rounded">⌘</kbd>
            <kbd className="px-2 py-0.5 text-xs bg-white/10 text-gray-500 rounded">K</kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2.5 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-200 relative">
          <span className="text-xl">🔔</span>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <button className="p-2.5 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-200">
          <span className="text-xl">⚙️</span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="text-right">
            <p className="text-sm font-medium text-white">{user?.name || 'User'}</p>
            <p className="text-xs text-gray-500">{user?.email || 'user@email.com'}</p>
          </div>
          <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-primary-500/30">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'user'}`} 
              alt="Avatar" 
              className="w-full h-full bg-gradient-to-br from-primary-500/20 to-purple-500/20"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;