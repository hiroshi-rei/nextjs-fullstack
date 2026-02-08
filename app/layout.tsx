"use client"

import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>My Simple Auth</title>
      <body>
         <SessionProvider>
            {children}
         </SessionProvider>
      </body>
    </html>
  );
}
