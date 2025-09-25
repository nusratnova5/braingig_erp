import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "../../../../lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const users = await User.find().sort({ createdAt: -1 }); // get all users
    return NextResponse.json({ users });
  } catch (error: any) {
    return NextResponse.json({ users: [], error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { name, email, phone, role, department } = body;

    if (!name || !email || !phone || !role || !department) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    const tempPassword = "111111";

    const user = await User.create({
      name,
      email,
      phone,
      role,
      department,
      password: tempPassword,
    });

    return NextResponse.json({ success: true, user, tempPassword });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
