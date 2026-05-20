import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import EmailList from './components/EmailList';
import EmailViewer from './components/EmailViewer';
import AIAssistant from './components/AIAssistant';
import ComposeModal from './components/ComposeModal';
import { api } from './api';

const mockEmails = [
  { 
    id: 1, 
    from: 'John Smith', 
    subject: 'Project Update - Phase 1 Complete', 
    preview: 'Hey, wanted to give you an update on the project progress...',
    time: '2h ago',
    date: 'May 20, 2026',
    starred: true,
    tags: ['Work', 'AI'],
    content: `Hey there!

I wanted to give you a quick update on the project. We've successfully completed Phase 1 and everything is on track for the Phase 2 rollout next week.

Key highlights:
- All deliverables completed on time
- Quality checks passed with 98% score
- Client feedback has been extremely positive

The team has been working incredibly hard, and I think we should celebrate this milestone. How about a team lunch on Friday?

Let me know if you have any questions or need more details on any specific area.

Best regards,
John`
  },
  { 
    id: 2, 
    from: 'Sarah Johnson', 
    subject: 'Meeting Tomorrow at 2 PM', 
    preview: 'Don\'t forget about our meeting tomorrow...',
    time: '4h ago',
    date: 'May 20, 2026',
    starred: false,
    tags: ['Work', 'Urgent'],
    content: `Hi!

Just a quick reminder about our meeting tomorrow at 2 PM. Please come prepared with the following:

1. Q2 Progress Report
2. Budget breakdown for next quarter
3. List of potential challenges

The meeting will be in Conference Room A, but if you can't make it in person, the link is below.

See you tomorrow!

Sarah`,
    attachments: [{ name: 'Q2_Report.pdf', size: '2.4 MB' }]
  },
  { 
    id: 3, 
    from: 'Mike Brown', 
    subject: 'Thanks for your help!', 
    preview: 'Thanks for your help with the presentation...',
    time: '1d ago',
    date: 'May 19, 2026',
    starred: false,
    tags: ['Personal'],
    content: `Hey!

I just wanted to say a huge thank you for helping me with the presentation yesterday. It went really well - the clients loved it!

The design suggestions you made were spot on, and the data visualization really helped drive the key points home. My boss was especially impressed.

I owe you one! Let me know if there's anything I can do to help you out.

Cheers,
Mike`
  },
  { 
    id: 4, 
    from: 'Emily Davis', 
    subject: 'Newsletter: AI Trends 2026', 
    preview: 'Check out the latest AI trends and insights...',
    time: '2d ago',
    date: 'May 18, 2026',
    starred: true,
    tags: ['AI'],
    content: `Hello!

Here are this week's top AI trends and insights:

🔹 GPT-5 Release: OpenAI announces new capabilities
🔹 AI in Healthcare: Breakthrough in diagnostic accuracy
🔹 Automation: Companies saving 40% with AI tools
🔹 Ethics: New guidelines for responsible AI development

Click the link below to read the full newsletter.

Best,
Emily
Tech Insights Team`
  },
  { 
    id: 5, 
    from: 'Alex Chen', 
    subject: 'Code Review Request', 
    preview: 'Could you please review my PR when you have time...',
    time: '3d ago',
    date: 'May 17, 2026',
    starred: false,
    tags: ['Work'],
    content: `Hi!

I've submitted a pull request for the new feature we've been working on. Could you please review it when you have a chance?

PR Link: github.com/project/pull/123

Main changes:
- Added user authentication flow
- Implemented new dashboard components
- Updated API endpoints

Let me know if you have any questions!

Thanks,
Alex`
  },
];

function App() {
  const [activeTab, setActiveTab] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState(mockEmails[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [emails, setEmails] = useState(mockEmails);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCompose, setShowCompose] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const filteredEmails = emails.filter(email => 
    email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.from.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSuggestions = async (emailContent, tone = 'formal') => {
    setLoading(true);
    try {
      const result = await api.getReplySuggestions(emailContent, tone);
      setSuggestions(result);
    } catch (err) {
      console.error('Failed to get suggestions:', err);
      setSuggestions([
        { text: 'API unavailable. Make sure backend is running on port 5000', tone: 'Error' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = () => {
    if (selectedEmail) {
      getSuggestions(selectedEmail.content);
    }
  };

  const handleUseSuggestion = (suggestion) => {
    setAiPrompt(suggestion.text);
  };

  const handleAIChat = async () => {
    if (!aiPrompt.trim()) return;
    setLoading(true);
    try {
      const result = await api.getReplySuggestions(aiPrompt, 'formal');
      setAiResponse(result[0]?.text || 'No response');
    } catch (err) {
      setAiResponse('Error: Backend not available');
    } finally {
      setLoading(false);
    }
  };

  const handleCompose = async (data) => {
    setLoading(true);
    try {
      const result = await api.draftEmail(data.recipient, data.purpose, data.context, data.tone);
      console.log('Draft created:', result);
      setShowCompose(false);
    } catch (err) {
      console.error('Failed to create draft:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedEmail) {
      getSuggestions(selectedEmail.content);
    }
  }, [selectedEmail?.id]);

  return (
    <div className="h-screen flex bg-dark-950">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} onCompose={() => setShowCompose(true)} />
      
      <div className="flex-1 flex flex-col">
        <Header 
          user={{ name: 'Alex Morgan', email: 'alex@email.com' }} 
          onSearch={setSearchQuery}
        />
        
        <div className="flex-1 flex overflow-hidden">
          <div className="w-96 bg-dark-900/30 border-r border-white/10">
            <EmailList 
              emails={filteredEmails} 
              onSelect={setSelectedEmail} 
              selectedId={selectedEmail?.id} 
            />
          </div>
          
          <EmailViewer 
            email={selectedEmail} 
            onDelete={() => setSelectedEmail(null)}
          />
          
          <AIAssistant 
            suggestions={suggestions}
            loading={loading}
            onRegenerate={handleRegenerate}
            onUseSuggestion={handleUseSuggestion}
            aiPrompt={aiPrompt}
            setAiPrompt={setAiPrompt}
            aiResponse={aiResponse}
            onAIChat={handleAIChat}
            onCompose={() => setShowCompose(true)}
          />
        </div>
      </div>

      {showCompose && (
        <ComposeModal 
          onClose={() => setShowCompose(false)}
          onSend={handleCompose}
          loading={loading}
        />
      )}
    </div>
  );
}

export default App;