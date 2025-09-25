import { NextResponse } from "next/server";
import Role from "@/models/Role";
import { connectDB } from "../../../../../lib/mongodb";

// 👉 UPDATE a role (PUT /api/roles/:id)
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params; // ✅ await params
    const body = await request.json();

    const updatedRole = await Role.findByIdAndUpdate(id, body, {
      new: true, // return the updated doc
    });

    if (!updatedRole) {
      return NextResponse.json({ error: "Role not found" }, { status: 404 });
    }

    return NextResponse.json(updatedRole);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 👉 DELETE a role (DELETE /api/roles/:id)
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params; // ✅ await params

    const deletedRole = await Role.findByIdAndDelete(id);

    if (!deletedRole) {
      return NextResponse.json({ error: "Role not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Role deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
