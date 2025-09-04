"use client";

import { useState } from "react";
import { Search, Filter, Trash2, Edit, ArrowLeft, FileText } from "lucide-react";

export default function MateriPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [materialList, setMaterialList] = useState([]);
    const [search, setSearch] = useState("");

    const handleAddMaterial = () => {
        if (!title || !description) return;
        const newMaterial = {
            id: Date.now(),
            title,
            description,
            fileType: "PDF",
            fileSize: "1.2 MB",
        };
        setMaterialList([...materialList, newMaterial]);
        setTitle("");
        setDescription("");
    };

    const handleDelete = (id) => {
        setMaterialList(materialList.filter((m) => m.id !== id));
    };

    const filteredMaterial = materialList.filter((m) =>
        m.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-white p-6 text-gray-800 font-[Poppins] text-sm">
            {/* Header */}
            <h1 className="text-2xl font-bold mb-6 text-gray-900">
                📚 Manage Materials
            </h1>

            {/* Form Input */}
            <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
                {/* Drag & Drop */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center text-gray-500 mb-6 cursor-pointer hover:bg-gray-50 text-sm transition">
                    ➕ Drag & drop material file <br />
                    <span className="text-xs text-gray-400">or click to select file</span>
                </div>

                {/* Inputs */}
                <div className="space-y-3">
                    <input
                        type="text"
                        placeholder="Material Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full rounded-xl px-4 py-2 bg-white border border-gray-300 focus:ring-2 focus:ring-[#609966] outline-none text-sm shadow-sm"
                    />
                    <textarea
                        placeholder="Material Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full rounded-xl px-4 py-2 bg-white border border-gray-300 focus:ring-2 focus:ring-[#609966] outline-none text-sm shadow-sm"
                    />
                    <button
                        onClick={handleAddMaterial}
                        className="bg-[#609966] text-white px-5 py-2 rounded-xl hover:bg-[#4d7c52] transition shadow-md text-sm"
                    >
                        Add Material
                    </button>
                </div>
            </div>

            {/* Search & Filter */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-xl shadow-sm w-64">
                    <Search className="w-4 h-4 text-[#609966]" />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="outline-none bg-transparent flex-1 text-sm"
                    />
                </div>
                <button className="flex items-center gap-1 bg-white border border-gray-300 px-4 py-2 rounded-xl shadow-sm hover:bg-gray-50 transition text-sm">
                    <Filter className="w-4 h-4 text-[#609966]" /> Filter
                </button>
            </div>

            {/* Material List */}
            <div className="space-y-3">
                {filteredMaterial.map((m) => (
                    <div
                        key={m.id}
                        className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between hover:shadow-md transition"
                    >
                        {/* Left content */}
                        <div className="flex items-center gap-3">
                            <FileText className="w-6 h-6 text-[#609966]" />
                            <div>
                                <div className="font-medium text-gray-900">{m.title}</div>
                                <div className="text-xs text-gray-600">{m.description}</div>
                                <div className="text-xs text-gray-400 mt-1">
                                    {m.fileType} • {m.fileSize}
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                            <button className="p-2 rounded-lg hover:bg-gray-50 transition">
                                <Edit className="w-4 h-4 text-[#609966]" />
                            </button>
                            <button
                                onClick={() => handleDelete(m.id)}
                                className="p-2 rounded-lg hover:bg-red-50 transition"
                            >
                                <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                        </div>
                    </div>
                ))}

                {filteredMaterial.length === 0 && (
                    <div className="text-center text-gray-500 py-10 bg-gray-50 rounded-xl shadow-sm">
                        No materials yet.
                    </div>
                )}
            </div>

            {/* Back Button */}
            <button
                onClick={() => (window.location.href = "/admin")}
                className="fixed bottom-6 right-6 bg-[#609966] text-white px-5 py-3 rounded-full shadow-lg hover:bg-[#4d7c52] flex items-center gap-2 text-sm"
            >
                <ArrowLeft className="w-4 h-4" />
                Back
            </button>
        </div>
    );
}
