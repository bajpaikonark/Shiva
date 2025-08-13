
import { questionsByConcept } from '../../utils/rag';

export default function handler(req, res){
  if(req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});
  const { concept, count=3 } = req.body || {};
  const pool = questionsByConcept(concept) || [];
  // create simple variations by shuffling / picking
  const out = [];
  for(let i=0; i<pool.length && out.length<count; i++){
    out.push({ q: pool[i].q, options: pool[i].options, answer: pool[i].answer, concept });
  }
  // If not enough, provide scaffolding questions
  while(out.length < count){
    if(concept === 'pressure'){
      out.push({ q: 'If the area halves and force is same, pressure will…?', options:['Double','Half','Same','Zero'], answer:'Double', concept });
    } else if(concept === 'force'){
      out.push({ q: 'What happens to acceleration if mass is fixed and force doubles?', options:['Doubles','Halves','Zero','Same'], answer:'Doubles', concept });
    } else {
      out.push({ q: 'Pick the correct relation: P = ?', options:['F/A','m×a','V×I','W/t'], answer:'F/A', concept:'pressure' });
    }
  }
  res.status(200).json({ questions: out.slice(0, count) });
}
