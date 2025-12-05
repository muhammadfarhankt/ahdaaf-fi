"use client";

import { Search, Bell } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export const TopNav = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-6 bg-[#F0F2F5]/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search vaults, tokens, or goals..."
          className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border-none focus:ring-2 focus:ring-green-500/20 outline-none text-sm shadow-sm text-gray-600 placeholder:text-gray-400 transition-all"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-white/80 transition-colors relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#F0F2F5]"></span>
        </button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2.5 bg-[#1F854E] text-white rounded-xl font-medium text-sm shadow-lg shadow-green-900/10 hover:bg-[#156B3D] transition-colors flex items-center gap-2"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
            <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
            <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
          </svg>
          Connect Wallet
        </motion.button>

        <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-pink-500 p-[2px]">
          <div className="w-full h-full rounded-full bg-white overflow-hidden relative">
            <Image
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="User"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      </div>
    </nav>
  );
};
