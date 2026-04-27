"use client";

import { useState } from "react";
import UrlForm from "@/components/UrlForm";
import ResultCard from "@/components/ResultCard";

export default function Home() {
  const [shortUrl, setShortUrl] = useState<string | null>(null);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-sm p-8">

        <h1 className="text-3xl font-semibold text-center">
          Shorten your links
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Fast. Minimal. Reliable.
        </p>

        <div className="mt-6">
          <UrlForm onSuccess={(data) => setShortUrl(data.shortUrl)} />
        </div>

        {shortUrl && <ResultCard shortUrl={shortUrl} />}

        <p className="text-xs text-gray-400 text-center mt-6">
          Free URL shortener
        </p>

      </div>
    </main>
  );
}