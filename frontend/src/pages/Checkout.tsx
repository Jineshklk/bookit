// src/pages/Checkout.tsx
import React, { useState } from "react";
import Header from "../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance"; // your axios instance

export default function Checkout() {
  const navigate = useNavigate();
  const { state } = useLocation() as any;

  if (!state) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
          <p className="text-gray-600 text-base sm:text-lg">
            No booking context. Please select an experience first.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-6 py-3 bg-blue-600 text-white text-sm sm:text-base rounded-md hover:bg-blue-700 transition"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const {
    experienceId,
    quantity: initQty = 1,
    date,
    time,
    total: initTotal,
  } = state;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [promo, setPromo] = useState("");
  const [quantity, setQuantity] = useState<number>(initQty || 1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePay = async () => {
    if (!name || !email) {
      setError("Please enter your name and email.");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const payload = {
        experienceId,
        date,
        time,
        seats: quantity,
        name,
        email,
        phone,
        promoCode: promo || undefined,
      };

      const res = await api.post("/bookings", payload);
      const data = res.data;

      if (data && data.success) {
        navigate("/result", {
          state: {
            experience: data.experienceTitle,
            date: data.date,
            time: data.time,
            quantity: data.seats,
            total: data.amountPaid,
            reference: data.bookingId,
          },
        });
      } else {
        setError(data?.error || "Booking failed");
      }
    } catch (err: any) {
      console.error("Booking error", err);
      setError(err?.response?.data?.error || err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  const baseStyle =
    "w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400";

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT: form card */}
        <div className="flex flex-col items-start">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-6">Checkout</h1>
          <div className="bg-gray-100 p-6 sm:p-8 rounded-2xl shadow-sm w-full max-w-lg space-y-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className={baseStyle}
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className={baseStyle}
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              className={baseStyle}
            />
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                placeholder="Promo Code (optional)"
                className="flex-1 p-3 border rounded-lg"
              />
              <button
                onClick={() =>
                  alert("Promo validation will be done server-side (demo).")
                }
                className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition"
              >
                Apply
              </button>
            </div>

            {error && <div className="text-sm text-red-600">{error}</div>}
          </div>
        </div>

        {/* RIGHT: summary card */}
        <div className="bg-gray-100 p-6 sm:p-8 rounded-2xl shadow-md h-fit lg:sticky lg:top-24">
          <div className="space-y-3 text-sm sm:text-base">
            <div className="flex justify-between flex-wrap gap-1">
              <span>Experience</span>
              <span className="font-medium">
                {state.experienceTitle || experienceId}
              </span>
            </div>
            <div className="flex justify-between flex-wrap gap-1">
              <span>Date & Time</span>
              <span>
                {date} · {time}
              </span>
            </div>

            <div className="flex justify-between items-center flex-wrap gap-2">
              <span>Quantity</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 border rounded-md"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 border rounded-md"
                >
                  +
                </button>
              </div>
            </div>

            <hr />
            <div className="flex justify-between flex-wrap gap-1">
              <span>Subtotal</span>
              <span>
                ₹
                {initTotal
                  ? Math.round((initTotal * quantity) / initQty)
                  : "—"}
              </span>
            </div>
            <div className="flex justify-between flex-wrap gap-1">
              <span>Taxes</span>
              <span>Calculated on server</span>
            </div>
            <div className="flex justify-between flex-wrap gap-1 font-bold text-lg pt-2">
              <span>Total</span>
              <span>₹{initTotal}</span>
            </div>
          </div>

          <button
            onClick={handlePay}
            disabled={loading}
            className="mt-6 w-full py-4 text-white text-lg font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 transition-all disabled:opacity-60"
          >
            {loading ? "Processing..." : "PAY AND CONFIRM"}
          </button>
        </div>
      </div>
    </div>
  );
}
