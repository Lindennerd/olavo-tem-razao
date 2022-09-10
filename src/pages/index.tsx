import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import ReactLoading from "react-loading";
import { Meme } from "../components/Meme";
import { Navbar } from "../components/Navbar";
import { useMemeStore } from "../store/memeStore";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { setMeme } = useMemeStore((state) => state);
  const { isLoading, error, refetch } = trpc.useQuery(["generator.random"], {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onSuccess: (data) => setMeme(data),
  });

  return (
    <>
      <div className="p-4 border rounded-md shadow-lg w-full">
        {isLoading && <ReactLoading />}
        <Meme />
      </div>
      <button className="btn w-full" onClick={(e) => refetch()}>
        Gerar
      </button>
    </>
  );
};

export default Home;
