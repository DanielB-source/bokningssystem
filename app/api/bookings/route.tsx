import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import schema from "./schema";

export async function GET(request: NextRequest) {
  const bookings = await prisma.booking.findMany();
  return NextResponse.json(bookings);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const conflictingBooking = await prisma.booking.findFirst({
    where: {
      date: body.date,
      startTime: body.startTime,
      endTime: body.endTime,
      roomId: body.roomId,
    },
  });
  if (conflictingBooking)
    return NextResponse.json({ error: "Room already booked" }, { status: 400 });

  const newBooking = await prisma.booking.create({
    data: {
      date: body.date,
      startTime: body.startTime,
      endTime: body.endTime,
      bookedBy: body.bookedBy,
      roomId: body.roomId,
    },
  });
  return NextResponse.json(newBooking, { status: 201 });
}
