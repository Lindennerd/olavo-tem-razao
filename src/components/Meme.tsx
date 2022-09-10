import Image from "next/image";
import { useMemeStore } from "../store/memeStore";

export function Meme() {
  const { meme } = useMemeStore((state) => state);

  return (
    <div>
      {meme && (
        <Image src={meme} alt="Teoria do Olavão" width={700} height={300} />
      )}
    </div>
  );
}
