"use client";

import { useState } from "react";

export default function MateriPage() {
    const [materials, setMaterials] = useState([
        { id: 1, title: "Basic Anatomy", type: "PDF", date: "Jan 01, 2025" },
        { id: 2, title: "Advanced Pharmacology", type: "DOCX", date: "Jan 05, 2025" },
    ]);

    const handleAdd = () => {
        const newMaterial = {
            id: Date.now(),
            title: "New Material",
            type: "PDF",
            date: new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }),
        };
        setMaterials([...materials, newMaterial]);
    };

    const handleDelete = (id) => {
        setMaterials(materials.filter((m) => m.id !== id));
    };

    const handleView = (title) => {
        alert(`Viewing: ${title}`);
    };

    const handleEdit = (title) => {
        alert(`Editing: ${title}`);
    };

    return (
        <div className="min-h-screen bg-white text-gray-800 p-6 text-sm">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg font-semibold">Learning Materials</h1>
                <button
                    onClick={handleAdd}
                    className="px-4 py-2 bg-[#609966] hover:bg-[#4d7c52] text-white rounded-lg text-xs transition"
                >
                    + Add Material
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
                <table className="w-full text-left text-gray-800">
                    <thead>
                        <tr className="bg-gray-50 text-gray-700 text-xs">
                            <th className="p-3 text-center">Materi</th>
                            <th className="p-3 text-center">Jenis</th>
                            <th className="p-3 text-center">Tanggal Upload</th>
                            <th className="p-3 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materials.map((m) => (
                            <tr
                                key={m.id}
                                className="hover:bg-gray-50 transition"
                            >
                                <td className="p-3">{m.title}</td>
                                <td className="p-3 text-[#609966] font-medium">{m.type}</td>
                                <td className="p-3">{m.date}</td>
                                <td className="p-3 flex justify-center gap-2 text-xs">
                                    <button
                                        onClick={() => handleView(m.title)}
                                        className="px-2 py-1 rounded-md border text-gray-700 hover:bg-gray-100 transition"
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => handleEdit(m.title)}
                                        className="px-2 py-1 rounded-md border text-[#609966] hover:bg-[#e6f0ea] transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(m.id)}
                                        className="px-2 py-1 rounded-md border text-red-600 hover:bg-red-50 transition"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>

                        ))}
                        {materials.length === 0 && (
                            <tr>
                                <td colSpan="4" className="p-4 text-center text-gray-500 text-xs">
                                    No materials uploaded yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <button
                    onClick={() => (window.location.href = "/admin")}
                    className="fixed bottom-6 right-6 bg-[#609966] text-white px-5 py-3 rounded-full shadow-lg hover:bg-[#4d7c52] flex items-center gap-2 text-sm"
                >
                    Back
                </button>
            </div>
        </div>
    );
}
