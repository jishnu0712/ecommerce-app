import { Inter } from "next/font/google";
import "./globals.css";

import { ReduxProvider } from "@/redux/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
  description: "Groceries at best prices",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
            {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
