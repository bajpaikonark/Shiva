
import { retrieveForceSnippets } from '../../utils/rag';

export default function handler(req, res){
  if(req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});
  const { message, topic } = req.body || {};
  if(topic !== 'force_class8') return res.status(400).json({ error: 'Unknown topic' });

  const chunks = retrieveForceSnippets(message);
  // Compose a friendly answer from top snippets
  const lead = chunks[0];
  let reply = '';
  if(lead){
    reply += lead.text;
    const extra = chunks.slice(1).map(c=>c.text).join(' ');
    if(extra) reply += ' ' + extra;
  } else {
    reply = "Let's break it down: Force is a push or pull that can change motion. Ask me about formulas or examples!";
  }
  const sources = chunks.map(c=> c.type === 'concept' ? c.title : c.title);
  return res.status(200).json({ reply, sources });
}
