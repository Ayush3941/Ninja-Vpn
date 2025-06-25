"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HttpAgent, Actor } from '@dfinity/agent';
import { idlFactory } from '../../../declarations/node1/node1.did.js';
const node1Actor = "owyeu-jiaaa-aaaam-qdvwq-cai";
export default function DashboardPage() {
  const [url, setUrl] = useState("https://ipinfo.io/json");
  const [responseHtml, setResponseHtml] = useState("");
  const [loading, setLoading] = useState(false);


  const callHello = async () => {
    const agent = new HttpAgent({ host: 'https://icp0.io' });

    const node1 = Actor.createActor(idlFactory, {
      agent,
      canisterId: node1Actor,
    });

    const result = await node1.hello_world();
    alert(result);
  };


 const fetchPage = async () => {
  setLoading(true);
  try {
    const agent = new HttpAgent({ host: 'https://icp0.io' });

    const node1 = Actor.createActor(idlFactory, {
      agent,
      canisterId: node1Actor,
    });

    // Encode URL to Base64
    const encoded = Buffer.from(url, "utf-8").toString("base64");
    console.log("Encoded URL:", encoded);

    const requestArgs = {
      url: "/?url=" + encoded,
      method: { get: null },
      headers: [],
      body: [],
      max_response_bytes: [4194304],
      transform: [],
    };

    const result = await node1.http_request(requestArgs);
    console.log(result)
    // Decode the Vec<nat8> body into text
    const decoder = new TextDecoder("utf-8");

    const html = decoder.decode(new Uint8Array(result.body));

    setResponseHtml(html);
  } catch (err) {
    console.error("ICP call error:", err);
    setResponseHtml("<h1>Error loading page.</h1>");
  } finally {

    setLoading(false);
  }
};




  useEffect(() => {
    document.title = "Ninja VPN – Dashboard";
  }, []);

  return (
    <main className="min-w-[340px] min-h-screen bg-black text-white font-sans px-4 sm:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-6xl mx-auto space-y-8"
      >
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            VPN Control Center
          </h1>
          <div className="flex flex-1 gap-2">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter a URL to browse privately"
              className="w-full bg-gray-900 text-white px-4 py-2 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={fetchPage}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl font-semibold transition"
            >
              Browse
            </button>
          </div>
        </div>

        {/* VPN Browser Window */}
        {/* VPN Browser Window */}
<motion.div
  initial={{ opacity: 0, scale: 0.97 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: 0.2, duration: 0.5 }}
  className="w-full h-[100vh] bg-gray-950/70 backdrop-blur-lg border border-gray-800 shadow-2xl shadow-purple-900 rounded-2xl overflow-hidden relative"
>
  <div className="px-4 py-2 bg-gray-900 border-b border-gray-700 flex items-center justify-between">
    <span className="text-sm text-purple-300">Secure VPN Window</span>
    <span className="text-xs text-gray-500">ICP Node Proxy Active</span>
  </div>

  {/* Make iframe area have white bg so it's neutral */}
  <div className="h-full w-full overflow-hidden bg-white text-black">
    {loading ? (
      <div className="flex items-center justify-center h-full text-purple-600 text-lg">
        Fetching content...
      </div>
    ) : (
      <iframe
        srcDoc={responseHtml}
        style={{ width: "100%", height: "100%", border: "none" }}
        sandbox="allow-scripts allow-same-origin"
      />
    )}
  </div>
</motion.div>


        {/* Bottom Info */}
        <div className="text-center text-sm text-gray-500">
        
          Ninja VPN uses decentralized canisters on the Internet Computer to
          route and anonymize your browsing traffic. No logs. No leaks. Just raw
          freedom.
        </div>
      </motion.div>
    </main>
  );
}
