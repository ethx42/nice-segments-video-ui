import React from "react";
import type { Metadata } from "next";
import GlobalStyles from "../../styles/global.styles";
import { VideoProgressProvider } from '../hooks/useVideoProgress';

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
      <body>
        <VideoProgressProvider>
          <GlobalStyles />
          {children}
        </VideoProgressProvider>
      </body>
    </html>
  );
}
