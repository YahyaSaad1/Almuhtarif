import React, { useState, useEffect, useRef } from 'react';
import { Mic, Volume2, Send, Sparkles, StopCircle, CheckCircle2, AlertCircle, Trophy, Loader2, MessageSquare, RefreshCcw, Languages, ChevronRight } from 'lucide-react';

const API_KEY = "AIzaSyBc9Jizu6Voe7-gfsaq_YMkfQ6SDNCwi0o"; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;
const UltimateAITutor = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [score, setScore] = useState(0);
  const [showAr, setShowAr] = useState(false);
  
  const [aiContent, setAiContent] = useState({ 
    message: "Welcome Yahia! Enter a topic to generate your custom English lesson.", 
    ar: "أهلاً يا يحيى! أدخل موضوعاً لإنشاء درس إنجليزي مخصص لك.",
    quiz: null 
  });
  const [feedback, setFeedback] = useState(null);

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const startLesson = async () => {
    if (!topic) return;
    setLoading(true);
    setFeedback(null);
    setShowAr(false);

    const prompt = `Act as an elite English teacher. Topic: ${topic}. 
    Return ONLY a valid JSON object with this exact structure:
    {
      "message": "English intro", 
      "ar": "الترجمة العربية للإنترو", 
      "quiz": {
        "question": "English MCQ question", 
        "options": ["Option A","Option B","Option C","Option D"], 
        "correct": "The exact correct string", 
        "explanation": "English grammar tip", 
        "explanation_ar": "شرح القاعدة بالعربي"
      }
    }`;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      const rawText = data.candidates[0].content.parts[0].text;
      const cleanJson = rawText.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleanJson);

      setAiContent(parsed);
      speak(parsed.message + ". " + parsed.quiz.question);
    } catch (error) {
      console.error("AI Error Details:", error);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (selected) => {
    if (selected === aiContent.quiz.correct) {
      setFeedback({ 
        type: 'success', 
        text: `Perfect! ${aiContent.quiz.explanation}`, 
        ar: aiContent.quiz.explanation_ar 
      });
      setScore(s => s + 20);
      speak("Excellent! " + aiContent.quiz.explanation);
    } else {
      setFeedback({ 
        type: 'error', 
        text: `Incorrect. The right answer is: ${aiContent.quiz.correct}`, 
        ar: "حاول مرة أخرى في السؤال القادم" 
      });
      speak("Not quite, but keep going.");
    }
  };

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = useRef(SpeechRecognition ? new SpeechRecognition() : null).current;

  useEffect(() => {
    if (!recognition) return;
    recognition.lang = 'en-US';
    recognition.onresult = (e) => setTranscript(e.results[0][0].transcript);
    recognition.onend = () => setIsListening(false);
  }, [recognition]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 font-sans selection:bg-blue-100 text-slate-900">
      
      <nav className="max-w-4xl mx-auto flex justify-between items-center bg-white p-5 rounded-3xl shadow-sm border border-slate-100 mb-10">
        <div className="flex items-center gap-2 font-black text-blue-600 text-xl tracking-tighter">
          <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-200">
            <Sparkles size={20} className="fill-blue-200" />
          </div>
          AI TUTOR PRO
        </div>
        <div className="bg-amber-50 px-5 py-2 rounded-2xl border border-amber-100 flex items-center gap-2">
          <Trophy size={18} className="text-amber-500 fill-amber-100" />
          <span className="font-bold text-amber-800 tracking-tight">{score} XP</span>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto">
        <section className="mb-10 text-center">
          <h2 className="text-4xl font-black text-slate-800 mb-6 tracking-tight leading-tight">What do you want <br/> to master today?</h2>
          <div className="relative group bg-white rounded-[2rem] shadow-2xl shadow-blue-900/5 transition-all focus-within:ring-4 focus-within:ring-blue-500/10">
            <input 
              type="text" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Job Interview, Conditional Sentences..." 
              className="w-full p-6 pr-20 bg-transparent border-none focus:outline-none text-lg font-medium"
            />
            <button 
              onClick={startLesson}
              disabled={loading}
              className="absolute right-3 top-3 bg-blue-600 text-white p-4 rounded-2xl hover:bg-blue-700 transition-all shadow-lg active:scale-95 disabled:bg-slate-300">
              {loading ? <Loader2 className="animate-spin" /> : <Send size={22} />}
            </button>
          </div>
        </section>

        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-50 min-h-[400px]">
          <div className="space-y-4 mb-10">
            <div className="flex items-start gap-4">
              <button 
                onClick={() => speak(aiContent.message)} 
                className="p-4 bg-blue-50 text-blue-600 rounded-2xl hover:bg-blue-100 transition-colors shadow-sm active:scale-95 shrink-0">
                <Volume2 size={24} />
              </button>
              <div className="flex-1">
                <p className="text-2xl font-bold text-slate-700 leading-tight pt-2 italic">
                  "{aiContent.message}"
                </p>
                {showAr && <p className="text-lg text-slate-400 mt-3 font-medium border-t pt-3" dir="rtl">{aiContent.ar}</p>}
              </div>
            </div>
            <button 
              onClick={() => setShowAr(!showAr)} 
              className="flex items-center gap-2 text-[10px] font-black text-blue-500 uppercase tracking-widest border border-blue-100 px-4 py-2 rounded-full hover:bg-blue-50 transition-colors">
              <Languages size={14}/> {showAr ? "Hide Translation" : "Show Translation"}
            </button>
          </div>

          {aiContent.quiz && (
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 border-t pt-10">
              <div className="flex items-center gap-2 mb-6 text-blue-400 font-black uppercase text-[10px] tracking-[0.3em]">
                <MessageSquare size={14} className="fill-blue-100" /> QUIZ TIME
              </div>
              <p className="text-xl font-bold text-slate-800 mb-8 border-l-4 border-blue-600 pl-4">
                {aiContent.quiz.question}
              </p>
              
              <div className="grid grid-cols-1 gap-4">
                {aiContent.quiz.options.map((opt, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleAnswer(opt)} 
                    className="p-5 text-left rounded-2xl border-2 border-slate-50 bg-slate-50/30 hover:border-blue-500 hover:bg-white transition-all font-bold text-slate-600 hover:text-blue-700 shadow-sm flex justify-between items-center group">
                    <span>{opt}</span>
                    <ChevronRight size={18} className="text-slate-200 group-hover:text-blue-500 transition-colors" />
                  </button>
                ))}
              </div>

              {feedback && (
                <div className={`mt-10 p-6 rounded-3xl border animate-in zoom-in duration-300 ${feedback.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
                   <div className="flex items-center gap-3 mb-2">
                      {feedback.type === 'success' ? <CheckCircle2 size={20}/> : <AlertCircle size={20}/>}
                      <p className="font-black text-xs uppercase tracking-widest">{feedback.type === 'success' ? 'Brilliant!' : 'Note'}</p>
                   </div>
                  <p className="font-bold text-sm leading-relaxed">{feedback.text}</p>
                  {showAr && <p className="text-xs mt-2 opacity-80 font-medium" dir="rtl">{feedback.ar}</p>}
                </div>
              )}

              <button 
                onClick={startLesson} 
                className="mt-10 flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-50 p-3 rounded-xl transition-all">
                <RefreshCcw size={16}/> Refresh Question
              </button>
            </div>
          )}
        </div>
      </main>

      <div className="fixed bottom-10 left-0 right-0 flex flex-col items-center gap-4">
        {transcript && (
          <div className="bg-white/95 backdrop-blur-md px-6 py-3 rounded-full shadow-2xl border border-blue-100 mb-2 transform scale-110">
            <p className="text-blue-600 font-black italic tracking-tight">"{transcript}"</p>
          </div>
        )}
        <div className="flex flex-col items-center gap-3 bg-white/60 backdrop-blur-lg px-10 py-6 rounded-[3.5rem] border border-white/50 shadow-2xl">
          <p className={`text-[10px] font-black uppercase tracking-[0.5em] ${isListening ? 'text-red-500 animate-pulse' : 'text-slate-400'}`}>
            {isListening ? 'Recording Voice' : 'Hold to Speak'}
          </p>
          <button 
            onMouseDown={() => { setIsListening(true); setTranscript(''); recognition.start(); }}
            onMouseUp={() => recognition.stop()}
            className={`p-10 rounded-full transition-all duration-500 transform ${isListening ? 'bg-red-500 scale-125 shadow-[0_0_50px_rgba(239,68,68,0.4)] rotate-90' : 'bg-blue-600 shadow-xl hover:shadow-blue-300 active:scale-90 shadow-blue-200'} text-white`}>
            {isListening ? <StopCircle size={40} /> : <Mic size={40} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UltimateAITutor;