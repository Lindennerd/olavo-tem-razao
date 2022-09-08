import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import ReactLoading from "react-loading";
import { Navbar } from "../components/Navbar";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data, isLoading, error, refetch } = trpc.useQuery(
    ["generator.random"],
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      <Head>
        <title>Olavo Tem Razão</title>
        <meta name="description" content="Olavo Tem Razão" />
      </Head>

      <Navbar />

      <main className="container mx-auto flex flex-col items-center min-h-screen p-4 gap-4">
        <div className="p-4 border rounded-md shadow-lg w-full">
          {isLoading && <ReactLoading />}
          {data && (
            <div>
              <Image
                src={data}
                alt="Teoria do Olavão"
                width={700}
                height={300}
              />
            </div>
          )}
        </div>
        <button className="btn w-full" onClick={(e) => refetch()}>
          Gerar
        </button>
      </main>
    </>
  );
};

export default Home;
