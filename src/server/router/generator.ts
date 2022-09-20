import { createRouter } from "./context";
import jimp from "jimp";
import { z } from "zod";
import OlavosMind from "../../lib/olavosMind";
import serverPath from "../../utils/server-path";

const imageUrl =
  "https://raw.githubusercontent.com/Lindennerd/olavo-tem-razao/master/public/olavo-post.jpg";

const api_url =
  "http://lindennerd1.pythonanywhere.com/api/image/pasteTextOnImage";

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

  const result = await fetch(`${api_url}?text=${text}&imageUrl=${imageUrl}`);
  const json = await result.json();
  return json.image;
}
