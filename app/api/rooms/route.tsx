import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import schema from "./schema";
import { error } from "console";

export async function GET(request: NextRequest) {
  const rooms = await prisma.room.findMany();
  return NextResponse.json(rooms);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const room = await prisma.room.findUnique({
    where: { name: body.name },
  });

  if (room)
    return NextResponse.json({ error: "Room already exists" }, { status: 400 });

  const newRoom = await prisma.room.create({
    data: {
      name: body.name,
      capacity: body.capacity,
    },
  });
  return NextResponse.json(newRoom, { status: 201 });
}
