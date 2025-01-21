import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WrapperProvider from "./components/WrapperProvicer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Teacher",
  description: "AI Teacher adalah platform pembelajaran berbasis kecerdasan buatan yang dirancang untuk membantu siswa memahami berbagai topik dengan cara yang interaktif dan menarik. Aplikasi ini menyediakan materi pembelajaran, pertanyaan latihan, serta sistem untuk memeriksa jawaban secara otomatis. Dilengkapi dengan teknologi AI, aplikasi ini dapat menyesuaikan materi dan memberikan umpan balik yang personal kepada setiap pengguna, membantu mereka untuk belajar dengan lebih efektif.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-600 text-[#444444] min-h-screen flex items-center justify-center`}
      >
        <WrapperProvider>{children}</WrapperProvider>
      </body>
    </html>
  );
}
