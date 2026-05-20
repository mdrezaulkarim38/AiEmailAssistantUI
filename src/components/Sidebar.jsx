import React from 'react';

const Sidebar = ({ activeTab, onTabChange, onCompose }) => {
  const tabs = [
    { id: 'inbox', label: 'Inbox', icon: '📥', count: 12 },
    { id: 'sent', label: 'Sent', icon: '📤', count: null },
    { id: 'drafts', label: 'Drafts', icon: '📝', count: 3 },
    { id: 'starred', label: 'Starred', icon: '⭐', count: null },
    { id: 'spam', label: 'Spam', icon: '🚫', count: 1 },
    { id: 'trash', label: 'Trash', icon: '🗑️', count: null },
  ];

  const aiFeatures = [
    { id: 'compose', label: 'AI Compose', icon: '✍️', highlight: true },
    { id: 'suggest', label: 'Smart Reply', icon: '💡', highlight: true },
    { id: 'analyze', label: 'Analyze', icon: '📊', highlight: true },
  ];

  return (
    <aside className="w-64 h-screen bg-dark-900/80 backdrop-blur-xl border-r border-white/10 flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/30">
            <span className="text-xl">📧</span>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              AI Mail
            </h1>
            <p className="text-xs text-gray-500">Smart Assistant</p>
          </div>
        </div>

        <button 
          onClick={onCompose}
          className="w-full py-3 px-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl font-semibold text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02]"
        >
          <span>✏️</span>
          Compose New
        </button>
      </div>

      <nav className="flex-1 px-3 overflow-y-auto">
        <div className="mb-4">
          <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Mail</p>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
                ${activeTab === tab.id 
                  ? 'bg-primary-500/20 text-primary-400 border border-primary-500/20' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }
              `}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="font-medium flex-1 text-left">{tab.label}</span>
              {tab.count && (
                <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-primary-500/30 text-primary-300' : 'bg-white/10 text-gray-400'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        <div>
          <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">AI Features</p>
          {aiFeatures.map((feature) => (
            <button
              key={feature.id}
              onClick={() => onTabChange(feature.id)}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
                ${activeTab === feature.id 
                  ? 'bg-gradient-to-r from-primary-500/20 to-purple-500/20 text-white border border-primary-500/30' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }
              `}
            >
              <span className="text-lg">{feature.icon}</span>
              <span className="font-medium flex-1 text-left">{feature.label}</span>
              {feature.highlight && (
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary-500 to-purple-500 animate-pulse"></span>
              )}
            </button>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="p-3 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10">
          <p className="text-xs text-gray-400 mb-2">AI Credits</p>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full"></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">750 / 1000 used</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;