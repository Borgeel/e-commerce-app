import React from "react";
import Head from "next/head";

import { Navbar, Footer } from "../components";

const Layout = ({ children }) => {
  return (
    <div className="p-1">
      <Head>
        <title>Knife Store</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container"> {children} </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
