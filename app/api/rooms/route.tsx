import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  const rooms = await prisma.room.findMany();
  return NextResponse.json(rooms);
}
