import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anti-Scroll Learn",
  description: "Learn one concept at a time. No scrolling, just focus.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="overflow-hidden h-dvh flex items-center justify-center p-0 mobile-body" style={{ backgroundColor: "#e2e8f0" }}>
        <ThemeProvider>
          <div
            className="mobile-frame relative w-full overflow-hidden"
            style={{
              maxWidth: "430px",
              height: "100%",
              backgroundColor: "var(--color-bg)",
              fontFamily: "var(--font-sans)",
            }}
          >
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
