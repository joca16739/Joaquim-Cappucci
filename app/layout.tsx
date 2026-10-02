import type { Metadata, Viewport } from "next";
import { OlympiadProvider } from "@/lib/store";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sustainable Olympiad",
  description:
    "A sustainability competition created by students for PORTO talks — “The world as seen by the students” (SDG 4 Quality Education).",
};

export const viewport: Viewport = {
  themeColor: "#1a3263",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <OlympiadProvider>{children}</OlympiadProvider>
      </body>
    </html>
  );
}
