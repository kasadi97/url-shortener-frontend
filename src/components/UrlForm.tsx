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
        className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
      />

      <input
        value={customCode}
        onChange={(e) => setCustomCode(e.target.value)}
        placeholder="Custom alias (optional)"
        className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
      />

      <button
        type="submit"
        disabled={!url || loading}
        className={`w-full py-3 rounded-xl font-medium transition ${
          !url || loading
            ? "bg-gray-200 cursor-not-allowed"
            : "bg-black text-white hover:bg-gray-800"
        }`}
      >
        {loading ? "Processing..." : "Create short link"}
      </button>

      {error && (
        <p className="text-sm text-red-500 text-center">{error}</p>
      )}
    </form>
  );
}