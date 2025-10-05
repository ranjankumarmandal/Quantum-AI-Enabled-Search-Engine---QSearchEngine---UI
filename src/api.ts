export async function searchApi(q: string, page = 0, size = 10) {
  const res = await fetch(
    `/api/search?q=${encodeURIComponent(q)}&page=${page}&size=${size}`
  );
  if (!res.ok) throw new Error(`Search failed: ${res.status}`);
  return res.json();
}
