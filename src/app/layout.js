import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import NavbarComponent from "@/components/Navbar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata = {
  title: "Coffe Street",
  description: "Coffe di ngoro, jombang, jawa timur",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="w-full">
          <NavbarComponent/>
          {children}
        </div>
      </body>
    </html>
  )
}
