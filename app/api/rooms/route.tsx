import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import schema from "./schema";

export async function GET(request: NextRequest) {
  const rooms = await prisma.room.findMany();
  return NextResponse.json(rooms);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const room = await prisma.room.create({
    data: {
      name: body.name,
      capacity: body.capacity,
    },
  });
  return NextResponse.json(room, { status: 201 });
}
