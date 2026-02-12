import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { TrailerModal } from "@/components/movies/TrailerModal";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
import { APP_NAME, APP_DESCRIPTION } from "@/lib/constants";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  keywords: ["movies", "streaming", "watchlist", "trending", "film"],
  authors: [{ name: "Optix" }],
  openGraph: {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    type: "website",
  },
  icons: {
    icon: "/icons/icon.png", // 32x32 or 192x192
    shortcut: "/icons/favicon.ico",
    apple: "/icons/apple-icon.png",
  },
  manifest: "/icons/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased min-h-screen`} suppressHydrationWarning>
        <AuthProvider>
          <Navbar />
          <main className="pt-16 pb-20 md:pb-8 min-h-screen">
            {children}
          </main>
          <Footer />
          <BottomNav />
          <TrailerModal />
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
