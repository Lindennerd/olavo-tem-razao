import { createRouter } from "./context";
import jimp from "jimp";
import { z } from "zod";
import OlavosMind from "../../lib/olavosMind";

export const generateRouter = createRouter().query("random", {
  async resolve({ ctx, input }) {
    const olavosMind = OlavosMind();
    const text = olavosMind.generateTheory();

    const image = await jimp.read("./public/olavo-post.jpg");
    const font = await jimp.loadFont(jimp.FONT_SANS_32_BLACK);
    const printedImage = await image.print(font, 10, 90, text, 700, 100);
    const imgUrl = await printedImage.getBase64Async(jimp.MIME_JPEG);

    return imgUrl;
  },
});
