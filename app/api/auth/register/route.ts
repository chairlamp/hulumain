import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    let body
    try {
      body = await request.json()
    } catch (error) {
      return NextResponse.json({ message: "Invalid JSON format" }, { status: 400 })
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json({ message: "Invalid request body format" }, { status: 400 })
    }

    console.log("Received request body:", body)

    const { name, email, password } = body

    if (!name || !email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ message: "Email already in use" }, { status: 409 })
    }

    const hashedPassword = await hash(password, 10)

    let user
    try {
      user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: "CUSTOMER",
        },
      })
    } catch (error) {
      console.error("Database error:", error)
      return NextResponse.json({ message: "Database error", error: error instanceof Error ? error.message : String(error) }, { status: 500 })
    }

    if (!user) {
      return NextResponse.json({ message: "User creation failed" }, { status: 500 })
    }

    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({ message: "User created successfully", user: userWithoutPassword }, { status: 201 })
  } catch (error: any) {
    console.error("Registration error:", error)

    return NextResponse.json({ message: "Something went wrong", error: error.message || error }, { status: 500 })
  }
}
