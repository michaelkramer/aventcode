// @flow
export function startWebServer() {
  // this function exists standalone is case there are Web server startup scripts

  require("./server/web/router"); // eslint-disable-line
}
