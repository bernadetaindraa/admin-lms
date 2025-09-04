"use client";

import { useRouter } from "next/navigation";
import {
    BookOpen,
    Video,
    FileText,
    LayoutDashboard,
    LogOut,
    Users,
    Settings,
    MessageCircle,
} from "lucide-react";

export default function AdminDashboard() {
    const router = useRouter();

    return (
        <div className="font-sans flex flex-col min-h-screen bg-white text-sm text-gray-800">

            <div className="flex flex-1">
                {/* Left Sidebar */}
                <aside className="w-56 bg-white p-4 flex flex-col shadow-sm">
                    <nav className="space-y-1 flex-1">
                        {[
                            { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
                            { label: "Learning Materials", icon: BookOpen, path: "/admin/materi" },
                            { label: "Learning Videos", icon: Video, path: "/admin/video" },
                            { label: "Post-test", icon: FileText, path: "/admin/posttest" },
                            { label: "Participants", icon: Users, path: "/admin/peserta" },
                            { label: "Messages", icon: MessageCircle, path: "/admin/messages/create" },
                            { label: "Settings", icon: Settings, path: "/admin/settings" },
                        ].map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => router.push(item.path)}
                                className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                            >
                                <item.icon size={18} className="text-[#609966]" /> {item.label}
                            </button>
                        ))}
                        <button className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition">
                            <LogOut size={18} /> Logout
                        </button>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8 bg-white">
                    {/* Action Buttons */}
                    <div className="grid grid-cols-3 gap-6 mb-10">
                        {[
                            { label: "Add Material", icon: BookOpen, path: "/admin/materi/create" },
                            { label: "Add Video", icon: Video, path: "/admin/video/create" },
                            { label: "Add Post-test", icon: FileText, path: "/admin/posttest/create" },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                onClick={() => router.push(item.path)}
                                className="bg-white p-6 rounded-xl flex flex-col items-center justify-center shadow-sm hover:shadow-md cursor-pointer hover:bg-gray-50 transition"
                            >
                                <item.icon size={34} className="text-[#609966]" />
                                <p className="mt-2 font-medium text-gray-700 text-sm">
                                    {item.label}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Participants List */}
                    <section className="bg-white rounded-xl shadow-sm p-6 mb-10">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Participants List
                            </h2>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Search participant..."
                                    className="border rounded-md px-2 py-1 text-gray-700 text-xs focus:outline-[#609966]"
                                />
                                <select className="border rounded-md px-2 py-1 text-gray-700 text-xs focus:outline-[#609966]">
                                    <option value="">Filter</option>
                                    <option value="premium">Premium</option>
                                    <option value="basic">Basic</option>
                                </select>
                            </div>
                        </div>

                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr className="bg-gray-100 text-left text-gray-700">
                                    <th className="p-2 text-center">Participant</th>
                                    <th className="p-2 text-center">Subscription</th>
                                    <th className="p-2 text-center">Start</th>
                                    <th className="p-2 text-center">End</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b hover:bg-gray-50">
                                    <td className="p-2 flex items-center gap-2">
                                        <img src="/avatar1.png" alt="participant" className="w-8 h-8 rounded-full" />
                                        <span className="text-gray-800">Budi Santoso</span>
                                    </td>
                                    <td className="p-2 text-[#609966] font-medium">Premium</td>
                                    <td className="p-2">Jan 01, 2025</td>
                                    <td className="p-2">Jan 01, 2026</td>
                                </tr>
                                <tr className="border-b hover:bg-gray-50">
                                    <td className="p-2 flex items-center gap-2">
                                        <img src="/avatar2.png" alt="participant" className="w-8 h-8 rounded-full" />
                                        <span className="text-gray-800">Siti Aminah</span>
                                    </td>
                                    <td className="p-2 text-yellow-600 font-medium">Basic</td>
                                    <td className="p-2">Feb 15, 2025</td>
                                    <td className="p-2">Aug 15, 2025</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                </main>

                {/* Right Sidebar */}
                <aside className="w-72 bg-white p-5 space-y-6">
                    {[
                        {
                            title: "Uploaded Materials",
                            icon: BookOpen,
                            items: [
                                { chapter: "Chapter I", name: "Basic Anatomy.pdf", date: "Jan 01, 2025" },
                                { chapter: "Chapter II", name: "Advanced Pharmacology.pdf", date: "Jan 05, 2025" },
                            ],
                        },
                        {
                            title: "Uploaded Videos",
                            icon: Video,
                            items: [
                                { chapter: "Chapter I", name: "Introduction to Anatomy.mp4", date: "Jan 02, 2025" },
                                { chapter: "Chapter II", name: "Basic Pharmacology.mp4", date: "Jan 08, 2025" },
                            ],
                        },
                        {
                            title: "Uploaded Post-tests",
                            icon: FileText,
                            items: [
                                { chapter: "Chapter I", name: "Anatomy Post-test", date: "Jan 03, 2025" },
                                { chapter: "Chapter II", name: "Pharmacology Post-test", date: "Jan 10, 2025" },
                            ],
                        },
                    ].map((section, idx) => (
                        <div key={idx}>
                            <h2 className="text-sm font-semibold mb-2 text-gray-800 flex items-center gap-2 border-b pb-1">
                                <section.icon size={16} className="text-[#609966]" />
                                {section.title}
                            </h2>
                            <ul className="space-y-1 pl-2">
                                {section.items.map((item, i) => (
                                    <li key={i} className="text-xs text-gray-700">
                                        <span className="font-semibold">{item.chapter}:</span> {item.name}
                                        <span className="block text-[11px] text-gray-500 ml-2">Uploaded: {item.date}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className="mt-2 w-full bg-[#609966] hover:bg-[#4d7c52] text-white py-1.5 rounded-md text-xs transition">
                                View all
                            </button>
                        </div>
                    ))}
                </aside>
            </div>
        </div>
    );
} 