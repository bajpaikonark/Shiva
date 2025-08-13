
import { useState } from 'react';
export default function Chatbot({ topic='force_class8' }){
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  async function send(){
    if(!text.trim()) return;
    const userMsg = { role:'user', text };
    setMessages(m=>[...m, userMsg]);
    setText(''); setLoading(true);
    const res = await fetch('/api/ai_chat', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ message:text, topic })
    });
    const data = await res.json();
    setMessages(m=>[...m, { role:'ai', text:data.reply, sources:data.sources }]);
    setLoading(false);
  }

  return (
    <div className="card">
      <h2>AI Tutor</h2>
      <div style={{minHeight:220,border:'1px solid #e2e8f0',borderRadius:8,padding:12,marginBottom:8,background:'#fff'}}>
        {messages.map((m,i)=>(
          <div key={i} style={{marginBottom:10}}>
            <strong>{m.role === 'user' ? 'You' : 'Tutor'}:</strong> {m.text}
            {m.sources && m.sources.length>0 && (
              <div style={{marginTop:4}}>
                {m.sources.map((s,idx)=>(<span key={idx} className="tag">{s}</span>))}
              </div>
            )}
          </div>
        ))}
        {loading && <div>Thinking…</div>}
      </div>
      <div style={{display:'flex',gap:8}}>
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="Ask about Force…" style={{flex:1,padding:8}}/>
        <button className="btn" onClick={send}>Send</button>
      </div>
    </div>
  );
}
