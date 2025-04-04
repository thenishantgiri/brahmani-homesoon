import "./globals.css";
import { Playfair_Display, Lato } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "600", "700"],
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
  weight: ["300", "400", "700"],
});

export const metadata = {
  title: "Brahmani Home",
  description: "Handmade luxury furniture crafted by Rajasthani artisans.",
  openGraph: {
    title: "Brahmani Home",
    description: "Handmade luxury furniture crafted by Rajasthani artisans.",
    url: "https://www.brahmanihome.com",
    siteName: "Brahmani Home",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Brahmani Home - Handmade Rajasthani Furniture",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brahmani Home",
    description: "Handmade luxury furniture crafted by Rajasthani artisans.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable}`}>
      <body className="bg-white text-[#2c2c2c] font-sans">{children}</body>
    </html>
  );
}
