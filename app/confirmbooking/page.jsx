"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const BookingPage = () => {
  const [name, setName] = useState("");
  const [showModal, setShowModal] = useState(false);
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

      setShowModal(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    router.push("/rooms");
    router.refresh();
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

      {showModal && (
        <div className="modal modal-open flex items-center justify-center">
          <div className="modal-box text-center">
            <h2 className="text-xl font-bold mb-4">Ditt rum är bokat!</h2>
            <p className="text-4xl mb-6">😊</p>
            <div className="modal-action ">
              <button onClick={closeModal} className="btn bg-black text-white">
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
