"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";

const AppShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen relative">
      <Navbar />
      {/* <section className="h-16 w-full"></section> */}
      {children}
      <Footer />
    </main>
  );
};

export default AppShell;
