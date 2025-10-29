// Responsive improved Header.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const doSearch = () => {
    const trimmed = (q || "").trim();
    if (!trimmed) return;
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") doSearch();
  };
  return (
    <header className="bg-white shadow-sm py-4 px-6">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold">hd</div>
          <div className="text-sm">
            <div className="text-base font-semibold">highway</div>
            <div className="text-xs text-gray-500 -mt-1">delite</div>
          </div>
        </Link>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search experiences"
            className="w-full sm:w-[420px] rounded-md border-none p-3 bg-gray-100 focus:outline-none"
          />
          <button
            onClick={doSearch}
            className="bg-yellow-400 hover:brightness-95 px-4 py-2 rounded-md font-semibold shadow-sm"
            aria-label="Search"
          >
            Search
          </button>
        </div>
      </div>
    </header>
  );
}