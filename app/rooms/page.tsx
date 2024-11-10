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

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Välj ett rum</h1>
      {bookings.map((booking) => (
        <div key={booking.id}>
          {booking.name}
          {booking.capacity}
          {booking.date}
          {booking.startTime}
          {booking.endTime}
        </div>
      ))}
    </div>
  );
};

export default Rooms;
