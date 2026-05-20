import React from 'react';

const EmailList = ({ emails, onSelect, selectedId }) => {
  return (
    <div className="flex flex-col gap-2 p-4 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Inbox</h2>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition">
            <span className="text-sm">↕️</span>
          </button>
          <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition">
            <span className="text-sm">⚙️</span>
          </button>
        </div>
      </div>

      {emails.map((email, index) => (
        <div
          key={email.id}
          onClick={() => onSelect(email)}
          className={`
            group p-4 rounded-2xl cursor-pointer transition-all duration-300 border
            ${selectedId === email.id 
              ? 'bg-primary-500/10 border-primary-500/30 shadow-lg shadow-primary-500/10' 
              : 'bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10'
            }
            animate-fade-in
          `}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="flex items-start gap-3">
            <div className={`
              w-12 h-12 rounded-xl flex items-center justify-center text-sm font-semibold
              bg-gradient-to-br from-primary-500/30 to-purple-500/30 text-white
              ${selectedId === email.id ? 'ring-2 ring-primary-500/50' : ''}
            `}>
              {email.from.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className={`font-semibold truncate ${selectedId === email.id ? 'text-primary-300' : 'text-white'}`}>
                  {email.from}
                </span>
                <div className="flex items-center gap-2">
                  {email.starred && <span className="text-yellow-400 text-sm">⭐</span>}
                  <span className="text-xs text-gray-500 whitespace-nowrap">{email.time}</span>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-200 truncate">{email.subject}</p>
              <p className="text-sm text-gray-500 truncate mt-1">{email.preview}</p>
              
              {email.tags && (
                <div className="flex gap-2 mt-3">
                  {email.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className={`
                        px-2.5 py-1 text-xs rounded-full font-medium
                        ${tag === 'Work' ? 'bg-blue-500/20 text-blue-400' : ''}
                        ${tag === 'Personal' ? 'bg-green-500/20 text-green-400' : ''}
                        ${tag === 'Urgent' ? 'bg-red-500/20 text-red-400' : ''}
                        ${tag === 'AI' ? 'bg-purple-500/20 text-purple-400' : ''}
                      `}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="px-3 py-1.5 text-xs bg-white/10 hover:bg-white/20 rounded-lg text-gray-300 transition">
              Reply
            </button>
            <button className="px-3 py-1.5 text-xs bg-primary-500/20 hover:bg-primary-500/30 rounded-lg text-primary-400 transition">
              AI Reply
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmailList;