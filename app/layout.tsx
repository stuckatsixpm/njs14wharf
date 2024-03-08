import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import WalletProvider from "@/app/_session/WalletProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextJS 14 + Wharfkit demo",
  description: "Miniature demo of Wallet Provider",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  );
}
