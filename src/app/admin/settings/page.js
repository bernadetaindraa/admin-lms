"use client";

import { useState } from "react";
import {
    User,
    Lock,
    Bell,
    Save,
    Users,
    BookOpen,
    FileText,
    LayoutDashboard,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminSettings() {
    const [activeTab, setActiveTab] = useState("profile");
    const router = useRouter();

    return (
        <div className="font-sans flex min-h-screen bg-white text-sm text-gray-800">
            {/* Sidebar Navigation */}
            <aside className="w-56 bg-white p-4 flex flex-col shadow-sm">
                <nav className="space-y-1 flex-1">
                    {[
                        { label: "Dashboard", key: "dashboard", icon: LayoutDashboard, path: "/admin" },
                        { label: "Profile", key: "profile", icon: User },
                        { label: "Security", key: "security", icon: Lock },
                    ].map((item, idx) => (
                        <button
                            key={idx}
                            onClick={() =>
                                item.path ? router.push(item.path) : setActiveTab(item.key)
                            }
                            className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg transition ${activeTab === item.key
                                ? "bg-[#609966] text-white"
                                : "text-gray-700 hover:bg-gray-100"
                                }`}
                        >
                            <item.icon size={18} />
                            {item.label}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 bg-white">
                <h1 className="text-xl font-semibold mb-6 text-gray-800">
                    Admin Settings
                </h1>

                {/* Admin Info & Stats */}
                <section className="bg-white shadow-sm rounded-xl p-6 mb-8">
                    <div className="flex items-center gap-6 mb-6">
                        <img
                            src="/avatar1.png"
                            alt="admin"
                            className="w-16 h-16 rounded-full border"
                        />
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">
                                Admin UAJY
                            </h2>
                            <p className="text-gray-600 text-sm">admin@example.com</p>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-3">
                            <Users className="text-[#609966]" size={22} />
                            <div>
                                <p className="text-xs text-gray-500">Participants</p>
                                <p className="font-semibold text-gray-800">120</p>
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-3">
                            <BookOpen className="text-[#609966]" size={22} />
                            <div>
                                <p className="text-xs text-gray-500">Courses</p>
                                <p className="font-semibold text-gray-800">15</p>
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-3">
                            <FileText className="text-[#609966]" size={22} />
                            <div>
                                <p className="text-xs text-gray-500">Post-tests</p>
                                <p className="font-semibold text-gray-800">10</p>
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-3">
                            <Bell className="text-[#609966]" size={22} />
                            <div>
                                <p className="text-xs text-gray-500">Messages</p>
                                <p className="font-semibold text-gray-800">8</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tab Content */}
                {activeTab === "profile" && (
                    <div className="bg-white shadow-sm rounded-xl p-6 space-y-4">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">
                            Update Profile
                        </h2>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Name</label>
                                <input
                                    type="text"
                                    defaultValue="Admin UAJY"
                                    className="w-full border rounded-md px-3 py-2 text-sm focus:outline-[#609966]"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Email</label>
                                <input
                                    type="email"
                                    defaultValue="admin@example.com"
                                    className="w-full border rounded-md px-3 py-2 text-sm focus:outline-[#609966]"
                                />
                            </div>
                            <button className="flex items-center gap-2 bg-[#609966] hover:bg-[#4d7c52] text-white px-4 py-2 rounded-lg text-sm transition">
                                <Save size={16} /> Save Changes
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === "security" && (
                    <div className="bg-white shadow-sm rounded-xl p-6 space-y-4">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">
                            Security Settings
                        </h2>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    className="w-full border rounded-md px-3 py-2 text-sm focus:outline-[#609966]"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    className="w-full border rounded-md px-3 py-2 text-sm focus:outline-[#609966]"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    className="w-full border rounded-md px-3 py-2 text-sm focus:outline-[#609966]"
                                />
                            </div>
                            <button className="flex items-center gap-2 bg-[#609966] hover:bg-[#4d7c52] text-white px-4 py-2 rounded-lg text-sm transition">
                                <Save size={16} /> Update Password
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
