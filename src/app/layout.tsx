import React from "react";
import type { Metadata } from "next";
import GlobalStyles from "../../styles/globals";

export const metadata: Metadata = {
  title: "Segment-Based Video Interface",
  description: "Segment-Based Video Interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body>
        <GlobalStyles />
        {children}
      </body>
    </html>
  );
}
