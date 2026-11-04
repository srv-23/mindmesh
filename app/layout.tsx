import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/ui/themes";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppShell } from "@/components/AppShell";
import { UpgradeDialogProvider } from "@/components/UpgradeDialog";
import "./globals.css";
import type { Viewport } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Headings only; the optical-size axis gives large headings a tighter, more characterful cut.
const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  interactiveWidget: "resizes-content",
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),

  title: "Mindmesh: Agentic Workspace",

  description:
    "An AI agent that draws and writes alongside you and your team, live.",

  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },

  manifest: "/manifest.json",

  openGraph: {
    title: "Mindmesh: Agentic Workspace",

    description:
      "An AI agent that draws and writes alongside you and your team, live.",

    images: [
      {
        url: "/social/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mindmesh",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    images: ["/social/og-image.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // Mindmesh is dark-only, so Clerk's baseTheme is hardcoded to dark rather than synced to a toggle.
    <ClerkProvider
      appearance={{
        theme: dark,
        variables: { colorPrimary: "oklch(0.74 0.16 55)" },
      }}
    >
      <html
        lang="en"
        className={`dark ${geistSans.variable} ${geistMono.variable} ${bricolage.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">
          <TooltipProvider>
            <UpgradeDialogProvider>
              <AppShell>{children}</AppShell>
            </UpgradeDialogProvider>
          </TooltipProvider>
          <Toaster richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
