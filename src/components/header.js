"use client";

export default function Header() {
    return (
        <header className="flex items-center justify-between px-6 py-4 shadow-sm bg-white">
            <h1 className="text-xl font-bold text-black">LMS Kedokteran UGM</h1>
            <div className="flex flex-col text-right">
                <span className="font-medium text-base text-black">Adaline Azzahra</span>
                <span className="text-xs text-gray-500">Admin</span>
            </div>
        </header>
    );
}

