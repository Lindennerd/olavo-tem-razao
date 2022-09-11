import { createRouter } from "./context";
import jimp from "jimp";
import { z } from "zod";
import OlavosMind from "../../lib/olavosMind";

const imageUrl =
  "https://raw.githubusercontent.com/Lindennerd/olavo-tem-razao/master/public/olavo-post.jpg";

const fontUrl =
  "https://raw.githubusercontent.com/Lindennerd/olavo-tem-razao/master/public/open-sans-32-black.fnt";

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

  console.log("h1");

  const image = await jimp.read(imageUrl);

  console.log("h2");
  const font = await jimp.loadFont(jimp.FONT_SANS_32_BLACK);

  console.log("h3");

  const printedImage = await image.print(font, 10, 90, text, 700, 100);
  const imgUrl = await printedImage.getBase64Async("image/jpeg");

  return imgUrl;
}
