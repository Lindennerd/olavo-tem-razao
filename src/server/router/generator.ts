import { createRouter } from "./context";
import jimp from "jimp";
import { z } from "zod";
import OlavosMind from "../../lib/olavosMind";
import serverPath from "../../utils/server-path";

const imageUrl =
  "https://raw.githubusercontent.com/Lindennerd/olavo-tem-razao/master/public/olavo-post.jpg";

export const generateRouter = createRouter()
  .query("random", {
    async resolve({ ctx, input }) {
      return await generateMeme();
    },
  })
  .mutation("manual", {
    input: z.object({
      who: z.number(),
      are: z.number(),
      workingWith: z.number(),
      todo: z.number(),
    }),
    async resolve({ ctx, input }) {
      return await generateMeme({
        who: input.who,
        are: input.are,
        isWorkingWith: input.workingWith,
        todo: input.todo,
      });
    },
  });

interface IGenerateMeme {
  who: number;
  are: number;
  isWorkingWith: number;
  todo: number;
}

async function generateMeme(args?: IGenerateMeme) {
  const olavosMind = OlavosMind();
  const text = olavosMind.generateTheory(
    args?.who,
    args?.are,
    args?.isWorkingWith,
    args?.todo
  );

  const image = await jimp.read(imageUrl);
  const loadedFont = await jimp.loadFont(
    `https://${process.env.VERCEL_URL}/open-sans-32-black.fnt`
  );
  const printedImage = await image.print(loadedFont, 10, 90, text, 700, 100);
  const imgUrl = await printedImage.getBase64Async("image/jpeg");

  return imgUrl;
}
