import NextAuth, { type Session } from "next-auth"

// Extend NextAuth Session and JWT types to include custom properties
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }

  interface JWT {
    id?: string
    role?: string
  }
}

import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter an email and password.")
        }

        // Check if user exists in the database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user) {
          throw new Error("User not found. Please sign up first.")
        }

        // Verify the password
        const isValidPassword = await bcrypt.compare(credentials.password, user.password)
        if (!isValidPassword) {
          throw new Error("Incorrect password.")
        }

        // Include role in the returned user object
        return { id: user.id, name: user.name, email: user.email, role: user.role }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    // Add the user's role and id to the JWT token
    async jwt({ token, user }: { token: any; user?: { id: string | number; name?: string | null; email?: string | null; role?: string } }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { id: String(user.id) },
          select: { id: true, role: true },
        })

        token.id = dbUser?.id
        token.role = dbUser?.role // Save the role in the token
      }
      return token
    },
    // Attach the token data to the session object
    async session({ session, token }: { session: Session; token: any }) {
      session.user = {
        ...(session.user || {}),
        id: token.id,
        role: token.role, // Make the role available in the session
      }
      return session
    },
    // Redirect users based on their role after sign in
    async redirect({ url, baseUrl, token }: { url: string; baseUrl: string; token?: any }) {
      // When a token exists and has a role, send the user to the appropriate dashboard.
      if (token && token.role) {
        if (token.role === "ADMIN") {
          return `${baseUrl}/admin-dashboard`
        }
        if (token.role === "DELIVERY_AGENT") {
          return `${baseUrl}/driver-dashboard`
        }
      }
      // Fallback redirect
      return baseUrl
    },
  },
  pages: {
    signIn: "/auth/login", // Custom login page
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
