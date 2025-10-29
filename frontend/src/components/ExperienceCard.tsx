// src/components/ExperienceCard.tsx

import { useNavigate } from "react-router-dom";
import type { Experience } from "../data/experiences";

type Props = { item: Experience };

export default function ExperienceCard({ item }: Props) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer">
      <div className="h-44 sm:h-48 md:h-52 w-full overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-4 sm:p-5 flex flex-col justify-between h-52 sm:h-56">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base sm:text-lg font-semibold line-clamp-1">{item.title}</h3>
            <span className="text-[10px] sm:text-xs bg-gray-100 px-3 py-1 rounded-md text-gray-700 whitespace-nowrap">
              {item.location}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-gray-500 mt-3 leading-relaxed line-clamp-2 sm:line-clamp-3">
            {item.description}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <div className="text-[11px] sm:text-xs text-gray-500">From</div>
            <div className="text-base sm:text-xl font-bold">₹{item.price}</div>
          </div>

          <button
            onClick={() => navigate(`/experience/${item._id}`)}
            className="bg-yellow-400 hover:brightness-95 px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg font-semibold shadow transition active:scale-95"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
