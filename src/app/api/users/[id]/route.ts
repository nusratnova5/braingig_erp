import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "../../../../../lib/mongodb";

// Connect to MongoDB
connectDB();

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Await params if using Next.js 14+ dynamic route handling
    const { id } = await params;

    const body = await req.json();
    const { name, email, phone, role, department } = body;

    if (!name || !email || !phone || !role || !department) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, phone, role, department },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params; // <- await here too

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user: deletedUser });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

