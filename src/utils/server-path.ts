import path from "path";
import * as url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const serverPath = (staticFilePath: string) => {
  return path.join(__dirname, staticFilePath);
};

export default serverPath;
