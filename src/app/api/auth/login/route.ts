import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "../../../../../lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Check password (plain for now)
    if (user.password !== password) {
      return NextResponse.json(
        { success: false, error: "Invalid password" },
        { status: 401 }
      );
    }

    // Optionally, you can remove password before sending response
    const { password: _, ...userData } = user.toObject();

    return NextResponse.json({ success: true, user: userData });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
