import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
connectToDatabase();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { email, password } = reqBody;

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        } 
        await connectToDatabase();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }
        const user = await User.create({
            email,
            password,
        });
        return NextResponse.json({
            message: "User created successfully",
            success: true,
        });
    } catch (error: any) {
        console.log("failed to create user",error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
