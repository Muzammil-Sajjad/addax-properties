import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { CurrencyProvider } from "@/components/Currency";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});
const body = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: "Addax Properties | Curated Dubai Off-Plan Investments", template: "%s | Addax Properties" },
  description:
    "Curated off-plan launches in Dubai by Emaar, Danube, Binghatti, DAMAC, Imtiaz and Azizi, with clear payment plans, handover dates and remote advisory for overseas buyers.",
  openGraph: { type: "website", siteName: "Addax Properties", images: ["/images/logo.png"] },
};

export const viewport = { themeColor: "#2f2218" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <CurrencyProvider>
          <a href="#content" className="skip-link">Skip to content</a>
          <Header />
          <main id="content">{children}</main>
          <Footer />
          <Reveal />
        </CurrencyProvider>
      </body>
    </html>
  );
}
