import 'bootstrap/dist/css/bootstrap.css'
import type { Metadata } from "next";
import BootstrapClient from '@/components/BootstrapClient';

import "./globals.css";

export const metadata: Metadata = {
  title: "Onway",
  description: "Covoiturage OnWay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        {children}
        <BootstrapClient/>
      </body>
    </html>
  );
}
