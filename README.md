# ghcr.io/cloud-cli/static

Statics server using [Superstatic](https://www.npmjs.com/package/superstatic) and Node.JS

## Usage

Mount a folder into /home/app/dist and provide an environment variable called `PORT` to run it:

```sh
docker run -v /local/folder:/home/app/dist -p80:1234 -e PORT=1234 ghcr.io/cloud-cli/static:latest
```
