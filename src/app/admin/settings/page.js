"use client";

import { Construction, Loader2 } from "lucide-react";

export default function UnderConstructionPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center p-6 bg-gray-50">
            <Construction className="w-16 h-16 text-yellow-500 animate-bounce" />
            <h1 className="text-2xl font-bold mt-4">Halaman Sedang Dalam Proses Pengerjaan</h1>
            <p className="text-gray-600 mt-2 max-w-md">
                Kami sedang bekerja untuk menyelesaikan halaman ini. Silakan kembali lagi nanti!
            </p>
            <div className="flex items-center mt-6 text-gray-500">
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                <span>Loading progress...</span>
            </div>
        </div>
    );
}
