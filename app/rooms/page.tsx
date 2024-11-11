"use client";
import Link from "next/link";
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
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [appliedFilter, setAppliedFilter] = useState<string[]>([]);
  const [dropdownLabel, setDropdownLabel] = useState("Mötesrum");
  const [selectedBooking, setSelectedBooking] = useState<number | null>(null);
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

  const rooms: string[] = [];
  bookings.forEach((b) => {
    if (!rooms.includes(b.name)) {
      rooms.push(b.name);
    }
  });

  const handleRoomSelection = (room: string) => {
    if (selectedRooms.includes(room)) {
      setSelectedRooms(selectedRooms.filter((r) => r !== room));
    } else {
      setSelectedRooms([...selectedRooms, room]);
    }
  };

  const filteredBookings = bookings.filter(
    (booking) =>
      appliedFilter.length === 0 || appliedFilter.includes(booking.name)
  );

  const handleSelect = () => {
    setAppliedFilter(selectedRooms);
    setDropdownOpen(false);
    setDropdownLabel(
      selectedRooms.length > 0
        ? `${selectedRooms.length} ${
            selectedRooms.length === 1 ? "valt rum" : "valda rum"
          }`
        : "Mötesrum"
    );
  };

  const handleDeselectAll = () => {
    setSelectedRooms([]);
    setAppliedFilter([]);
    setDropdownLabel("Mötesrum");
  };

  const handlePrevDates = () => {
    if (currentDateIndex > 0) setCurrentDateIndex(currentDateIndex - 3);
  };

  const handleNextDates = () => {
    if (currentDateIndex + 3 < dates.length)
      setCurrentDateIndex(currentDateIndex + 3);
  };

  const handleBookingSelection = (bookingId: number) => {
    if (selectedBooking === bookingId) {
      setSelectedBooking(null);
    } else {
      setSelectedBooking(bookingId);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Välj ett rum</h1>

      <div className="dropdown mb-6">
        <label
          tabIndex={0}
          className="btn btn-outline m-1 flex justify-between items-center"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {dropdownLabel}
          <span className="ml-2">
            {dropdownOpen ? <span>^</span> : <span>v</span>}
          </span>
        </label>
        {dropdownOpen && (
          <div
            tabIndex={0}
            className="dropdown-content menu p-4 shadow bg-base-100 rounded-box w-64 z-50"
          >
            <div>
              {rooms.map((room) => (
                <label
                  key={room}
                  className="label justify-between"
                  onClick={() => handleRoomSelection(room)}
                >
                  <span className="label-text">
                    {room} ({bookings.find((b) => b.name === room)?.capacity}
                    personer)
                  </span>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-success cursor-pointer"
                    checked={selectedRooms.includes(room)}
                    onChange={() => handleRoomSelection(room)}
                  />
                </label>
              ))}
            </div>
            <div className="flex justify-between gap-2 pt-2 mt-2 border-t">
              <button
                className="btn btn-sm bg-black text-white hover:bg-gray-800"
                onClick={handleSelect}
              >
                Välj
              </button>
              <button
                className="btn btn-sm bg-gray-500 text-white hover:bg-gray-600"
                onClick={handleDeselectAll}
              >
                Avmarkera
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center mb-4 space-x-4">
        <button
          className="btn btn-outline btn-circle"
          onClick={handlePrevDates}
          disabled={currentDateIndex === 0}
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

      <div className="w-full">
        <table className="w-full table-fixed">
          <thead>
            <tr>
              {visibleDates.map((date) => (
                <th
                  key={date}
                  className="w-1/3 p-1 sm:p-2 text-[10px] sm:text-sm md:text-base bg-base-200"
                >
                  {date}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {visibleDates.map((date) => (
                <td key={date} className="w-1/3 p-1 sm:p-2 align-top">
                  {filteredBookings
                    .filter((booking) => booking.date === date)
                    .map((booking) => (
                      <div
                        key={booking.id}
                        className={`p-1 sm:p-2 border-2 rounded mb-2 cursor-pointer text-[10px] sm:text-sm md:text-base ${
                          selectedBooking === booking.id
                            ? "bg-green-500 text-white"
                            : "border-green-500 bg-white hover:bg-green-50"
                        }`}
                        onClick={() => handleBookingSelection(booking.id)}
                      >
                        <p
                          className={`break-words ${
                            selectedBooking === booking.id ? "font-bold" : ""
                          }`}
                        >
                          {booking.name} ({booking.capacity} pers)
                        </p>
                        <p className="break-words">
                          {booking.startTime} - {booking.endTime}
                        </p>
                      </div>
                    ))}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {selectedBooking !== null && (
        <div className="fixed bottom-16 left-0 right-0 flex justify-center">
          <Link
            href={{
              pathname: "/confirmbooking",
              query: {
                id: selectedBooking,
              },
            }}
            className="btn bg-black text-white font-bold w-11/12 max-w-2xl h-16 rounded-full shadow-lg transition-transform transform translate-y-4"
          >
            Nästa
          </Link>
        </div>
      )}
    </div>
  );
};

export default Rooms;
