import type { Metadata } from "next";
import { inter, geistMono } from "@/lib/fonts";
import { SmoothScrollProvider } from "@/providers/smooth-scroll-provider";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "StrataFlow — Operational Intelligence Systems",
    template: "%s | StrataFlow",
  },
  description:
    "StrataFlow builds intelligent systems that transform how businesses operate. Data Systems · AI Pipelines · Automation — from input to output, every layer engineered for scale.",
  keywords: [
    "AI automation",
    "operational intelligence",
    "data pipelines",
    "workflow automation",
    "AI agents",
    "cloud infrastructure",
    "lead generation systems",
    "voice AI",
    "data extraction",
  ],
  authors: [{ name: "StrataFlow" }],
  creator: "StrataFlow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://strataflow.com",
    siteName: "StrataFlow",
    title: "StrataFlow — Operational Intelligence Systems",
    description:
      "Data Systems · AI Pipelines · Automation — from input to output, every layer engineered for scale.",
  },
  twitter: {
    card: "summary_large_image",
    title: "StrataFlow — Operational Intelligence Systems",
    description:
      "Data Systems · AI Pipelines · Automation — from input to output, every layer engineered for scale.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
