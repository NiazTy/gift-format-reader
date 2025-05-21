import React, { useState, useEffect } from "react";

function GiftViewer() {
  const [questions, setQuestions] = useState(() => {
    const saved = localStorage.getItem("gift_questions");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("gift_questions", JSON.stringify(questions));
  }, [questions]);

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

  const handleReset = () => {
    localStorage.removeItem("gift_questions");
    setQuestions([]);
  };

  const cleanText = (str) => str
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/\\/g, '')
    .replace(/\s+/g, ' ')
    .replace(/<span[^>]*>/gi, '')
    .replace(/<\/?span[^>]*>/gi, '')
    .replace(/style\s*=\s*"[^"]*"/gi, '')
    .replace(/color\s*:[^;"'>]*/gi, '')
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

      } else if (cleanedBody.includes('->')) {
        const pairs = [...cleanedBody.matchAll(/=([^=~]*?)\s*->\s*(.*?)\s*(?==|$)/gs)];
        const isTrueFalse = pairs.every(p => ['benar', 'salah'].includes(p[2].trim().toLowerCase()));
        results.push({
          title: title.trim(),
          question: cleanQuestion,
          type: isTrueFalse ? 'truefalse-l1' : 'matching',
          pairs: pairs.map(([_, left, right]) => ({ left: cleanText(left), right: cleanText(right) }))
        });

      } else if (cleanedBody.includes('~') || cleanedBody.includes('=')) {
        const options = [...cleanedBody.matchAll(/([=~])(?:%(\d+(?:\.\d+)?)%)*\s*(.*?)(?=$|[=~])/gs)];
        const isComplex = options.some(o => o[2]);
        const parsedOptions = options.map(([_, mark, score, text]) => ({
          text: cleanText(text),
          correct: mark === '=' && !score,
          score: score ? `${score}%` : null
        }));

        results.push({
          title: title.trim(),
          question: cleanQuestion,
          type: isComplex ? 'pg-complex' : 'pg',
          options: parsedOptions
        });
      }
    }
    return results;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 py-10">
      <div className="max-w-4xl mx-auto bg-white/80 shadow-xl rounded-2xl p-8 backdrop-blur-md">
        <h1 className="text-3xl font-extrabold mb-6 text-purple-700 flex items-center gap-2">
          <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20l9 2-7-7 7-7-9 2-2-9-2 9-9-2 7 7-7 7 9-2z" /></svg>
          GIFT Viewer <span className="text-base font-normal text-gray-500 ml-2">(Semua Tipe Soal)</span>
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <label className="flex flex-col items-start gap-2 cursor-pointer">
            <span className="text-sm font-medium text-gray-700">Upload File GIFT (.txt)</span>
            <input
              type="file"
              accept=".txt"
              onChange={handleFileChange}
              className="file:bg-blue-600 file:text-white file:rounded file:px-4 file:py-2 file:border-0 file:mr-4 file:cursor-pointer bg-gray-50 border border-gray-300 rounded px-2 py-1"
            />
          </label>
          <button
            onClick={handleReset}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-lg shadow hover:from-red-600 hover:to-pink-600 transition font-semibold"
          >
            Reset Soal
          </button>
        </div>

        {questions.length === 0 && (
          <div className="text-center text-gray-400 py-16">
            <svg className="mx-auto w-16 h-16 mb-4 text-blue-200" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20l9 2-7-7 7-7-9 2-2-9-2 9-9-2 7 7-7 7 9-2z" /></svg>
            <p className="text-lg">Belum ada soal. Silakan upload file GIFT.</p>
          </div>
        )}

        <div className="space-y-8">
          {questions.map((q, i) => (
            <div
              key={i}
              className="border border-purple-200 p-6 rounded-xl bg-gradient-to-br from-purple-50 via-white to-blue-50 shadow hover:shadow-lg transition"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-block bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shadow">{i + 1}</span>
                <h2 className="text-xl font-bold text-purple-700">Soal {i + 1}</h2>
              </div>
              <p className="mb-1"><span className="font-semibold text-gray-700">Judul:</span> <span className="text-gray-900">{q.title}</span></p>
              <p className="mb-3"><span className="font-semibold text-gray-700">Soal:</span> <span className="text-gray-900">{q.question}</span></p>

              {q.type === 'essay' && (
                <div className="mb-2">
                  <span className="font-semibold text-blue-700">Jawaban Essay:</span>
                  <ul className="list-disc ml-6 mt-1 text-gray-800">
                    {q.answers.map((a, idx) => (
                      <li key={idx} className="py-0.5">{a}</li>
                    ))}
                  </ul>
                </div>
              )}

              {q.type === 'truefalse' && (
                <p className="mb-2">
                  <span className="font-semibold text-blue-700">Jawaban:</span>
                  <span className={`ml-2 px-2 py-1 rounded font-bold ${q.answer === 'TRUE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {q.answer}
                  </span>
                </p>
              )}

              {q.type === 'truefalse-l1' && (
                <div className="mb-2">
                  <span className="font-semibold text-blue-700">Benar/Salah:</span>
                  <ul className="list-disc ml-6 mt-1 text-gray-800">
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
                  <span className="font-semibold text-blue-700">Pasangan Matching:</span>
                  <ul className="list-disc ml-6 mt-1 text-gray-800">
                    {q.pairs.map((p, idx) => (
                      <li key={idx} className="py-0.5">
                        <span className="font-semibold">{p.left}</span> <span className="font-bold">→</span> <span className="text-blue-700">{p.right}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {q.type === 'pg' && (
                <div className="mb-2">
                  <span className="font-semibold text-blue-700">Pilihan Ganda:</span>
                  <ul className="list-disc ml-6 mt-1">
                    {q.options.map((opt, idx) => (
                      <li
                        key={idx}
                        className={`py-0.5 ${opt.correct ? 'bg-green-100 text-green-800 font-semibold rounded px-2' : 'text-gray-800'}`}
                      >
                        {opt.text} {opt.correct && <span className="ml-2 text-green-700 font-bold">(Jawaban Benar)</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {q.type === 'pg-complex' && (
                <div className="mb-2">
                  <span className="font-semibold text-blue-700">Pilihan Ganda Kompleks:</span>
                  <ul className="list-disc ml-6 mt-1">
                    {q.options.map((opt, idx) => (
                      <li key={idx} className="py-0.5 text-gray-800">
                        {opt.text} {opt.score && <span className="ml-2 text-purple-700 font-semibold">(Bobot: {opt.score})</span>}
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
