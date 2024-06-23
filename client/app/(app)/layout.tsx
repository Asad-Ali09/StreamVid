import type { Metadata } from "next";
import "../globals.css";
import { Navbar } from "@/components";
import { AuthProvider } from "@/context/AuthProvider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "StreamVid",
  description:
    "A movie streaming platform where you can watch movies for free.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="max-w-[1920px] relative mx-auto">
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
