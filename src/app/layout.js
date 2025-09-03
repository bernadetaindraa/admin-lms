import { Poppins } from "next/font/google";
import "./globals.css";

// Import Poppins dengan beberapa weight
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "LMS Admin",
  description: "Learning Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-sans antialiased bg-gray-50 text-gray-800`}
      >
        {children}
      </body>
    </html>
  );
}
