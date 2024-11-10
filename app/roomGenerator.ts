const rooms = [
  { name: "Margret", capacity: 4 },
  { name: "Steve", capacity: 6 },
  { name: "Ada", capacity: 10 },
  { name: "Edmund", capacity: 10 },
  { name: "Grace", capacity: 20 },
];

async function generateRooms() {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentDate = today.getDate();
  const nextMonth = (currentMonth + 1) % 12;

  const startDate = new Date(today.getFullYear(), currentMonth, currentDate);
  const endDate = new Date(today.getFullYear(), nextMonth + 1, 0);

  let date = new Date(startDate);
  while (date <= endDate) {
    const dateStr = `${date.getDate()} ${date
      .toLocaleString("default", { month: "short" })
      .toLowerCase()}`;

    const bookings = [];
    for (let room of rooms) {
      for (let hour = 8; hour <= 16; hour++) {
        if (hour === 12) continue;
        const startTime = `${String(hour).padStart(2, "0")}:00`;
        const endTime = `${String(hour + 1).padStart(2, "0")}:00`;

        bookings.push({
          name: room.name,
          capacity: room.capacity,
          date: dateStr,
          startTime: startTime,
          endTime: endTime,
        });
      }
    }

    bookings.sort((a, b) => a.startTime.localeCompare(b.startTime));

    for (let booking of bookings) {
      try {
        const response = await fetch("http://localhost:3000/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(booking),
        });

        if (response.ok) {
          const newBooking = await response.json();
          console.log(
            `Booking created for ${newBooking.name} on ${newBooking.date} between ${newBooking.startTime} and ${newBooking.endTime}`
          );
        } else {
          console.error("Error creating booking:", await response.text());
        }
      } catch (error) {
        console.error("Error with POST request:", error);
      }
    }

    date.setDate(date.getDate() + 1);
  }
}

export { generateRooms };
