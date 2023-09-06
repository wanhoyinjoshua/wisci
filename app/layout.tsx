import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Walking Index for Spinal Cord Injury (WISCI) The Self-Report Version',
  description: 'This self-report outcome measure scores your ability to walk. It has been tested for reliability and validity (against the original WISCI II version – Ditunno et al 2001). Self-report WISCI developed by: Marsha Ben, Lisa Harvey and Joanne Glinsky, University of Sydney, Australia (Ref: Ben M et al (2023) Spinal Cord)',
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
