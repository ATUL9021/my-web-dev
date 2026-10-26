import Logo from "./_components/Logo";
import Navigation from "./_components/Navigation";
// import "@/app/_styles/globals.css";
import "../app/_styles/globals.css";

import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";
import ReservationContext from "./_components/ReservationContext";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s: the wild oasis",
    default: "Welcome / The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of Italian Dolomites",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} relative flex flex-col bg-primary-950 text-primary-100 min-h-screen`}
      >
        <Header />
        <div className="flex-grow px-8 py-12 grid ">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationContext>{children}</ReservationContext>
          </main>
        </div>
      </body>
    </html>
  );
}
