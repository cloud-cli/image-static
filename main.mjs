import { existsSync } from "node:fs";
import { readdir } from "node:fs/promises";

const enableIndex = !!process.env.ENABLE_INDEX;
const noIndexFile = !existsSync("./dist/index.html");

export default async function (request, response, next) {
  if (
    enableIndex &&
    noIndexFile &&
    request.method === "GET" &&
    request.url === "/"
  ) {
    const list = await readdir("/home/app/dist", { withFileTypes: true });
    const files = list
      .filter((f) => f.isFile())
      .map(({ name }) => `<a href="/${name}" title="Open ${name}">${name}</a>`);

    const html = "<h1>Files:</h1><hr/><nav>" + files.join("<br/>") + "</nav>";

    response.end(html);
    return;
  }

  next();
}
