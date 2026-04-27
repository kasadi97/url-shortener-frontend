"use client";

import { useState } from "react";
import { shortenUrl } from "@/lib/api";

type Props = {
  onSuccess: (data: { shortUrl: string }) => void;
};

export default function UrlForm({ onSuccess }: Props) {
  const [url, setUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!url) return;

    setLoading(true);
    setError(null);

    try {
      const data = await shortenUrl(url, customCode);
      onSuccess(data);
      setUrl("");
      setCustomCode("");
    } catch (err: any) {
      setError(err.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com/very-long-link"
        className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white
          bg-white dark:bg-zinc-800
          border-gray-200 dark:border-zinc-700
          text-gray-900 dark:text-white
          placeholder-gray-400 dark:placeholder-zinc-500"
      />

      <input
        value={customCode}
        onChange={(e) => setCustomCode(e.target.value)}
        placeholder="Custom alias (optional)"
        className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white
          bg-white dark:bg-zinc-800
          border-gray-200 dark:border-zinc-700
          text-gray-900 dark:text-white
          placeholder-gray-400 dark:placeholder-zinc-500"
      />

      <button
        type="submit"
        disabled={!url || loading}
        className={`w-full py-3 rounded-xl font-medium transition ${
          !url || loading
            ? "bg-gray-200 dark:bg-zinc-700 text-gray-400 dark:text-zinc-500 cursor-not-allowed"
            : "bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-zinc-200"
        }`}
      >
        {loading ? "Processing..." : "Create short link"}
      </button>

      {error && (
        <p className="text-sm text-red-500 dark:text-red-400 text-center">{error}</p>
      )}

    </form>
  );
}