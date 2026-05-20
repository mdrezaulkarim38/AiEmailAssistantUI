const API_BASE = 'http://localhost:5000';

export const api = {
  async getReplySuggestions(incomingEmail, tone = 'formal') {
    const response = await fetch(`${API_BASE}/reply-suggestion`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ incomingEmail, tone })
    });
    const data = await response.json();
    return parseSuggestions(data.output);
  },

  async draftEmail(recipient, purpose, context, tone = 'formal') {
    const response = await fetch(`${API_BASE}/draft`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipient, purpose, context, tone })
    });
    return response.json();
  },

  async changeTone(emailText, targetTone) {
    const response = await fetch(`${API_BASE}/tone`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emailText, targetTone })
    });
    const data = await response.json();
    return data.output;
  }
};

function parseSuggestions(text) {
  const lines = text.split('\n').filter(line => line.trim());
  const suggestions = [];
  let current = null;

  lines.forEach(line => {
    if (line.match(/^\d+[.)]/)) {
      if (current) suggestions.push(current);
      current = { text: line.replace(/^\d+[.)]\s*/, ''), tone: 'Professional' };
    } else if (current) {
      current.text += ' ' + line;
    }
  });
  if (current) suggestions.push(current);

  if (suggestions.length === 0) {
    return [
      { text: text.slice(0, 200), tone: 'Professional' },
      { text: text.slice(200, 400), tone: 'Friendly' },
      { text: text.slice(400, 600), tone: 'Casual' }
    ].filter(s => s.text);
  }

  return suggestions.slice(0, 3);
}