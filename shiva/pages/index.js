
import Sidebar from '../components/Sidebar';
import Link from 'next/link';
export default function Home(){
  return (
    <div className="container">
      <div className="layout">
        <Sidebar />
        <main style={{flex:1}}>
          <div className="card">
            <h1>Shiva — AI Learning (MVP)</h1>
            <p>Start with Class 8 Science: <strong>Force</strong></p>
            <div style={{display:'flex',gap:8}}>
              <Link className="btn" href="/chapter/force">📖 Learn</Link>
              <Link className="btn" href="/quiz/force">📝 Quiz</Link>
              <Link className="btn" href="/tutor">🤖 Ask AI Tutor</Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
