
import Sidebar from '../../components/Sidebar';
import data from '../../data/force_class8_rag.json';
import { useState } from 'react';

export default function ForceChapter(){
  const [known, setKnown] = useState({});
  return (
    <div className="container">
      <div className="layout">
        <Sidebar />
        <main style={{flex:1}}>
          <div className="card">
            <h2>Class 8 Science — Force</h2>
            <h3>Gist</h3>
            <p>{data.summary}</p>
            <h3>Flashcards</h3>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
              {data.concepts.map((c,i)=>{
                const k = known[c.name];
                return (
                  <div key={i} className="flash">
                    <div>
                      <div style={{fontWeight:700}}>{c.name}</div>
                      <div style={{marginTop:6,fontWeight:500}}>{c.definition}</div>
                      {c.formula && <div style={{marginTop:6}}>Formula: <strong>{c.formula}</strong></div>}
                      <div style={{marginTop:8, display:'flex', gap:8, justifyContent:'center'}}>
                        <button className="btn" onClick={()=>setKnown(o=>({...o,[c.name]: true}))}>I Know</button>
                        <button className="btn" onClick={()=>setKnown(o=>({...o,[c.name]: false}))} style={{background:'#475569'}}>Don’t Know</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
