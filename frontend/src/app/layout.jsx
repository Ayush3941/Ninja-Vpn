import "./index.css"
import Link from 'next/link';
export const metadata = {
  title: "Ninja VPN",
  description: "Private browsing powered by ICP",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Meta tags, favicon, etc */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <div style={{ padding: '1rem', background: '#111', color: '#aaa' }}>
        <Link href="/">
          <h1>
          Ninja VPN
          </h1>
        </Link>
        </div>
        
        <main
          style={{
            padding: "1rem",
            minHeight: "100vh",
            backgroundImage: "url('/abra.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backdropFilter: "blur(4px)",
          }}
          className="relative z-10 text-white"
        >
          <div className="bg-black/60 rounded-xl p-6 shadow-lg">
            {children}
          </div>
        </main>


       
      </body>
    </html>
  );
}
