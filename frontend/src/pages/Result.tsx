import  { useEffect, useState } from "react";
import Header from "../components/Header";

export default function Result() {
  const [referenceId, setReferenceId] = useState("");

  useEffect(() => {
    // Generate a random booking reference ID like BK-9F3A72
    const randomId = "BK-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    setReferenceId(randomId);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Main Content Container */}
      <div className="flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Success Icon/Heading Section */}
        <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl">
          {/* Success Icon and Main Heading */}
          <div className="mb-6 sm:mb-8">
            <div className="text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6">🎉</div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-3 sm:mb-4">
              Booking Confirmed
            </h1>
          </div>

          {/* Thank You Message */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-4 sm:mb-6 leading-relaxed">
            Thank you for your booking!
          </p>

          {/* Reference ID Section */}
          <div className="bg-gray-50 rounded-xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 lg:mb-10">
            <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-3">
              Your booking reference
            </p>
            <p className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-900">
              <span className="font-bold text-blue-600 break-all">{referenceId}</span>
            </p>
          </div>

          {/* Back to Home Button */}
          <button
            onClick={() => (window.location.href = "/")}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-base sm:text-lg font-medium transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            Back to Home
          </button>

          {/* Additional Info for Larger Screens */}
          <div className="hidden lg:block mt-8 lg:mt-12">
            <p className="text-sm text-gray-500">
              You will receive a confirmation email shortly with all the details.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile-specific spacing */}
      <div className="h-8 sm:h-12 lg:h-16"></div>
    </div>
  );
}
