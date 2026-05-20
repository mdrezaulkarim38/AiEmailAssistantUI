import React, { useState } from 'react';

const EmailViewer = ({ email, onSend, onDelete }) => {
  const [replyText, setReplyText] = useState('');
  const [showAI, setShowAI] = useState(false);

  if (!email) {
    return (
      <div className="flex-1 flex items-center justify-center bg-dark-900/30 rounded-2xl border border-white/10">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
            <span className="text-4xl">📧</span>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No Email Selected</h3>
          <p className="text-gray-500">Select an email from the list to view</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-dark-900/30 rounded-2xl border border-white/10 overflow-hidden animate-fade-in">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-white">{email.subject}</h2>
          {email.tags?.map((tag, i) => (
            <span key={i} className="px-2.5 py-1 text-xs rounded-full bg-white/10 text-gray-400">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition">
            <span>⭐</span>
          </button>
          <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition">
            <span>📁</span>
          </button>
          <button onClick={onDelete} className="p-2 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition">
            <span>🗑️</span>
          </button>
        </div>
      </div>

      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-primary-500/30">
            {email.from.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold text-lg">{email.from}</p>
            <p className="text-gray-500 text-sm">to me</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-sm">{email.date}</p>
            <p className="text-gray-500 text-xs">{email.time}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{email.content}</p>
        </div>
        
        {email.attachments && (
          <div className="mt-6 pt-4 border-t border-white/10">
            <p className="text-sm text-gray-500 mb-3">Attachments</p>
            <div className="flex flex-wrap gap-3">
              {email.attachments.map((file, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 cursor-pointer transition">
                  <span>📎</span>
                  <span className="text-sm text-gray-300">{file.name}</span>
                  <span className="text-xs text-gray-500">({file.size})</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowAI(!showAI)}
            className="px-4 py-2 bg-gradient-to-r from-primary-500 to-purple-500 rounded-xl font-medium text-white shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 transition-all duration-300 flex items-center gap-2"
          >
            <span>🤖</span>
            AI Assist
          </button>
          <button className="px-4 py-2 bg-white/10 rounded-xl font-medium text-gray-300 hover:bg-white/20 transition-all duration-300 flex items-center gap-2">
            <span>↩️</span>
            Reply
          </button>
          <button className="px-4 py-2 bg-white/10 rounded-xl font-medium text-gray-300 hover:bg-white/20 transition-all duration-300 flex items-center gap-2">
            <span>↪️</span>
            Forward
          </button>
        </div>

        {showAI && (
          <div className="mt-4 p-4 bg-gradient-to-r from-primary-500/10 to-purple-500/10 rounded-xl border border-primary-500/20 animate-fade-in">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">💡</span>
              <span className="text-primary-400 font-semibold">AI Suggestions</span>
            </div>
            <div className="space-y-2">
              <button className="w-full text-left p-3 bg-white/5 hover:bg-white/10 rounded-lg transition">
                <p className="text-gray-300 text-sm">"Thanks for the update! Let me know if you need anything else."</p>
                <p className="text-xs text-primary-400 mt-1">Tone: Friendly</p>
              </button>
              <button className="w-full text-left p-3 bg-white/5 hover:bg-white/10 rounded-lg transition">
                <p className="text-gray-300 text-sm">"Acknowledged. Will review and get back to you shortly."</p>
                <p className="text-xs text-primary-400 mt-1">Tone: Professional</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailViewer;