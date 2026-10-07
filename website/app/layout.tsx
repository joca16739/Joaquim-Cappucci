import type { Metadata, Viewport } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sustainable Olympiad",
    template: "%s · Sustainable Olympiad",
  },
  description:
    "Quality Education for a Sustainable Future. A sustainability and environmental education competition for students, created by the PORTO talks project.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#2E7D32",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap"
        />
      </head>
      <body className="flex min-h-screen flex-col font-sans">
        <a
          href="#page-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:font-bold focus:text-forest focus:shadow-lift"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="page-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
