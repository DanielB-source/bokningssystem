import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import schema from "../schema";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const room = await prisma.room.findUnique({
    where: { id: parseInt(id) },
  });

  if (!room) {
    return NextResponse.json({ error: "Room not found" }, { status: 404 });
  }
  return NextResponse.json(room);
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

  const room = await prisma.room.findUnique({
    where: { id: parseInt(id) },
  });

  if (!room)
    return NextResponse.json({ error: "Room not found" }, { status: 404 });

  const updatedRoom = await prisma.room.update({
    where: { id: room.id },
    data: {
      name: body.name,
      capacity: body.capacity,
    },
  });
  return NextResponse.json(updatedRoom);
}
