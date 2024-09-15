import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { ReactQueryClientProvider } from "./components/react-query-client-provider"
import { ThemeProvider } from "./components/theme-provider"
import { Navbar } from "./components/navbar"
import { Toaster } from "@/components/ui/toaster"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Fix My Grammar AI",
  description: "AI-powered tool for advanced grammar correction and writing enhancement.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
