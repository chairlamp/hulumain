import NextAuth, { type Session } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      role: string
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
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

        // Check if user exists in database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user) {
          throw new Error("User not found. Please sign up first.")
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(credentials.password, user.password)
        if (!isValidPassword) {
          throw new Error("Incorrect password.")
        }

        return { id: user.id, name: user.name, email: user.email }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async jwt({
      token,
      user,
    }: { token: import("next-auth/jwt").JWT; user?: any }): Promise<import("next-auth/jwt").JWT> {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }: { session: Session; token: any }) {
      session.user = { ...(session.user || {}), id: token.id }
      return session
    },
  },
  pages: {
    signIn: "/auth/login", // Custom login page
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
