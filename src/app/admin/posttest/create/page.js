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
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [questions, setQuestions] = useState([
        { id: 1, text: "", image: null, options: [{ text: "", image: null }, { text: "", image: null }] },
    ]);

    const handleAddPostTest = () => {
        if (!title) return;
        const newPostTest = {
            id: Date.now(),
            title,
            description,
            questions,
        };
        setPostTests([...postTests, newPostTest]);
        resetForm();
        setIsCreateMode(false);
    };

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setQuestions([
            { id: 1, text: "", image: null, options: [{ text: "", image: null }, { text: "", image: null }] },
        ]);
    };

    const handleDelete = (id) => {
        setPostTests(postTests.filter((p) => p.id !== id));
    };

    const filtered = postTests.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
    );

    // --- Questions ---
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

    // --- Options ---
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
        <div className="min-h-screen bg-white p-6 text-gray-800 text-sm">
            {!isCreateMode ? (
                <>
                    <h1 className="text-xl font-bold mb-6">Manage Post-tests</h1>

                    {/* Add Post-test + Search */}
                    <div className="flex justify-between items-center mb-6">
                        <button
                            onClick={() => setIsCreateMode(true)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#609966] text-white hover:bg-[#4e7a52] transition shadow-md text-sm"
                        >
                            <Plus className="w-4 h-4" /> Add Post-test
                        </button>

                        <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5 bg-white shadow-sm">
                            <Search className="w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search Post-test..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="outline-none text-gray-800 text-sm"
                            />
                        </div>
                    </div>

                    {/* Post-test List */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {filtered.map((p) => (
                            <div
                                key={p.id}
                                className="bg-white shadow-md rounded-xl p-4 flex flex-col justify-between hover:shadow-lg transition"
                            >
                                <div>
                                    <h2 className="font-semibold text-base text-gray-800">{p.title}</h2>
                                    <p className="text-xs text-gray-500 mt-1">{p.description}</p>
                                </div>
                                <div className="flex gap-2 mt-3">
                                    <button className="p-1.5 rounded-lg hover:bg-gray-100">
                                        <Edit className="w-4 h-4 text-gray-700" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(p.id)}
                                        className="p-1.5 rounded-lg hover:bg-gray-100"
                                    >
                                        <Trash2 className="w-4 h-4 text-red-600" />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {filtered.length === 0 && (
                            <p className="text-gray-500 text-sm">No Post-tests yet.</p>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <h3 className="text-2xl font-bold mb-6 text-gray-800">
                        Create New Post-test
                    </h3>

                    <div className="bg-white p-6 rounded-xl shadow-md mb-6">
                        {/* Title & Description */}
                        <input
                            type="text"
                            placeholder="Post-test Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border border-gray-200 rounded-lg p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-[#609966] transition text-sm"
                        />
                        <textarea
                            placeholder="Post-test Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border border-gray-200 rounded-lg p-2 mb-5 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-[#609966] transition text-sm"
                        />

                        {/* Questions */}
                        {questions.map((q, idx) => (
                            <div
                                key={q.id}
                                className="rounded-xl p-4 mb-4 bg-gray-50 shadow-sm"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="font-medium text-[#609966]">
                                        Question {idx + 1}
                                    </h3>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => document.getElementById(`qimg-${q.id}`).click()}
                                            className="p-1.5 hover:bg-gray-100 rounded-lg"
                                        >
                                            <ImageIcon className="w-4 h-4 text-[#609966]" />
                                        </button>
                                        <button
                                            onClick={() => duplicateQuestion(q.id)}
                                            className="p-1.5 hover:bg-gray-100 rounded-lg"
                                        >
                                            <Copy className="w-4 h-4 text-[#609966]" />
                                        </button>
                                        <button
                                            onClick={() => deleteQuestion(q.id)}
                                            className="p-1.5 hover:bg-gray-100 rounded-lg"
                                        >
                                            <Trash2 className="w-4 h-4 text-red-600" />
                                        </button>
                                    </div>
                                </div>

                                <input
                                    type="text"
                                    placeholder="Enter question"
                                    value={q.text}
                                    onChange={(e) => handleQuestionChange(q.id, e.target.value)}
                                    className="w-full border border-gray-200 rounded-lg p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-[#609966] transition text-sm"
                                />

                                <input
                                    type="file"
                                    id={`qimg-${q.id}`}
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleQuestionImageUpload(q.id, e.target.files[0])}
                                />
                                {q.image && (
                                    <img
                                        src={URL.createObjectURL(q.image)}
                                        alt="Preview"
                                        className="w-28 h-28 object-cover rounded-lg mb-3 shadow"
                                    />
                                )}

                                {/* Options */}
                                {q.options.map((opt, i) => (
                                    <div key={i} className="flex items-start gap-2 mb-3">
                                        <input type="radio" disabled className="mt-2 text-[#609966]" />
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                placeholder={`Option ${i + 1}`}
                                                value={opt.text}
                                                onChange={(e) => handleOptionChange(q.id, i, e.target.value)}
                                                className="w-full border border-gray-200 rounded-lg p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-[#609966] transition text-sm"
                                            />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                id={`optimg-${q.id}-${i}`}
                                                onChange={(e) => handleOptionImageUpload(q.id, i, e.target.files[0])}
                                            />
                                            <button
                                                onClick={() => document.getElementById(`optimg-${q.id}-${i}`).click()}
                                                className="text-xs text-[#609966] hover:underline"
                                            >
                                                + Add image
                                            </button>
                                            {opt.image && (
                                                <img
                                                    src={URL.createObjectURL(opt.image)}
                                                    alt="Option preview"
                                                    className="w-20 h-20 object-cover rounded-lg mt-2 shadow"
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}

                                <button
                                    onClick={() => addOption(q.id)}
                                    className="text-xs text-[#609966] hover:underline mt-1"
                                >
                                    + Add option
                                </button>
                            </div>
                        ))}

                        {/* Add Question */}
                        <button
                            onClick={addQuestion}
                            className="w-full border-2 border-dashed border-[#9DC08B] rounded-lg py-2 text-[#609966] hover:bg-green-50 transition mb-5 text-sm"
                        >
                            + Add Question
                        </button>

                        {/* Actions */}
                        <div className="flex justify-between">
                            <button
                                onClick={() => setIsCreateMode(false)}
                                className="bg-gray-200 text-gray-700 px-4 py-1.5 rounded-lg hover:bg-gray-300 transition text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddPostTest}
                                className="bg-[#609966] text-white px-5 py-1.5 rounded-lg hover:bg-[#4e7a52] transition shadow-md text-sm"
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
                className="fixed bottom-6 right-6 bg-[#609966] text-white px-4 py-2 rounded-full shadow-md hover:bg-[#4e7a52] transition text-sm"
            >
                <ArrowLeft className="inline-block w-4 h-4 mr-1" />
                Back
            </button>
        </div>
    );
}
