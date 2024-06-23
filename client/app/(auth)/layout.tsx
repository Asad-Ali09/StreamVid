import type { Metadata } from "next";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthProvider";

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
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
