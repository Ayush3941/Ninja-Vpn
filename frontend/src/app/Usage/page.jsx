"use client";
import Link from 'next/link';
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function UsagePage() {
  useEffect(() => {
    document.title = "Ninja VPN – Usage & Scalability";
  }, []);

  return (
    <main className="min-h-[60vh] bg-black text-white font-sans flex items-center justify-center px-4 sm:px-6 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="min-w-[320px] relative bg-gray-950/70 backdrop-blur-md border border-gray-800 shadow-2xl shadow-purple-900 rounded-3xl px-6 py-10 w-full max-w-4xl text-left space-y-6"
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent text-center">
          How It Works: Private Space in the Browser
        </h2>

        <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
          Ninja VPN provides a fully private and encrypted layer inside your browser — a secure tunnel where all your data is routed through decentralized ICP nodes. Every request is processed by canisters on-chain, ensuring anonymity and protection against surveillance or logging. Unlike traditional VPNs, there is no single server — just a programmable network of compute nodes.
        </p>

        <p className="text-gray-400 text-sm">
          Your browsing session lives inside a self-contained virtual private space, sandboxed from prying eyes — like a stealth shell around your data.
        </p>

        <h3 className="text-2xl sm:text-3xl font-bold text-purple-400 mt-6">
          🚀 Scalable by Design
        </h3>
        <ul className="list-disc list-inside text-gray-300 space-y-2 pl-2">
          <li>
            <strong>Serverless Growth:</strong> Canisters automatically scale to handle thousands of users with zero manual intervention.
          </li>
          <li>
            <strong>Peer-to-Peer Routing:</strong> Nodes communicate directly, no bottlenecks, no centralized handshakes.
          </li>
          <li>
            <strong>High Availability:</strong> Traffic reroutes instantly through alternate paths during load or failure.
          </li>
          <li>
            <strong>Low-Cost Operation:</strong> Powered by cycles, making hosting affordable and sustainable at scale.
          </li>
        </ul>

        <h3 className="text-2xl sm:text-3xl font-bold text-purple-400 mt-8">
          🔒 Towards an Unbreakable VPN
        </h3>
        <ul className="list-disc list-inside text-gray-300 space-y-2 pl-2">
          <li>
            <strong>Federated Nodes:</strong> Every user can run a private relay, forming a resilient network immune to takedowns.
          </li>
          <li>
            <strong>End-to-End Encryption:</strong> From your browser to canister and out again — no middleman, no leaks.
          </li>
          <li>
            <strong>Customizable Routing:</strong> Route through 3+ nodes, switch identities, or rotate sessions per minute — all controlled by code.
          </li>
          <li>
            <strong>Zero Surface Attacks:</strong> No exposed APIs or IPs. Just cryptographically sealed computation.
          </li>
        </ul>

        <p className="mt-6 text-gray-400 text-sm text-center">
          As the network grows, so does your anonymity. The more users, the stronger it becomes.
        </p>

        <div className="mt-8 text-center">
          <Link href="/Dashboard" className="px-6 py-3 border border-purple-600 text-purple-700 hover:bg-purple-800/20 rounded-xl transition-all duration-300">
          Explore the Dashboard
        </Link>
        </div>

        <div className="absolute bottom-4 right-6 text-xs text-purple-300">
          IEEE Hackathon • Powered by ICP and Canisters
        </div>
      </motion.div>
    </main>
  );
}
