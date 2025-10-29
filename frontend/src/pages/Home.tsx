// src/pages/Home.tsx
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ExperienceCard from "../components/ExperienceCard";

export default function Home() {
  const [experiences, setExperiences] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://bookit-c3lu.onrender.com/experiences")
      .then((res) => res.json())
      .then((data) => setExperiences(data))
      .catch((err) => console.error("Error fetching experiences:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Always visible header, already optimized */}
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div
          className="
            grid gap-5 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
          "
        >
          {experiences.length > 0 ? (
            experiences.map((exp) => (
              <ExperienceCard key={exp._id} item={exp} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              Loading experiences...
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
