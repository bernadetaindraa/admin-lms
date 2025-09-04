"use client";

import { useState } from "react";

export default function PesertaPage() {
    const [participants, setParticipants] = useState([
        { id: 1, name: "Budi Santoso", subscription: "Premium" },
        { id: 2, name: "Siti Aminah", subscription: "Basic" },
    ]);

    const handleUpgrade = (id) => {
        setParticipants(
            participants.map((p) =>
                p.id === id ? { ...p, subscription: "Premium" } : p
            )
        );
    };

    const handleDelete = (id) => {
        setParticipants(participants.filter((p) => p.id !== id));
    };

    const handleAdd = () => {
        const newParticipant = {
            id: Date.now(),
            name: "New Participant",
            subscription: "Basic",
        };
        setParticipants([...participants, newParticipant]);
    };

    return (
        <div className="font-sans flex flex-col min-h-screen bg-white text-sm text-gray-800 p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg font-semibold text-gray-800">Participants</h1>
                <button
                    onClick={handleAdd}
                    className="px-4 py-2 bg-[#609966] hover:bg-[#4d7c52] text-white rounded-lg text-xs transition"
                >
                    + Add Participant
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50 text-gray-700 text-xs">
                            <th className="p-3 text-center">Nama</th>
                            <th className="p-3 text-center">Subscription</th>
                            <th className="p-3 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {participants.map((p) => (
                            <tr key={p.id} className="hover:bg-gray-50 transition">
                                <td className="p-3">{p.name}</td>
                                <td
                                    className={`p-3 font-medium ${p.subscription === "Premium"
                                        ? "text-[#609966]"
                                        : "text-yellow-600"
                                        }`}
                                >
                                    {p.subscription}
                                </td>
                                <td className="p-3 flex justify-center gap-2 text-xs">
                                    {p.subscription === "Basic" && (
                                        <button
                                            onClick={() => handleUpgrade(p.id)}
                                            className="px-2 py-1 rounded-md border text-blue-600 hover:bg-blue-50 transition"
                                        >
                                            Upgrade
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(p.id)}
                                        className="px-2 py-1 rounded-md border text-red-600 hover:bg-red-50 transition"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {participants.length === 0 && (
                            <tr>
                                <td
                                    colSpan="3"
                                    className="p-4 text-center text-gray-500 text-xs"
                                >
                                    No participants yet.
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
