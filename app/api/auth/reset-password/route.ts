import { type NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import crypto from "crypto"

const prisma = new PrismaClient()

// Request password reset
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { email } = data

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      // For security reasons, don't reveal that the user doesn't exist
      return NextResponse.json({
        message: "If your email is registered, you will receive a password reset link",
      })
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex")
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour from now

    // Store token in database using nested upsert for the passwordReset relation
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordReset: {
          upsert: {
            update: {
              token: resetToken,
              expiresAt: resetTokenExpiry,
            },
            create: {
              token: resetToken,
              expiresAt: resetTokenExpiry,
            },
          },
        },
      },
    })

    // Send email with reset link
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${resetToken}`

    // In a real app, you would implement sendEmail function
    // await sendEmail({
    //   to: email,
    //   subject: "Password Reset",
    //   text: `Click the link to reset your password: ${resetUrl}`,
    //   html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`
    // })

    return NextResponse.json({
      message: "If your email is registered, you will receive a password reset link",
    })
  } catch (error) {
    console.error("Error requesting password reset:", error)
    return NextResponse.json({ error: "Failed to request password reset" }, { status: 500 })
  }
}
