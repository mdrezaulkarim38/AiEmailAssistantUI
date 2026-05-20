const API_BASE = 'http://localhost:5089';

async function request(url, body) {
  const response = await fetch(`${API_BASE}${url}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API ${response.status}: ${text.slice(0, 100)}`);
  }
  return response.json();
}

export const api = {
  async getReplySuggestions(incomingEmail, tone = 'formal') {
    const data = await request('/reply-suggestion', { incomingEmail, tone });
    return parseSuggestions(data.output);
  },

  async draftEmail(recipient, purpose, context, tone = 'formal') {
    return request('/draft', { recipient, purpose, context, tone });
  },

  async changeTone(emailText, targetTone) {
    const data = await request('/tone', { emailText, targetTone });
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