"use client";
import { useEffect, useState } from "react";

interface Booking {
  id: number;
  name: string;
  capacity: number;
  date: string;
  startTime: string;
  endTime: string;
  bookedBy: string | null;
}

const Rooms = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentDateIndex, setCurrentDateIndex] = useState(0);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/bookings");
        const data: Booking[] = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, []);

  const dates: string[] = [];
  bookings.forEach((b) => {
    if (!dates.includes(b.date)) {
      dates.push(b.date);
    }
  });
  const visibleDates = dates.slice(currentDateIndex, currentDateIndex + 3);

  const handlePrevDates = () => {
    if (currentDateIndex > 0) setCurrentDateIndex(currentDateIndex - 3);
  };

  const handleNextDates = () => {
    if (currentDateIndex + 3 < dates.length)
      setCurrentDateIndex(currentDateIndex + 3);
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Välj ett rum</h1>

      <div className="flex items-center justify-center mb-4 space-x-4">
        <button
          className="btn btn-outline btn-circle"
          onClick={handlePrevDates}
        >
          &lt;
        </button>
        <div className="text-lg font-semibold">
          {visibleDates.length > 0 && (
            <span>
              {visibleDates[0]} - {visibleDates[2]}
            </span>
          )}
        </div>
        <button
          className="btn btn-outline btn-circle"
          onClick={handleNextDates}
          disabled={currentDateIndex + 3 >= dates.length}
        >
          &gt;
        </button>
      </div>

      <div className="space-y-3">
        {bookings
          .filter((booking) => visibleDates.includes(booking.date))
          .map((booking) => (
            <div key={booking.id} className="p-2 border rounded">
              <p>
                {booking.name} ({booking.capacity} personer)
              </p>
              <p>
                {booking.date}: {booking.startTime} - {booking.endTime}
              </p>
              <button>Boka</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Rooms;
