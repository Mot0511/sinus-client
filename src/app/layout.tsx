import type { Metadata } from "next";
import "./globals.sass";
import Header from "@/components/header/header";

export const metadata: Metadata = {
  title: "Axon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
