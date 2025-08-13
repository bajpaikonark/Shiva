
import Sidebar from '../components/Sidebar';
import Chatbot from '../components/Chatbot';
export default function Tutor(){
  return (
    <div className="container">
      <div className="layout">
        <Sidebar />
        <main style={{flex:1}}>
          <Chatbot topic="force_class8"/>
        </main>
      </div>
    </div>
  );
}
