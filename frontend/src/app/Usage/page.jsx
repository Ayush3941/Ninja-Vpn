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
      Introducing NinjaVPN: Programmable Privacy on Web3
    </h2>

    <div className="flex justify-center mb-8">
  <div className="w-full max-w-[640px] aspect-video">
    <iframe
      className="w-full h-full rounded-xl shadow-lg border border-purple-500"
      src="https://www.youtube.com/embed/OcUZ42AAD9U?si=WXWBcZzOVogN1oZy"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  </div>
</div>
        <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
      Traditional VPNs rely on centralized servers and blind trust — with no way to verify how your data is handled. Tor tried to fix that with decentralization, but it's too slow for real-world use. NinjaVPN changes the game.
    </p>

    <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
      Built on the Internet Computer, NinjaVPN splits each webpage into 2MB chunks. Each chunk travels through its own three-node, encrypted path made of on-chain canisters — like having N parallel Tor tunnels. All programmable. All verifiable.
    </p>

    <p className="text-gray-400 text-sm">
      This is privacy as code. Composable, scalable, and serverless — by design.
    </p>

    <h3 className="text-2xl sm:text-3xl font-bold text-purple-400 mt-10">🧪 Miniature Architecture: Live Prototype</h3>
<p className="text-gray-300 mt-2 mb-4">
  Here’s what I’ve built with the limited cycles I was allotted — a working single-chain prototype of NinjaVPN using 3 on-chain canisters:
</p>

<ul className="list-disc list-inside text-gray-300 space-y-3 pl-2">
  <li>
    <strong>Node 1 – Entry Canister:</strong> Accepts a Base64-encoded URL input from the frontend.
    <br />
    <a href="https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=owyeu-jiaaa-aaaam-qdvwq-cai" target="_blank" className="text-purple-400 underline">View Node 1</a>
  </li>
  <li>
    <strong>Node 2 – Middle Relay Canister:</strong> Forwards the decoded URL to Node 3.
    <br />
    <a href="https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=o73pi-7aaaa-aaaam-qdvxa-cai" target="_blank" className="text-purple-400 underline">View Node 2</a>
  </li>
  <li>
    <strong>Node 3 – Exit Proxy Canister:</strong> Calls a Fly.io backend to complete the HTTP request.
    <br />
    <a href="https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=oy2j4-syaaa-aaaam-qdvxq-cai" target="_blank" className="text-purple-400 underline">View Node 3</a>
  </li>
</ul>

<p className="mt-4 text-gray-300">
  🔗 Try the live frontend:
  <a href="https://37le5-2yaaa-aaaam-qdwhq-cai.icp0.io/" target="_blank" className="text-purple-400 underline ml-2">Frontend Canister</a>
</p>

    <h3 className="text-2xl sm:text-3xl font-bold text-purple-400 mt-8">
      ⚡ Four Reasons NinjaVPN Wins
    </h3>
    <ul className="list-disc list-inside text-gray-300 space-y-2 pl-2">
      <li>
        <strong>Massively Scalable:</strong> Every new user or request can spawn new chains — more traffic means more nodes.
      </li>
      <li>
        <strong>Fully Programmable:</strong> Auth, rate limits, geo-filters — all customizable via Motoko logic.
      </li>
      <li>
        <strong>Trustless by Default:</strong> Logs and routing are on-chain — users trust verifiable code, not companies.
      </li>
      <li>
        <strong>Resistant to Censorship:</strong> No single point of failure — decentralized compute with optional peer relays.
      </li>
    </ul>

    <p className="mt-6 text-gray-400 text-sm text-center">
      Even this tiny prototype proves it works — now imagine 1,000+ nodes, swarm-routed, and ready for scale.
    </p>

    <div className="mt-8 text-center">
      <Link href="/Dashboard" className="px-6 py-3 border border-purple-600 text-purple-700 hover:bg-purple-800/20 rounded-xl transition-all duration-300">
        Launch Dashboard
      </Link>
    </div>

    <div className="absolute bottom-4 right-6 text-xs text-purple-300">
      IEEE Hackathon • Powered by ICP and Canisters
    </div>
  </motion.div>
</main>

  );
}
