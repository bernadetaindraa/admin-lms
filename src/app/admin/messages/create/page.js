"use client";

import { useState } from "react";
import { Send, ArrowLeft, BookOpen, User, MessageSquare, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ChatPage() {
    const [selectedBab, setSelectedBab] = useState(null);
    const [message, setMessage] = useState("");
    const [search, setSearch] = useState("");
    const [chatData, setChatData] = useState({
        Bab1: [{ id: 1, sender: "admin", text: "Halo semua, ini Bab 1", time: "12:00" }],
        Bab2: [{ id: 2, sender: "user1", text: "Ada yang bisa bantu jelasin?", time: "12:05" }],
        Bab3: [],
        Bab4: [],
    });

    const handleSend = () => {
        if (!message || !selectedBab) return;

        const newMsg = {
            id: Date.now(),
            sender: "you",
            text: message,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        setChatData((prev) => ({
            ...prev,
            [selectedBab]: [...prev[selectedBab], newMsg],
        }));

        setMessage("");
    };

    return (
        <div className="flex h-screen bg-gray-50 font-[Poppins] text-gray-900">
            {/* Sidebar Bab */}
            <div className="w-80 bg-white shadow-sm flex flex-col transition-all duration-300">
                {/* Header sidebar */}
                <div className="p-6 font-semibold text-xl bg-[#9DC08B] text-white flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5" /> Messages
                    </div>
                    <Link href="/admin" className="hover:opacity-80">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                </div>

                {/* Search box */}
                <div className="p-3 border-b">
                    <input
                        type="text"
                        placeholder="Search messages..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border rounded-md px-3 py-2 text-sm bg-gray-50 focus:ring-2 focus:ring-[#9DC08B] outline-none"
                    />
                </div>

                {/* List Bab */}
                <div className="flex-1 overflow-y-auto">
                    {Object.keys(chatData).map((bab, idx) => {
                        // filter berdasarkan search
                        const lastMsg = chatData[bab][chatData[bab].length - 1]?.text || "";
                        if (
                            search &&
                            !bab.toLowerCase().includes(search.toLowerCase()) &&
                            !lastMsg.toLowerCase().includes(search.toLowerCase())
                        ) {
                            return null;
                        }

                        return (
                            <div
                                key={idx}
                                onClick={() => setSelectedBab(bab)}
                                className={`p-4 cursor-pointer flex items-center gap-3 hover:bg-gray-100 transition-colors duration-200 ${selectedBab === bab ? "bg-[#9DC08B]/10 font-medium" : ""
                                    }`}
                            >
                                <BookOpen className="w-5 h-5 text-[#9DC08B]" />
                                <div className="flex-1">
                                    <div className="text-base">{bab}</div>
                                    <div className="text-xs text-gray-600 truncate mt-1">
                                        {lastMsg || "No messages yet"}
                                    </div>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-400" />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
                {selectedBab ? (
                    <>
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 bg-white shadow-sm">
                            <h2 className="font-semibold text-xl flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-[#9DC08B]" /> {selectedBab}
                            </h2>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50">
                            {chatData[selectedBab].map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === "you" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`flex items-end gap-2 max-w-sm ${msg.sender === "you" ? "flex-row-reverse" : "flex-row"
                                            }`}
                                    >
                                        <User
                                            className={`w-6 h-6 ${msg.sender === "you"
                                                    ? "text-[#9DC08B]"
                                                    : msg.sender === "admin"
                                                        ? "text-red-500"
                                                        : "text-gray-500"
                                                }`}
                                        />
                                        <div
                                            className={`px-4 py-2 rounded-lg shadow-sm ${msg.sender === "you"
                                                    ? "bg-[#9DC08B] text-white"
                                                    : msg.sender === "admin"
                                                        ? "bg-[#9DC08B]/20 text-gray-900"
                                                        : "bg-gray-200 text-gray-900"
                                                }`}
                                        >
                                            <div className="text-sm">{msg.text}</div>
                                            <div className="text-xs text-gray-600 mt-1 text-right">{msg.time}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Chat */}
                        <div className="p-4 bg-white shadow-sm flex items-center">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="flex-1 border-none rounded-md px-4 py-2 bg-gray-100 focus:ring-2 focus:ring-[#9DC08B] outline-none transition-all duration-200"
                            />
                            <button
                                onClick={handleSend}
                                className="ml-2 bg-[#9DC08B] text-white p-2 rounded-md hover:bg-[#8AB576] transition-colors duration-200"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-600 text-lg">
                        Select a chapter to start chatting
                    </div>
                )}
            </div>
        </div>
    );
}
