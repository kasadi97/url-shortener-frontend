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
    <div className="mt-6 p-4 bg-gray-100 rounded-xl text-center space-y-3">
      <p className="text-sm text-gray-500">Your short link</p>

      <a
        href={shortUrl}
        target="_blank"
        className="block text-blue-600 font-medium break-all"
      >
        {shortUrl}
      </a>

      <button
        onClick={handleCopy}
        className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}