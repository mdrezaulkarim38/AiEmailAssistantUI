import React from 'react';

const AIAssistant = ({ 
  suggestions, 
  loading,
  onRegenerate, 
  onUseSuggestion,
  aiPrompt,
  setAiPrompt,
  aiResponse,
  onAIChat,
  onCompose
}) => {
  return (
    <div className="w-80 bg-dark-900/50 backdrop-blur-xl border-l border-white/10 flex flex-col">
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center shadow-lg shadow-primary-500/30">
            <span className="text-xl">🤖</span>
          </div>
          <div>
            <h3 className="text-white font-semibold">AI Assistant</h3>
            <p className="text-xs text-gray-500">Smart email help</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="mb-6">
          <p className="text-sm text-gray-400 mb-3">Quick Actions</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: '✍️', label: 'Compose', color: 'from-blue-500 to-cyan-500', action: onCompose },
              { icon: '📝', label: 'Reply', color: 'from-green-500 to-emerald-500', action: () => {} },
              { icon: '📊', label: 'Summarize', color: 'from-purple-500 to-pink-500', action: () => {} },
              { icon: '🎯', label: 'Tone', color: 'from-orange-500 to-red-500', action: () => {} },
            ].map((action, i) => (
              <button 
                key={i}
                onClick={action.action}
                className={`p-3 rounded-xl bg-gradient-to-br ${action.color} opacity-90 hover:opacity-100 transition-all duration-200 hover:scale-105`}
              >
                <span className="text-xl block mb-1">{action.icon}</span>
                <span className="text-xs font-medium text-white">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-400">Smart Suggestions</p>
            <button 
              onClick={onRegenerate}
              disabled={loading}
              className="text-xs text-primary-400 hover:text-primary-300 transition flex items-center gap-1 disabled:opacity-50"
            >
              <span>↻</span> Regenerate
            </button>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="space-y-3">
              {suggestions.length > 0 ? suggestions.map((suggestion, i) => (
                <div 
                  key={i}
                  className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-primary-500/30 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                  onClick={() => onUseSuggestion(suggestion)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      suggestion.tone === 'Professional' ? 'bg-blue-500/20 text-blue-400' :
                      suggestion.tone === 'Friendly' ? 'bg-green-500/20 text-green-400' :
                      suggestion.tone === 'Casual' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-purple-500/20 text-purple-400'
                    }`}>
                      {suggestion.tone}
                    </span>
                    <span className="text-lg opacity-50 group-hover:opacity-100 transition">📋</span>
                  </div>
                  <p className="text-sm text-gray-300 line-clamp-3">{suggestion.text}</p>
                  <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition">
                    <button className="px-3 py-1.5 text-xs bg-white/10 hover:bg-white/20 rounded-lg text-gray-300 transition">
                      Edit
                    </button>
                    <button className="px-3 py-1.5 text-xs bg-primary-500/20 hover:bg-primary-500/30 rounded-lg text-primary-400 transition">
                      Use
                    </button>
                  </div>
                </div>
              )) : (
                <p className="text-sm text-gray-500 text-center py-4">Select an email to get suggestions</p>
              )}
            </div>
          )}
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-400 mb-3">Email Analytics</p>
          <div className="space-y-3">
            {[
              { label: 'Sent this week', value: '24', change: '+12%' },
              { label: 'Response rate', value: '89%', change: '+5%' },
              { label: 'Avg response time', value: '2h', change: '-30%' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                <span className="text-sm text-gray-400">{stat.label}</span>
                <div className="text-right">
                  <span className="text-lg font-semibold text-white">{stat.value}</span>
                  <span className="text-xs text-green-400 ml-2">{stat.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-white/10">
        <div className="relative">
          <input
            type="text"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="Ask AI anything..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-500 outline-none focus:border-primary-500/50 transition-all"
            onKeyDown={(e) => e.key === 'Enter' && onAIChat()}
          />
          <button 
            onClick={onAIChat}
            disabled={loading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-primary-500 hover:bg-primary-600 transition disabled:opacity-50"
          >
            {loading ? (
              <span className="animate-spin">⏳</span>
            ) : (
              <span>🚀</span>
            )}
          </button>
        </div>
        {aiResponse && (
          <div className="mt-3 p-3 bg-white/5 rounded-xl border border-white/10">
            <p className="text-sm text-gray-300">{aiResponse}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;