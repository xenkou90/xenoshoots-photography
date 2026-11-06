import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Xeno Shoots — Product Photography Portfolio",
  description:
    "Xeno Shoots — Creative product photography specializing in commercial visuals, brand storytelling, and high-end imagery. Based in Greece.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}