import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import schema from "./schema";

export async function GET(request: NextRequest) {
  const bookings = await prisma.booking.findMany();
  return NextResponse.json(bookings);
}
