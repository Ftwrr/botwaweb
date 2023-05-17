import { join, dirname } from "path";
import { createRequire } from "module";
import { fileURLToPath } from "url";
import { setupPrimary, fork } from "cluster";
import { watchFile, unwatchFile } from "fs";
import { createInterface } from "readline";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(__dirname); // Bring in the ability to create the 'require' method
const { name, author } = require(join(__dirname, "./package.json")); // https://www.stefanjudis.com/snippets/how-to-import-json-files-in-es-modules-node-js/
const rl = createInterface(process.stdin, process.stdout);

console.log(`'${name}' By @${author.name || author}`);
var isRunning = false;
var resetInterval;
/**
 * Start a js file
 * @param {String} file `path/to/file`
 */
function start(file) {
  if (isRunning) return;
  isRunning = true;
  let args = [join(__dirname, file), ...process.argv.slice(2)];
  setupPrimary({
    exec: args[0],
    args: args.slice(1),
  });
  let p = fork();
  p.on("message", (data) => {
    console.log("[RECEIVED]", data);
    switch (data) {
      case "reset":
        p.process.kill();
        isRunning = false;
        clearInterval(resetInterval);
        start.apply(this, arguments);
        break;
      case "uptime":
        p.send(process.uptime());
        break;
    }
  });
  p.on("exit", (_, code) => {
    isRunning = false;
    console.error("Exited with code:", code);
    if (code !== "SIGTERM") start(file);
  });
  if (!rl.listenerCount())
    rl.on("line", (line) => {
      p.emit("message", line.trim());
    });
  resetInterval = setInterval(() => {
    p.emit("message", "reset"); // Send "reset" message every 1 minute
  }, 12 * 60 * 60 * 1000);
}

start("main.js");
