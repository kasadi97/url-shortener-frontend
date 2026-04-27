"use client";

import { useState } from "react";
import UrlForm from "@/components/UrlForm";
import ResultCard from "@/components/ResultCard";

export default function Home() {
  const [shortUrl, setShortUrl] = useState<string | null>(null);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950 px-4">
      <div className="w-full max-w-xl bg-white dark:bg-zinc-900 rounded-2xl shadow-sm dark:shadow-none dark:border dark:border-zinc-800 p-8">

        <h1 className="text-3xl font-semibold text-center text-gray-900 dark:text-white">
          Shorten your links
        </h1>

        <p className="text-center text-gray-500 dark:text-zinc-400 mt-2">
          Fast. Minimal. Reliable.
        </p>

        <div className="mt-6">
          <UrlForm onSuccess={(data) => setShortUrl(data.shortUrl)} />
        </div>

        {shortUrl && <ResultCard shortUrl={shortUrl} />}

        <p className="text-xs text-gray-400 dark:text-zinc-600 text-center mt-6">
          Free URL shortener
        </p>

      </div>
    </main>
  );
}