"use client";

import { useState } from "react";

type Props = {
  shortUrl: string;
};

export default function ResultCard({ shortUrl }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mt-6 rounded-2xl bg-gray-950 border border-gray-800 overflow-hidden">
      
      {/* Label */}
      <div className="px-5 pt-4 pb-2">
        <p className="text-xs font-medium tracking-widest uppercase text-gray-500">
          Your short link
        </p>
      </div>

      {/* URL row */}
      <div className="flex items-center gap-3 px-5 pb-4">
        
        <a
          href={shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 font-mono text-sm font-semibold text-white break-all leading-relaxed hover:text-blue-400 transition-colors duration-150"
        >
          {shortUrl}
        </a>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          aria-label="Copy link"
          className={`
            shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
            transition-all duration-200
            ${copied
              ? "bg-green-500/15 text-green-400 border border-green-500/30"
              : "bg-white/10 text-white border border-white/10 hover:bg-white/20"
            }
          `}
        >
          {copied ? (
            <>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <rect x="4" y="4" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M2 8V2h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
    </div>
  );
}