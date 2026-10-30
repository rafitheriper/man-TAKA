import { Instrument_Serif, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const display = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--display" });
const body = Hanken_Grotesk({ subsets: ["latin"], variable: "--body" });

export const metadata = {
  title: "Shuvo jonmodin, Mantaka",
  description: "A small site for a big day.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
