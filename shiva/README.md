
# Shiva — AI Learning App (MVP with RAG)

Shiva is a minimal Next.js app for personalized learning with:
- Chapter-specific **RAG** (retrieval-augmented generation) for accurate answers
- **AI Tutor** chatbot that cites RAG snippets
- **Adaptive practice**: when a question is wrong, more related questions are generated
- Sample topic: **Class 8 Science — Force**

## Quick Start
```bash
npm install
npm run dev
# visit http://localhost:3000
```

## Structure
- `data/force_class8_rag.json` — curated knowledge for RAG
- `pages/api/ai_chat.js` — RAG-backed tutor replies
- `pages/api/adaptive.js` — generates related questions when user errs
- `pages/chapter/force.js` — gist + flashcards
- `pages/quiz/force.js` — quiz that spawns adaptive follow-ups
- `components/Chatbot.js` — UI for tutor

## Deploy
Push to GitHub, then import to Vercel. No env vars are required for the mock RAG.
