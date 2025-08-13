
import Sidebar from '../../components/Sidebar';
import data from '../../data/force_class8_rag.json';
import { useState } from 'react';

export default function ForceQuiz(){
  const [answers, setAnswers] = useState({});
  const [extras, setExtras] = useState({}); // adaptive questions per index

  async function answer(qIndex, opt){
    const q = data.questions[qIndex];
    const correct = opt === q.answer;
    setAnswers(prev=>({...prev, [qIndex]: { selected: opt, correct }}));
    if(!correct){
      // call adaptive endpoint
      const res = await fetch('/api/adaptive', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ concept: q.concept, difficulty: 'easy' })
      });
      const js = await res.json();
      setExtras(prev=>({...prev, [qIndex]: js.questions}));
    }
  }

  return (
    <div className="container">
      <div className="layout">
        <Sidebar />
        <main style={{flex:1}}>
          <div className="card">
            <h2>Quiz — Force</h2>
            {data.questions.map((q, idx)=>(
              <div key={idx} style={{marginBottom:16}}>
                <div style={{fontWeight:700}}>{idx+1}. {q.q}</div>
                <div style={{display:'flex',gap:8, flexWrap:'wrap', marginTop:8}}>
                  {q.options.map((o,i)=>(
                    <button key={i} className="btn" onClick={()=>answer(idx,o)}>{o}</button>
                  ))}
                </div>
                {answers[idx] && (
                  <div style={{marginTop:8}}>
                    {answers[idx].correct ? <span style={{color:'green'}}>Correct ✅</span> : <span style={{color:'crimson'}}>Incorrect ❌</span>}
                  </div>
                )}
                {extras[idx] && (
                  <div style={{marginTop:8, padding:12, background:'#f1f5f9', borderRadius:8}}>
                    <strong>More practice on {q.concept}:</strong>
                    <ul style={{marginTop:6}}>
                      {extras[idx].map((ex,i)=>(
                        <li key={i}>{ex.q}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
