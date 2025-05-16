import { useState, useRef, useEffect } from "react";
import "./App.css";
import data from "./dummyData.js";
import LRUCache from "./lruCache.js";

function App() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const debounceRef = useRef(null);
  const cache = new LRUCache();

  useEffect(() => {
    if (!input) return setResults([]);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const cached = cache.get(input);
      if (cached) return setResults(cached);

      const filtered = input
        ? data.filter((s) =>
            s.name.toLowerCase().startsWith(input.toLowerCase())
          )
        : [];

      cache.set(input, filtered);
      setResults(filtered);
    }, 300);
  }, [input]);

  return (
    <>
      <div className="container">
        <h2>SearchPro</h2>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search..."
        />
        {input ? (
          <ul>
            {results.map((item, i) => (
              <li key={i}>
                <b>{item.name.substring(0, input.length)}</b>
                {item.name.substring(input.length)}
              </li>
            ))}
          </ul>
        ) : (
          <ul></ul>
        )}
      </div>
    </>
  );
}

export default App;
