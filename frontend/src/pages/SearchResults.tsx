// src/pages/SearchResults.tsx
import  { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ExperienceCard from "../components/ExperienceCard";
import api from "../api/axiosInstance";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    api
      .get(`/experiences?q=${encodeURIComponent(q)}`)
      .then((res) => setList(res.data || []))
      .catch((err) => {
        console.error("Search fetch error:", err);
        setList([]);
      })
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <h2 className="text-lg sm:text-xl font-semibold">
            Search results for “{q}”
          </h2>

          <button
            onClick={() => navigate("/")}
            className="text-sm text-gray-600 hover:underline"
          >
            ⬅ Back to Home
          </button>
        </div>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : list.length === 0 ? (
          <p className="text-gray-600 text-sm">
            No experiences found for “{q}”
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
            {list.map((exp) => (
              <ExperienceCard key={exp._id} item={exp} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
