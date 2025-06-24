"use client";
import Link from 'next/link';



import { useEffect } from "react";
import { motion } from "framer-motion";

export default function HomePage() {
  useEffect(() => {
    document.title = "Ninja VPN – Future of Private Browsing";
  }, []);

  return (
    <main className="min-h-[60vh] bg-black text-white font-sans flex items-center justify-center px-20 sm:px-6 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="min-w-[320px] relative bg-gray-950/70 backdrop-blur-md border border-gray-800 shadow-2xl shadow-purple-900 rounded-3xl px-4 py-6 w-full max-w-3xl text-center"
      >
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
          Ninja VPN
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-gray-300">
          Experience private, decentralized browsing powered by the Internet Computer Protocol (ICP).
        </p>
        <p className="mt-3 text-sm text-gray-400">
          No tracking. No compromise. Just pure freedom across the web.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/Usage" className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-md transition-all duration-300"
>
          Usage
        </Link>

         
          <Link
          href="/Dashboard"
            
            className="px-6 py-3 border border-purple-600 text-purple-700 hover:bg-purple-800/20 rounded-xl transition-all duration-300"
          >
          Enter Dashboard
        </Link>
          
        </div>

        
      </motion.div>
    </main>
  );
}
