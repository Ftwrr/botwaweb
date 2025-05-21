import Helper from "../lib/helper.js";
import fs from "fs";
import readline from "readline";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!Helper.isOwner(m)) return;
  // conn.sendMessage(m.chat, "text")
  async function processTimingFile(filePath) {
    // Function to parse the timing and text
    function parseLine(line) {
      const match = line.match(/\[(\d{2}:\d{2}.\d{2})\](.+)/);
      if (match) {
        const time = match[1];
        const text = match[2].replace(/[\[\(].*?[\]\)]/g, "").trim();
        return { time, text };
      }
      return null;
    }

    // Function to convert timestamp to milliseconds
    function timeToMilliseconds(time) {
      const [minutes, seconds] = time.split(":");
      const [secs, millis] = seconds.split(".");
      return (
        (parseInt(minutes, 10) * 60 + parseInt(secs, 10)) * 1000 +
        parseInt(millis, 10)
      );
    }

    const lines = [];
    let previousTime = null;
    let delay = 0;

    // Create a read stream from the file
    const fileStream = fs.createReadStream(filePath);

    // Create an interface to read the file line by line
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    // Read and parse the file
    for await (const line of rl) {
      const parsed = parseLine(line);
      if (parsed) {
        const currentTime = timeToMilliseconds(parsed.time);
        if (previousTime !== null) {
          const gap = currentTime - previousTime;
          delay += gap;
        }
        lines.push({ delay, text: parsed.text });
        previousTime = currentTime;
      }
    }

    console.log("Finished reading file");

    // Function to log lines with the appropriate delay
    function logLinesWithDelay() {
      lines.forEach(({ delay, text }) => {
        setTimeout(async () => {
          // console.log(`Text: ${text}, Logged after ${delay} ms`);
          const msg = await conn.sendMessage(m.chat, text);
          // m.reply(text)
        }, delay);
      });
    }

    logLinesWithDelay();
  }
  // const participants = (await m.getChat()).participants.map(v => v.id._serialized);
  // conn.sendMessage(m.chat, "selamat oagi", { mentions: participants })
  processTimingFile("lib/lyrics.txt");
};

handler.customPrefix = /^(musik)$/i;
handler.command = new RegExp();

handler.disabled = true;

export default handler;
