export async function shortenUrl(
  url: string,
  customCode?: string
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/url`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
        customCode: customCode || null,
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to shorten URL");
  }

  const data = await res.json();
  return {
    shortUrl: `${process.env.NEXT_PUBLIC_API_URL}/url/${data.shortCode}`,
  };
}