
import Link from 'next/link';
export default function Sidebar(){
  return (
    <aside className="sidebar">
      <h3 style={{marginTop:0}}>Shiva</h3>
      <nav style={{display:'flex',flexDirection:'column',gap:8}}>
        <Link className="link" href="/">🏠 Home</Link>
        <Link className="link" href="/chapter/force">📖 Learn: Force (Class 8)</Link>
        <Link className="link" href="/quiz/force">📝 Quiz: Force</Link>
        <Link className="link" href="/tutor">🤖 AI Tutor</Link>
      </nav>
    </aside>
  );
}
