"use client";

import { useState } from "react";
import { Search, Filter, Trash2, Edit, ArrowLeft, Video } from "lucide-react";

export default function VideoPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [videoList, setVideoList] = useState([]);
    const [search, setSearch] = useState("");

    const handleAddVideo = () => {
        if (!title || !description) return;
        const newVideo = {
            id: Date.now(),
            title,
            description,
            fileType: "MP4",
            size: "15 MB",
            duration: "10:25",
        };
        setVideoList([...videoList, newVideo]);
        setTitle("");
        setDescription("");
    };

    const handleDelete = (id) => {
        setVideoList(videoList.filter((v) => v.id !== id));
    };

    const filteredVideo = videoList.filter((v) =>
        v.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6 text-gray-800 font-[Poppins] text-sm">
            {/* Header */}
            <h1 className="text-2xl font-semibold mb-6">🎥 Manage Videos</h1>

            {/* Form Input */}
            <div className="bg-white p-6 rounded-2xl shadow-sm mb-6">
                {/* Drag & Drop */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center text-gray-500 mb-6 cursor-pointer hover:bg-gray-100/50 text-sm transition">
                    🎬 Drag & drop video file <br />
                    <span className="text-xs text-gray-400">or click to select file</span>
                </div>

                {/* Inputs */}
                <div className="space-y-3">
                    <input
                        type="text"
                        placeholder="Video Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border-0 rounded-xl px-4 py-2 bg-gray-100 focus:ring-2 focus:ring-green-400 outline-none text-sm shadow-sm"
                    />
                    <textarea
                        placeholder="Video Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border-0 rounded-xl px-4 py-2 bg-gray-100 focus:ring-2 focus:ring-green-400 outline-none text-sm shadow-sm"
                    />
                    <button
                        onClick={handleAddVideo}
                        className="bg-green-500 text-white px-5 py-2 rounded-xl hover:bg-green-600 transition shadow-md text-sm"
                    >
                        Add Video
                    </button>
                </div>
            </div>

            {/* Search & Filter */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm w-64">
                    <Search className="w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="outline-none bg-transparent flex-1 text-sm"
                    />
                </div>
                <button className="flex items-center gap-1 bg-white px-4 py-2 rounded-xl shadow-sm hover:bg-gray-100 transition text-sm">
                    <Filter className="w-4 h-4" /> Filter
                </button>
            </div>

            {/* Video List */}
            <div className="space-y-3">
                {filteredVideo.map((v) => (
                    <div
                        key={v.id}
                        className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between hover:shadow-md transition"
                    >
                        {/* Left content */}
                        <div className="flex items-center gap-3">
                            <Video className="w-6 h-6 text-blue-500" />
                            <div>
                                <div className="font-medium text-gray-900">{v.title}</div>
                                <div className="text-xs text-gray-500">{v.description}</div>
                                <div className="text-xs text-gray-400 mt-1">
                                    {v.fileType} • {v.size} • {v.duration}
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                            <button className="p-2 rounded-lg hover:bg-gray-100 transition">
                                <Edit className="w-4 h-4 text-gray-600" />
                            </button>
                            <button
                                onClick={() => handleDelete(v.id)}
                                className="p-2 rounded-lg hover:bg-red-50 transition"
                            >
                                <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                        </div>
                    </div>
                ))}

                {filteredVideo.length === 0 && (
                    <div className="text-center text-gray-500 py-10 bg-white rounded-xl shadow-sm">
                        No videos yet.
                    </div>
                )}
            </div>

            {/* Back Button */}
            <button
                onClick={() => (window.location.href = "/admin")}
                className="fixed bottom-6 right-6 bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-blue-700 flex items-center gap-2 text-sm"
            >
                <ArrowLeft className="w-4 h-4" />
                Back
            </button>
        </div>
    );
}
