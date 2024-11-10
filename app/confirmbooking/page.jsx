"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const BookingPage = () => {
  const [name, setName] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("id");

  const handleSubmit = async () => {
    if (!name) return;
    try {
      const booking = await fetch(`/api/bookings/${bookingId}`);
      const currentBooking = await booking.json();

      await fetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...currentBooking,
          bookedBy: name,
        }),
      });

      router.push("/rooms");
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-8">
      <div className="flex flex-col items-center space-y-6">
        <h1 className="text-4xl font-medium">Vem bokar?</h1>
        <input
          type="text"
          placeholder="Skriv för- och efternamn"
          className="w-80 px-4 py-3 border border-gray-300 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="btn bg-black text-white font-bold w-11/12 max-w-2xl h-16 rounded-full shadow-lg transition-transform transform translate-y-4"
      >
        Boka
      </button>
    </div>
  );
};

export default BookingPage;
