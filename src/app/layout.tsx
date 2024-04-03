// next
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// styles
import "@/styles/main.css";

// fonts
const inter = Inter({ subsets: ["latin"] });

// metadata
export const metadata: Metadata = {
  title: "OrgLink",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
