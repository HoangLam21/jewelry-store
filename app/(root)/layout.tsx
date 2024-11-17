import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light800_dark400 relative overflow-x-hidden w-screen h-screen">
      <Navbar />
      <div className="flex flex-col h-full">
        <section className="flex flex-1 mt-[100px] pb-16">
          <div className="mx-auto w-full">{children}</div>
        </section>
        <Footer />
      </div>
    </main>
  );
};

export default Layout;
