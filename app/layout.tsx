import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import Modal from "./components/modals/Modal";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import OpenTripModal from "./components/modals/OpenTripModal";
import SearchModal from "./components/modals/SearchModal";

const font= Nunito({
  subsets:["latin"],
})

export const metadata: Metadata = {
  title: "Travel With me!",
  description: "Come And travel With your Friends!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser=await getCurrentUser();
  
  return (
    <html lang="en">
      <body className={font.className}>

        <ClientOnly>
                   <ToasterProvider/>
                   <SearchModal/>
                   <OpenTripModal/>
                  <RegisterModal/>
                  <LoginModal/>
                  <Navbar currentUser={currentUser} />
       </ClientOnly>
       <div className=" pb-20 p-28"></div>
       {children}
        </body>
    </html>
  );
}
