"use client"

import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function SocialLogin() {
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl })
    } catch {
      toast({
        title: "Authentication failed",
        description: "Could not sign in with Google.",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92..." />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77..." />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13..." />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15..." />
        </svg>
        Google
      </Button>
    </>
  )
}
