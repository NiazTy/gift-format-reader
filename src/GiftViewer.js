import React, { useState, useEffect, useRef } from "react";

function GiftViewer() {
  const [questions, setQuestions] = useState(() => {
    const saved = localStorage.getItem("gift_questions");
    return saved ? JSON.parse(saved) : [];
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("gift_questions", JSON.stringify(questions));
  }, [questions]);

  const handleReset = () => {
    localStorage.removeItem("gift_questions");
    setQuestions([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const parsed = parseGift(text);
      setQuestions(parsed);
    };
    reader.readAsText(file);
  };

  const cleanText = (str) => str
    .replace(/<[^>]*>/gi, '')
    .replace(/&nbsp;|&quot;|&#\\d+;/gi, ' ')
    .replace(/style\\s*=\\s*\"[^\"]*\"/gi, '')
    .replace(/color\\s*[:=][^;\"'>]*/gi, '')
    .replace(/font-size\\s*[:=][^;\"'>]*/gi, '')
    .replace(/"[^"]*">/g, '')
    .replace(/\\\\/g, '')
    .replace(/\\s+/g, ' ')
    .trim();


  const parseGift = (text) => {
    const pattern = /::(.*?)::\s*\[html\](.*?){([\s\S]*?)}/g;
    let match;
    const results = [];

    while ((match = pattern.exec(text)) !== null) {
      const [_, title, question, body] = match;
      const cleanedBody = body.replace(/\r?\n/g, '').trim();
      const cleanQuestion = cleanText(question);

      if (cleanedBody.includes('%100%')) {
        const answers = [...cleanedBody.matchAll(/=%100%(.*?)#/g)].map(m => cleanText(m[1]));
        results.push({ title: title.trim(), question: cleanQuestion, type: 'essay', answers });

      } else if (/^\s*(TRUE|FALSE)\s*$/i.test(cleanedBody)) {
        results.push({ title: title.trim(), question: cleanQuestion, type: 'truefalse', answer: cleanedBody.trim().toUpperCase() });

      }  else if (cleanedBody.includes('->')) {
        const pairs = [...cleanedBody.matchAll(/=([^=~]*?)\s*->\s*(.*?)\s*(?==|$)/gs)];
        const isTrueFalse = pairs.every(p => ['benar', 'salah'].includes(p[2].trim().toLowerCase()));
        results.push({
          title: title.trim(),
          question: cleanQuestion,
          type: isTrueFalse ? 'truefalse-l1' : 'matching',
          pairs: pairs.map(([_, left, right]) => ({
            left: cleanText(left),
            right: cleanText(right)
          }))
        });

      } else if ((cleanedBody.includes('~') || cleanedBody.includes('=')) && /~\s*%(\d+(?:\.\d+)?)%/.test(cleanedBody)) {
        const parsePGK = (body, title, question) => {
        const options = [...body.matchAll(/~\s*%(\d+(?:\.\d+)?)%\s*(.*?)(?=~|$)/gs)];
        return {
          title: title.trim(),
          question: cleanText(question),
          type: 'pg-complex',
          options: options.map(([_, score, text]) => ({
            text: cleanText(text),
            score: `${parseFloat(score).toFixed(3)}%`
          }))
        };
      };
        results.push(parsePGK(cleanedBody, title, question));

      } else if (cleanedBody.includes('~') || cleanedBody.includes('=')) {
        const rawOptions = [...cleanedBody.matchAll(/([=~])\s*((?:<[^>]+>)*[\s\S]*?)(?=(?:[=~]|$))/g)];
        const options = rawOptions.map(([_, mark, rawHtml]) => {
          const text = cleanText(rawHtml);
          return {
            text,
            correct: mark === '=',
          };
        });
        results.push({
          title: title.trim(),
          question: cleanQuestion,
          type: 'pg',
          options
        });

      } 
    }
    return results;
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-10 font-sans bg-white">
      <div className="relative w-full max-w-3xl p-6 mx-auto overflow-hidden border-2 border-gray-200 shadow-lg rounded-2xl bg-white/95">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-200 via-white to-blue-200 rounded-t-2xl" />
          <h1 className="flex items-center gap-3 mt-2 mb-8 text-3xl font-extrabold tracking-wide text-gray-800 drop-shadow-sm">
            <span className="inline-block animate-bounce"></span>
              <svg className="text-pink-400 w-9 h-9" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20l9 2-7-7 7-7-9 2-2-9-2 9-9-2 7 7-7 7 9-2z" />
              </svg>
            <span className="text-transparent bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text">GIFT Viewer</span>
            <span className="ml-2 text-base font-normal text-gray-400">(By NiazTy)</span>
          </h1>
          <div className="flex flex-col items-center gap-4 mb-8 sm:flex-row sm:items-end">
            <label className="flex flex-col items-start gap-2 cursor-pointer">
              <span className="text-sm font-medium text-gray-700">Upload File GIFT (.txt)</span>
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt"
                onChange={handleFileChange}
                className="px-2 py-1 transition border border-pink-200 rounded file:bg-pink-400 file:text-white file:rounded file:px-4 file:py-2 file:border-0 file:mr-4 file:cursor-pointer bg-gray-50 focus:ring-2 focus:ring-pink-200"
              />
            </label>
            <button
              onClick={handleReset}
              className="px-6 py-2 font-semibold text-white transition rounded-lg shadow bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500 sm:mb-0"
            >
              Reset Soal
            </button>
          </div>

          {questions.length === 0 && (
            <div className="py-16 text-center text-gray-300">
              <svg className="w-16 h-16 mx-auto mb-4 text-pink-100 animate-pulse" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20l9 2-7-7 7-7-9 2-2-9-2 9-9-2 7 7-7 7 9-2z" />
              </svg>
              <p className="text-lg font-semibold">Belum ada soal.<br />Silakan upload file GIFT.</p>
            </div>
          )}

          <div className="space-y-8">
            {questions.map((q, i) => (
              <div
                key={i}
                className="relative p-6 transition border-2 border-pink-100 shadow rounded-xl bg-white/80 hover:shadow-xl"
              >
                {/* Decorative anime-style accent */}
              <div className="absolute w-8 h-8 rounded-full pointer-events-none top-2 right-2 bg-gradient-to-br from-pink-100 to-blue-100 opacity-60 blur-sm" />
              <div className="flex items-center gap-2 mb-3">
                <span className="flex items-center justify-center w-8 h-8 font-bold text-white rounded-full shadow bg-gradient-to-br from-pink-400 to-blue-400">{i + 1}</span>
                <h2 className="text-xl font-bold text-pink-500 drop-shadow">Soal {i + 1}</h2>
              </div>
              <p className="mb-1"><span className="font-semibold text-gray-600">Judul:</span> <span className="text-gray-800">{q.title}</span></p>
              <p className="mb-3"><span className="font-semibold text-gray-600">Soal:</span> <span className="text-gray-800">{q.question}</span></p>

              {q.type === 'essay' && (
                <div className="mb-2">
                  <span className="font-semibold text-blue-500">Jawaban Essay:</span>
                  <ul className="mt-1 ml-6 text-gray-700 list-disc">
                    {q.answers.map((a, idx) => (
                      <li key={idx} className="py-0.5">{a}</li>
                    ))}
                  </ul>
                </div>
              )}

              {q.type === 'truefalse' && (
                <p className="mb-2">
                  <span className="font-semibold text-blue-500">Jawaban:</span>
                  <span className={`ml-2 px-2 py-1 rounded font-bold border ${q.answer === 'TRUE' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
                    {q.answer}
                  </span>
                </p>
              )}

              {q.type === 'truefalse-l1' && (
                <div className="mb-2">
                  <span className="font-semibold text-blue-500">Benar/Salah:</span>
                  <ul className="mt-1 ml-6 text-gray-700 list-disc">
                    {q.pairs.map((p, idx) => (
                      <li key={idx} className={`py-0.5 ${p.right.toLowerCase() === 'benar' ? 'text-green-700' : 'text-red-700'}`}>
                        {p.left} <span className="font-bold">→</span> {p.right.toUpperCase()}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {q.type === 'matching' && (
                <div className="mb-2">
                  <span className="font-semibold text-blue-500">Pasangan Matching:</span>
                  <ul className="mt-1 ml-6 text-gray-700 list-disc">
                    {q.pairs.map((p, idx) => (
                      <li key={idx} className="py-0.5">
                        <span className="font-semibold">{p.left}</span> <span className="font-bold">→</span> <span className="text-blue-500">{p.right}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {q.type === 'pg' && (
                <div className="mb-2">
                  <span className="font-semibold text-blue-500">Pilihan Ganda:</span>
                  <ul className="mt-1 ml-6 list-disc">
                    {q.options.map((opt, idx) => (
                      <li
                        key={idx}
                        className={`py-0.5 ${opt.correct ? 'bg-green-100 text-green-800 font-semibold rounded px-2 border border-green-200' : 'text-gray-700'}`}
                      >
                        {opt.text} {opt.correct && <span className="font-bold text-green-700">(Jawaban Benar)</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {q.type === 'pg-complex' && (
                <div className="mb-2">
                  <span className="font-semibold text-blue-500">Pilihan Ganda Kompleks:</span>
                  <ul className="mt-1 ml-6 list-disc">
                    {q.options.map((opt, idx) => (
                      <li key={idx} className="py-0.5 text-gray-700">
                        {opt.text} {opt.score && <span className="font-semibold text-pink-500">(Bobot: {opt.score})</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GiftViewer;
