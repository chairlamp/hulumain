"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: "system" | "dark" | "light" | "brown" // Add brown theme
  enableSystem?: boolean
  attribute?: "class" | "data-theme" | ("class" | "data-theme")[] // Optional attribute prop with allowed values
  disableTransitionOnChange?: boolean
}

export function ThemeProvider({
  children,
  defaultTheme = "brown", // Set brown as the default theme
  enableSystem = true,
  attribute = "class",
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</> // Prevent mismatch by not rendering theme on the server
  }

  return (
    <NextThemesProvider
      defaultTheme={defaultTheme} // Set to 'brown'
      attribute={attribute}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
    >
      {children}
    </NextThemesProvider>
  )
}
