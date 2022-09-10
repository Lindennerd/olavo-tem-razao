import { createRouter } from "./context";
import jimp from "jimp";
import { z } from "zod";
import OlavosMind from "../../lib/olavosMind";
import { TRPCError } from "@trpc/server";

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
  console.log("args", args);

  const olavosMind = OlavosMind();
  const text = olavosMind.generateTheory(
    args?.who,
    args?.are,
    args?.isWorkingWith,
    args?.todo
  );

  console.log("generating image");

  const image = await jimp.read(
    "https://raw.githubusercontent.com/Lindennerd/olavo-tem-razao/master/public/images/olavo-post.jpg"
  );
  const font = await jimp.loadFont("jimp.FONT_SANS_32_BLACK");
  const printedImage = await image.print(font, 10, 90, text, 700, 100);
  const imgUrl = await printedImage.getBase64Async(jimp.MIME_JPEG);

  return imgUrl;
}
