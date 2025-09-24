// app/api/roles/route.ts
import { NextResponse } from "next/server";
import Role from "@/models/Role";
import { connectDB } from "../../../../lib/mongodb";

// GET /api/roles
export async function GET() {
  try {
    await connectDB();
    const roles = await Role.find();
    return NextResponse.json(roles);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/roles
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const newRole = await Role.create(body);
    return NextResponse.json(newRole, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
