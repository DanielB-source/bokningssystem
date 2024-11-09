import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import schema from "../schema";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const booking = await prisma.booking.findUnique({
    where: { id: parseInt(id) },
  });

  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }
  return NextResponse.json(booking);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  const { id } = await params;

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const booking = await prisma.booking.findUnique({
    where: { id: parseInt(id) },
  });

  if (!booking)
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });

  const updatedBooking = await prisma.booking.update({
    where: { id: booking.id },
    data: {
      date: body.date,
      startTime: body.startTime,
      endTime: body.endTime,
      bookedBy: body.bookedBy,
      roomId: body.roomId,
    },
  });
  return NextResponse.json(updatedBooking);
}
