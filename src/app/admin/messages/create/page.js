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
        <div className="flex h-screen bg-gray-50 font-[Poppins] text-gray-800 text-sm">
            {/* Sidebar */}
            <div className="w-72 bg-white shadow-md flex flex-col">
                {/* Header */}
                <div className="p-4 flex items-center justify-between border-b">
                    <div className="flex items-center gap-2 font-semibold text-sm">
                        <MessageSquare className="w-4 h-4 text-[#9DC08B]" /> Messages
                    </div>
                    <Link href="/admin" className="hover:opacity-70">
                        <ArrowLeft className="w-4 h-4 text-gray-600" />
                    </Link>
                </div>

                {/* Search */}
                <div className="p-3">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-lg px-3 py-2 text-xs bg-gray-100 focus:ring-2 focus:ring-[#9DC08B] outline-none"
                    />
                </div>

                {/* Chapters */}
                <div className="flex-1 overflow-y-auto">
                    {Object.keys(chatData).map((bab, idx) => {
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
                                className={`p-3 cursor-pointer flex items-center gap-3 hover:bg-gray-100 transition ${selectedBab === bab ? "bg-gray-100 font-medium" : ""
                                    }`}
                            >
                                <BookOpen className="w-4 h-4 text-[#9DC08B]" />
                                <div className="flex-1 min-w-0">
                                    <div className="truncate text-sm">{bab}</div>
                                    <div className="text-xs text-gray-500 truncate">
                                        {lastMsg || "No messages yet"}
                                    </div>
                                </div>
                                <ArrowRight className="w-3 h-3 text-gray-400" />
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
                        <div className="flex items-center justify-between p-4 bg-white shadow-sm">
                            <h2 className="font-medium text-sm flex items-center gap-2">
                                <BookOpen className="w-4 h-4 text-[#9DC08B]" /> {selectedBab}
                            </h2>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-6 overflow-y-auto space-y-3 bg-gray-50 text-sm">
                            {chatData[selectedBab].map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === "you" ? "justify-end" : "justify-start"}`}
                                >
                                    <div className={`flex items-end gap-2 max-w-xs ${msg.sender === "you" ? "flex-row-reverse" : "flex-row"}`}>
                                        <User
                                            className={`w-5 h-5 ${msg.sender === "you"
                                                    ? "text-[#9DC08B]"
                                                    : msg.sender === "admin"
                                                        ? "text-red-400"
                                                        : "text-gray-400"
                                                }`}
                                        />
                                        <div
                                            className={`px-3 py-2 rounded-lg text-xs shadow-sm ${msg.sender === "you"
                                                    ? "bg-[#9DC08B] text-white"
                                                    : msg.sender === "admin"
                                                        ? "bg-[#9DC08B]/20 text-gray-800"
                                                        : "bg-gray-200 text-gray-800"
                                                }`}
                                        >
                                            <div>{msg.text}</div>
                                            <div className="text-[10px] text-gray-500 mt-1 text-right">{msg.time}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-3 bg-white flex items-center gap-2 shadow-sm">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="flex-1 rounded-lg px-3 py-2 text-sm bg-gray-100 focus:ring-2 focus:ring-[#9DC08B] outline-none"
                            />
                            <button
                                onClick={handleSend}
                                className="bg-[#9DC08B] text-white p-2 rounded-lg hover:bg-[#8AB576] transition"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
                        Select a chapter to start chatting
                    </div>
                )}
            </div>
        </div>
    );
}
