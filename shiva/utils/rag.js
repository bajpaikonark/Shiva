
import rag from '../data/force_class8_rag.json';

function tokenize(s){ return (s||'').toLowerCase().split(/[^a-z0-9]+/).filter(Boolean); }

export function retrieveForceSnippets(query){
  const qTokens = tokenize(query);
  const snippets = [];

  // Concepts
  rag.concepts.forEach(c=>{
    const text = `${c.name} ${c.definition} ${c.formula||''} ${c.note||''}`.toLowerCase();
    const score = qTokens.reduce((acc,t)=> acc + (text.includes(t)?1:0), 0);
    if(score>0) snippets.push({ type:'concept', title:c.name, text:c.definition + (c.formula?` Formula: ${c.formula}`:''), score });
  });

  // FAQ
  rag.faq.forEach(f=>{
    const text = `${f.q} ${f.a}`.toLowerCase();
    const score = qTokens.reduce((acc,t)=> acc + (text.includes(t)?1:0), 0);
    if(score>0) snippets.push({ type:'faq', title:f.q, text:f.a, score });
  });

  // Summary as fallback
  snippets.push({ type:'summary', title:'Chapter gist', text: rag.summary, score: 0.1 });

  // Sort by score desc
  return snippets.sort((a,b)=> b.score - a.score).slice(0,3);
}

export function questionsByConcept(concept){
  return rag.questions.filter(q=> q.concept === concept);
}

export function allForceData(){ return rag; }
