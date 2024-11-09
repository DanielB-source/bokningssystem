import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import schema from "../schema";
import { error } from "console";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const room = await prisma.room.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!room) {
    return NextResponse.json({ error: "Room not found" }, { status: 404 });
  }
  return NextResponse.json(room);
}
