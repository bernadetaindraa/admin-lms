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
import { Poppins } from "next/font/google";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-poppins",
});

export default function AdminDashboard() {
    const router = useRouter();

    return (
        <div
            className={`${poppins.variable} font-sans flex flex-col min-h-screen bg-white text-sm text-gray-800`}
        >
            {/* Navbar */}
            <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <h1 className="text-xl font-bold text-black">LMS Kedokteran UGM</h1>
                <div className="flex flex-col text-right">
                    <span className="font-medium text-base">Adaline Azzahra</span>
                    <span className="text-xs opacity-80">Admin</span>
                </div>
            </header>

            <div className="flex flex-1">
                {/* Left Sidebar */}
                <aside className="w-60 bg-[#EDF1D6] p-4 flex flex-col border-r border-[#9DC08B]">
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
                                className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-[#9DC08B] hover:text-white transition"
                            >
                                <item.icon size={18} /> {item.label}
                            </button>
                        ))}
                        <button className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-red-600 hover:bg-red-100 transition">
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
                                className="bg-[#EDF1D6] p-6 rounded-xl flex flex-col items-center justify-center shadow hover:shadow-md cursor-pointer hover:bg-[#9DC08B] hover:text-white transition"
                            >
                                <item.icon size={34} className="text-[#609966]" />
                                <p className="mt-2 font-medium text-gray-700 text-sm">
                                    {item.label}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Participants List */}
                    <section className="bg-[#EDF1D6] rounded-xl shadow-sm border border-[#9DC08B] p-6 mb-10">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Participants List
                            </h2>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Search participant..."
                                    className="border border-[#9DC08B] rounded-md px-2 py-1 text-gray-700 text-xs focus:outline-[#609966]"
                                />
                                <select className="border border-[#9DC08B] rounded-md px-2 py-1 text-gray-700 text-xs focus:outline-[#609966]">
                                    <option value="">Filter</option>
                                    <option value="premium">Premium</option>
                                    <option value="basic">Basic</option>
                                </select>
                            </div>
                        </div>

                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr className="bg-[#9DC08B] text-left text-white">
                                    <th className="p-2">Participant</th>
                                    <th className="p-2">Subscription</th>
                                    <th className="p-2">Start</th>
                                    <th className="p-2">End</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-[#9DC08B] hover:bg-[#F9F9F9]">
                                    <td className="p-2 flex items-center gap-2">
                                        <img src="/avatar1.png" alt="participant" className="w-8 h-8 rounded-full" />
                                        <span className="text-gray-800">Budi Santoso</span>
                                    </td>
                                    <td className="p-2 text-green-700 font-medium">Premium</td>
                                    <td className="p-2">Jan 01, 2025</td>
                                    <td className="p-2">Jan 01, 2026</td>
                                </tr>
                                <tr className="border-b border-[#9DC08B] hover:bg-[#F9F9F9]">
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
                <aside className="w-72 bg-[#EDF1D6] border-l border-[#9DC08B] p-5 space-y-6">
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
                            <h2 className="text-sm font-semibold mb-2 text-gray-800 flex items-center gap-2 border-b border-[#9DC08B] pb-1">
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
                            <button className="mt-2 w-full bg-[#609966] hover:bg-[#9DC08B] text-white py-1.5 rounded-md text-xs transition">
                                View all
                            </button>
                        </div>
                    ))}
                </aside>
            </div>

            {/* Footer */}
            <footer className="bg-[#609966] text-white text-center py-3 text-xs">
                © 2025 LMS Faculty of Medicine UGM. All rights reserved.
            </footer>
        </div>
    );
}
