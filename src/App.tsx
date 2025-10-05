import { useEffect, useState } from "react";
import { searchApi } from "./api";

export default function App() {
  const [q, setQ] = useState<string>("quantum computing");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const doSearch = async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await searchApi(query);
      setResults(data.results || []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    doSearch(q);
  }, []);

  return (
    <div className='container'>
      <div className='header'>Ranjan Quantum AI Enabled Search Engine</div>
      <div className='row'>
        <input
          className='input'
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder='Search the index...'
        />
        <button
          className='button'
          disabled={loading}
          onClick={() => doSearch(q)}>
          {loading ? "Searching…" : "Search"}
        </button>
      </div>
      {error && <div className='note'>{error}</div>}
      <div>
        {results.map((r, idx) => (
          <div className='result' key={idx}>
            <a className='title' href={r.url} target='_blank' rel='noreferrer'>
              {r.title || r.url}
            </a>
            <div className='url'>{r.url}</div>
            <div
              className='snippet'
              dangerouslySetInnerHTML={{ __html: r.snippet }}
            />
          </div>
        ))}
        {results.length === 0 && !loading && (
          <div className='note'>
            No results yet. Crawl a seed URL from backend: POST
            /api/crawl?seed=https://example.com
          </div>
        )}
      </div>
    </div>
  );
}
