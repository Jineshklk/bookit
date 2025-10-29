// src/pages/Details.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import api from "../api/axiosInstance";

function formatINR(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

const Details: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [experience, setExperience] = useState<any>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await api.get(`/experiences/${id}`);
        setExperience(res.data);
      } catch (error) {
        console.error("Error fetching experience:", error);
      }
    };
    fetchExperience();
  }, [id]);

  /** 🟢 IMPORTANT: hooks BEFORE conditional return */
  const basePrice = experience?.price ?? 0;
  const subtotal = useMemo(() => basePrice * quantity, [basePrice, quantity]);
  const serviceFee = useMemo(() => Math.round(subtotal * 0.05), [subtotal]);
  const taxes = useMemo(() => Math.round(subtotal * 0.18), [subtotal]);
  const total = useMemo(() => subtotal + serviceFee + taxes, [subtotal, serviceFee, taxes]);

  const availableDates =
    experience?.slots?.map((s: any) => s.date) || [];

  const availableTimes =
    experience?.slots
      ?.filter((s: any) => s.date === selectedDate)
      ?.map((s: any) => s.time) || [];

  /** ✅ NOW SAFE TO RETURN CONDITIONALLY */
  if (!experience)
    return <p className="text-center mt-20 text-gray-600">Loading...</p>;

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Navigation */}
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <button 
            onClick={() => navigate("/")} 
            className="text-sm text-gray-600 hover:underline px-1 sm:px-0"
          >
            ← Back
          </button>
          <p className="text-sm text-gray-500">Details</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Column - Experience Details */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Image */}
            <img 
              src={experience.imageUrl} 
              alt={experience.title} 
              className="w-full h-48 sm:h-64 md:h-80 lg:h-96 rounded-xl sm:rounded-2xl object-cover"
            />
            
            {/* Title and Location */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold px-2 sm:px-0">
              {experience.title}
            </h1>
            <p className="text-gray-600 text-sm sm:text-base px-2 sm:px-0">
              {experience.location}
            </p>
            
            {/* Description */}
            <p className="text-gray-700 mt-2 sm:mt-4 text-sm sm:text-base px-2 sm:px-0">
              {experience.description}
            </p>

            {/* Date Selection */}
            <div className="px-2 sm:px-0">
              <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Choose Date</h2>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {availableDates.map((d: string) => (
                  <button
                    key={d}
                    onClick={() => { setSelectedDate(d); setSelectedTime(null); }}
                    className={`px-3 sm:px-4 py-2 rounded-lg border text-xs sm:text-sm min-w-[70px] sm:min-w-0 ${
                      selectedDate === d ? "border-blue-600 bg-blue-50" : "border-gray-200"
                    }`}
                  >
                    {new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            {selectedDate && (
              <div className="px-2 sm:px-0">
                <h2 className="text-base sm:text-lg font-semibold mt-4 sm:mt-6 mb-3 sm:mb-4">Choose Time</h2>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {availableTimes.map((t: string) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`px-3 sm:px-4 py-2 rounded-lg border text-xs sm:text-sm min-w-[60px] sm:min-w-0 ${
                        selectedTime === t ? "border-blue-600 bg-blue-50" : "border-gray-200"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Booking Card */}
          <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 sticky top-4 sm:top-6 h-fit mx-2 sm:mx-0">
            <p className="text-xs sm:text-sm text-gray-500">Starts at</p>
            <p className="text-xl sm:text-2xl font-bold">{formatINR(basePrice)}</p>

            {/* Quantity Selector */}
            <div className="mt-4 sm:mt-6">
              <p className="text-xs sm:text-sm text-gray-600">Quantity</p>
              <div className="flex items-center gap-2 sm:gap-3 mt-2">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))} 
                  className="border rounded-lg px-3 sm:px-4 py-1 text-sm sm:text-base"
                >
                  −
                </button>
                <span className="text-sm sm:text-base">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)} 
                  className="border rounded-lg px-3 sm:px-4 py-1 text-sm sm:text-base"
                >
                  +
                </button>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() =>
                navigate("/checkout", {
                  state: {
                    experienceId: experience._id,
                    experienceTitle: experience.title,
                    price: experience.price,
                    imageUrl: experience.imageUrl,
                    location: experience.location,
                    description: experience.description,
                    duration: experience.duration,
                    quantity,
                    date: selectedDate,
                    time: selectedTime,
                    total,
                  },
                })
              }
              disabled={!selectedDate || !selectedTime}
              className="mt-4 sm:mt-6 w-full py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition text-white font-semibold rounded-lg sm:rounded-xl text-sm sm:text-base"
            >
              Continue to Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;