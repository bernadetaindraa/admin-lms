"use client";

import { useState } from "react";

export default function PosttestPage() {
    const [tests, setTests] = useState([
        { id: 1, name: "Anatomy Test", questions: 20, createdAt: "Jan 01, 2025" },
        { id: 2, name: "Pharmacology Test", questions: 15, createdAt: "Jan 05, 2025" },
    ]);

    const handleStart = (name) => {
        alert(`Starting ${name}`);
    };

    const handleEdit = (name) => {
        alert(`Editing ${name}`);
    };

    const handleDelete = (id) => {
        setTests(tests.filter((t) => t.id !== id));
    };

    const handleAdd = () => {
        const newTest = {
            id: Date.now(),
            name: "New Test",
            questions: 10,
            createdAt: new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }),
        };
        setTests([...tests, newTest]);
    };

    return (
        <div className="font-sans flex flex-col min-h-screen bg-white text-sm text-gray-800 p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-lg font-semibold text-gray-800">Post-tests</h1>
                <button
                    onClick={handleAdd}
                    className="px-4 py-2 bg-[#609966] hover:bg-[#4d7c52] text-white rounded-lg text-xs transition"
                >
                    + Add Post-test
                </button>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tests.map((t) => (
                    <div
                        key={t.id}
                        className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition"
                    >
                        <h2 className="text-base font-semibold text-gray-800">{t.name}</h2>
                        <p className="text-xs text-gray-500 mb-3">
                            {t.questions} Questions • Uploaded {t.createdAt}
                        </p>

                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => handleStart(t.name)}
                                className="px-3 py-1 rounded-md border text-[#609966] hover:bg-[#e6f0ea] text-xs transition"
                            >
                                Start
                            </button>
                            <button
                                onClick={() => handleEdit(t.name)}
                                className="px-3 py-1 rounded-md border text-blue-600 hover:bg-blue-50 text-xs transition"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(t.id)}
                                className="px-3 py-1 rounded-md border text-red-600 hover:bg-red-50 text-xs transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}

                {tests.length === 0 && (
                    <p className="col-span-full text-center text-gray-500 text-xs">
                        No post-tests available yet.
                    </p>
                )}
            </div>
            <button
                onClick={() => (window.location.href = "/admin")}
                className="fixed bottom-6 right-6 bg-[#609966] text-white px-5 py-3 rounded-full shadow-lg hover:bg-[#4d7c52] flex items-center gap-2 text-sm"
            >
                Back
            </button>
        </div>
    );
}
