import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { AuthProvider } from "./_context/AuthContext";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://anikage.dpdns.org"),

  title: {
    default: "AniKage - Watch Anime Online Free in HD",
    template: "%s | AniKage",
  },

  description:
    "Watch latest anime episodes online for free in HD quality with English subtitles. Stream popular anime like Naruto, One Piece, Jujutsu Kaisen on AniKage.",

  keywords: [
    "watch anime online",
    "anime streaming free",
    "naruto episode watch",
    "one piece episodes",
    "anime hd streaming",
    "anikage",
  ],

  authors: [{ name: "AniKage" }],
  creator: "AniKage",

  openGraph: {
    title: "AniKage - Watch Anime Online Free",
    description:
      "Stream anime online in HD quality with subtitles. Free anime streaming platform.",
    url: "https://anikage.dpdns.org",
    siteName: "AniKage",
    images: [
      {
        url: "/og-image.jpg", // add this image in public folder
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "AniKage - Watch Anime Online Free",
    description:
      "Watch anime online in HD quality for free with subtitles.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://anikage.dpdns.org",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="no-scrollbar">
      <body className={`${outfit.className} bg-neutral-950 no-scrollbar`}>
        <AuthProvider>
          <Header />
          {children}
          <Toaster />
          <Footer />
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  );
}
