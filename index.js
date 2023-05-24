console.log("Starting...");

import { join, dirname } from "path";
import { createRequire } from "module";
import { fileURLToPath } from "url";
import cluster, { setupPrimary, fork } from "node:cluster";
import { watchFile, unwatchFile } from "fs";
import { createInterface } from "readline";

// https://stackoverflow.com/a/50052194
const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(__dirname); // Bring in the ability to create the 'require' method
const { name, author } = require(join(__dirname, "./package.json")); // https://www.stefanjudis.com/snippets/how-to-import-json-files-in-es-modules-node-js/
const rl = createInterface(process.stdin, process.stdout);
const file = "main.js";

console.log(`'${name}' By @${author.name || author}`);

let args = [join(__dirname, file), ...process.argv.slice(2)];
console.log([process.argv[0], ...args].join(" "));
setupPrimary({
  exec: args[0],
  args: args.slice(1),
});
if (cluster.isPrimary) {
  const worker = fork();
  worker.on("message", (data) => {
    console.log("[RECEIVED]", data);
    // switch (data) {
    //   case "reset":
    //     worker.process.kill();
    //     fork();
    // }
  });
  worker.on("exit", (_, code) => {
    console.error("Exited with code:", code);
    fork();
  });
  if (!rl.listenerCount())
    rl.on("line", (line) => {
      worker.emit("message", line.trim());
    });
  // setInterval(() => {
  //   worker.emit("message", "reset");
  // }, 6 * 60 * 60 * 1000);
}
