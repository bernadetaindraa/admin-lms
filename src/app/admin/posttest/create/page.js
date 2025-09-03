"use client";

import { useState } from "react";
import {
    Search,
    Trash2,
    Edit,
    Plus,
    ArrowLeft,
    Image as ImageIcon,
    Copy,
} from "lucide-react";

export default function PostTestPage() {
    const [postTests, setPostTests] = useState([]);
    const [search, setSearch] = useState("");

    const [isCreateMode, setIsCreateMode] = useState(false);
    const [judul, setJudul] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [questions, setQuestions] = useState([
        { id: 1, text: "", image: null, options: [{ text: "", image: null }, { text: "", image: null }] },
    ]);

    const handleAddPostTest = () => {
        if (!judul) return;
        const newPostTest = {
            id: Date.now(),
            judul,
            deskripsi,
            questions,
        };
        setPostTests([...postTests, newPostTest]);
        resetForm();
        setIsCreateMode(false);
    };

    const resetForm = () => {
        setJudul("");
        setDeskripsi("");
        setQuestions([
            { id: 1, text: "", image: null, options: [{ text: "", image: null }, { text: "", image: null }] },
        ]);
    };

    const handleDelete = (id) => {
        setPostTests(postTests.filter((p) => p.id !== id));
    };

    const filtered = postTests.filter((p) =>
        p.judul.toLowerCase().includes(search.toLowerCase())
    );

    // --- Pertanyaan ---
    const handleQuestionChange = (id, value) => {
        setQuestions(
            questions.map((q) => (q.id === id ? { ...q, text: value } : q))
        );
    };

    const handleQuestionImageUpload = (id, file) => {
        setQuestions(
            questions.map((q) =>
                q.id === id ? { ...q, image: file } : q
            )
        );
    };

    const duplicateQuestion = (id) => {
        const q = questions.find((x) => x.id === id);
        if (!q) return;
        const newQ = { ...q, id: Date.now() };
        setQuestions([...questions, newQ]);
    };

    const deleteQuestion = (id) => {
        setQuestions(questions.filter((q) => q.id !== id));
    };

    const addQuestion = () => {
        setQuestions([
            ...questions,
            { id: Date.now(), text: "", image: null, options: [{ text: "", image: null }, { text: "", image: null }] },
        ]);
    };

    // --- Opsi ---
    const handleOptionChange = (qid, idx, value) => {
        setQuestions(
            questions.map((q) =>
                q.id === qid
                    ? {
                        ...q,
                        options: q.options.map((opt, i) =>
                            i === idx ? { ...opt, text: value } : opt
                        ),
                    }
                    : q
            )
        );
    };

    const handleOptionImageUpload = (qid, idx, file) => {
        setQuestions(
            questions.map((q) =>
                q.id === qid
                    ? {
                        ...q,
                        options: q.options.map((opt, i) =>
                            i === idx ? { ...opt, image: file } : opt
                        ),
                    }
                    : q
            )
        );
    };

    const addOption = (qid) => {
        setQuestions(
            questions.map((q) =>
                q.id === qid
                    ? { ...q, options: [...q.options, { text: "", image: null }] }
                    : q
            )
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 text-gray-800">
            {!isCreateMode ? (
                <>
                    <h1 className="text-2xl font-bold mb-6">Kelola Post-test</h1>

                    {/* Tambah Post-test + Search */}
                    <div className="flex justify-between items-center mb-6">
                        <button
                            onClick={() => setIsCreateMode(true)}
                            className="flex items-center gap-2 border-2 border-dashed border-gray-400 px-4 py-3 rounded-lg hover:bg-gray-50"
                        >
                            <Plus className="w-5 h-5" /> Tambah Post-test
                        </button>

                        <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-white shadow-sm">
                            <Search className="w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Cari Post-test..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="outline-none text-gray-800"
                            />
                        </div>
                    </div>

                    {/* Daftar Post-test */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {filtered.map((p) => (
                            <div
                                key={p.id}
                                className="bg-white shadow-md rounded-xl p-4 flex flex-col justify-between"
                            >
                                <div>
                                    <h2 className="font-semibold text-lg">{p.judul}</h2>
                                    <p className="text-sm text-gray-500">{p.deskripsi}</p>
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <button className="p-2 rounded-lg hover:bg-gray-200">
                                        <Edit className="w-5 h-5 text-black" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(p.id)}
                                        className="p-2 rounded-lg hover:bg-gray-200"
                                    >
                                        <Trash2 className="w-5 h-5 text-black" />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {filtered.length === 0 && (
                            <p className="text-gray-500">Belum ada Post-test.</p>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <h3 className="text-3xl font-bold mb-6 text-gray-800">
                        Buat Post-test Baru
                    </h3>

                    <div className="bg-white p-8 rounded-2xl shadow-lg mb-6 border border-green-100">
                        {/* Judul & Deskripsi */}
                        <input
                            type="text"
                            placeholder="Judul Post-test"
                            value={judul}
                            onChange={(e) => setJudul(e.target.value)}
                            className="w-full border border-green-200 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
                        />
                        <textarea
                            placeholder="Deskripsi Post-test"
                            value={deskripsi}
                            onChange={(e) => setDeskripsi(e.target.value)}
                            className="w-full border border-green-200 rounded-lg p-3 mb-6 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-green-300 transition"
                        />

                        {/* Pertanyaan */}
                        {questions.map((q, idx) => (
                            <div
                                key={q.id}
                                className="border border-green-200 rounded-xl p-5 mb-4 bg-green-50/50 relative"
                            >
                                <div className="flex justify-between items-start">
                                    <h3 className="font-semibold mb-3 text-green-700">
                                        Pertanyaan {idx + 1}
                                    </h3>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() =>
                                                document.getElementById(`qimg-${q.id}`).click()
                                            }
                                            className="p-2 hover:bg-green-100 rounded-lg"
                                        >
                                            <ImageIcon className="w-5 h-5 text-green-700" />
                                        </button>
                                        <button
                                            onClick={() => duplicateQuestion(q.id)}
                                            className="p-2 hover:bg-green-100 rounded-lg"
                                        >
                                            <Copy className="w-5 h-5 text-green-700" />
                                        </button>
                                        <button
                                            onClick={() => deleteQuestion(q.id)}
                                            className="p-2 hover:bg-green-100 rounded-lg"
                                        >
                                            <Trash2 className="w-5 h-5 text-red-600" />
                                        </button>
                                    </div>
                                </div>

                                {/* Input teks pertanyaan */}
                                <input
                                    type="text"
                                    placeholder="Masukkan pertanyaan"
                                    value={q.text}
                                    onChange={(e) => handleQuestionChange(q.id, e.target.value)}
                                    className="w-full border border-green-200 rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
                                />

                                {/* Hidden input file */}
                                <input
                                    type="file"
                                    id={`qimg-${q.id}`}
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) =>
                                        handleQuestionImageUpload(q.id, e.target.files[0])
                                    }
                                />
                                {q.image && (
                                    <img
                                        src={URL.createObjectURL(q.image)}
                                        alt="Preview"
                                        className="w-32 h-32 object-cover rounded-lg mb-3 border"
                                    />
                                )}

                                {/* Opsi jawaban */}
                                {q.options.map((opt, i) => (
                                    <div key={i} className="flex items-start gap-3 mb-3">
                                        <input type="radio" disabled className="mt-3 text-green-500" />
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                placeholder={`Pilihan ${i + 1}`}
                                                value={opt.text}
                                                onChange={(e) =>
                                                    handleOptionChange(q.id, i, e.target.value)
                                                }
                                                className="w-full border border-green-200 rounded-lg p-3 mb-2 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
                                            />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                id={`optimg-${q.id}-${i}`}
                                                onChange={(e) =>
                                                    handleOptionImageUpload(q.id, i, e.target.files[0])
                                                }
                                            />
                                            <button
                                                onClick={() =>
                                                    document.getElementById(`optimg-${q.id}-${i}`).click()
                                                }
                                                className="text-xs text-green-600 hover:underline"
                                            >
                                                + Tambah gambar
                                            </button>
                                            {opt.image && (
                                                <img
                                                    src={URL.createObjectURL(opt.image)}
                                                    alt="Preview opsi"
                                                    className="w-24 h-24 object-cover rounded-lg mt-2 border"
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}

                                <button
                                    onClick={() => addOption(q.id)}
                                    className="text-sm text-green-600 hover:underline mt-2"
                                >
                                    + Tambah pilihan
                                </button>
                            </div>
                        ))}

                        {/* Tambah Pertanyaan */}
                        <button
                            onClick={addQuestion}
                            className="w-full border-2 border-dashed border-green-300 rounded-xl py-3 text-green-600 hover:bg-green-50 transition mb-6"
                        >
                            + Tambah Pertanyaan
                        </button>

                        {/* Action */}
                        <div className="flex justify-between">
                            <button
                                onClick={() => setIsCreateMode(false)}
                                className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300 transition"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleAddPostTest}
                                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition shadow-md"
                            >
                                Publish
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* Back */}
            <button
                onClick={() => (window.location.href = "/admin")}
                className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-blue-700"
            >
                <ArrowLeft className="inline-block w-5 h-5 mr-2" />
                Back
            </button>
        </div>
    );
}
