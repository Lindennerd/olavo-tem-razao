import Head from "next/head";
import React from "react";
import { Navbar } from "./Navbar";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Olavo tem Razão</title>
        <meta name="description" content="Gerador de teorias da conspiração" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="container mx-auto flex flex-col items-center min-h-screen p-4 gap-4">
        {children}
      </main>
    </>
  );
}
