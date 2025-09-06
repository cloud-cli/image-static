import { existsSync, statSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { join, normalize } from 'node:path';

const enableIndex = !!process.env.ENABLE_INDEX;
const noIndexFile = !existsSync("./dist/index.html");
const rootDir = '/home/app/dist';

export default async function (request, response, next) {
  const url = new URL(request.url, 'http://local');
  
  if (url.pathname === 'favicon.ico') {
    return next();
  }
  
  const isGet = request.method === "GET";
  const relativePath = normalize(url.pathname);
  const fullPath = join(rootDir, relativePath);
  const showList = (enableIndex && noIndexFile && isGet && request.url === "/") ||
    (enableIndex && isGet && existsSync(fullPath) && statSync(fullPath).isDirectory() && !existsSync(join(fullPath, 'index.html')));

  if (showList) {
    const list = await readdir(fullPath, { withFileTypes: true });
    const files = list.map(({ name }) => `<a href="${join(relativePath, name)}" title="Open ${name}">${name}</a>`);

    const html = "<h1>Files at " + fullPath.replace(rootDir, '') + "</h1><hr/><nav>" + files.join("<br/>") + "</nav>";

    response.end(html);
    return;
  }

  next();
}
