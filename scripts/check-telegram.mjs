#!/usr/bin/env node
/**
 * На сервері після оновлення .env:
 *   node scripts/check-telegram.mjs
 */
import fs from "fs";
import path from "path";

const envPath = path.join(process.cwd(), ".env");
if (!fs.existsSync(envPath)) {
  console.error("No .env file found");
  process.exit(1);
}

const env = Object.fromEntries(
  fs
    .readFileSync(envPath, "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.trim().startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    })
);

const token = env.TELEGRAM_BOT_TOKEN;
let chatId = env.TELEGRAM_CHAT_ID || "-1002869885680";
if (chatId === "-1002254847974") {
  console.warn("Obsolete TELEGRAM_CHAT_ID detected, using -1002869885680");
  chatId = "-1002869885680";
}

if (!token) {
  console.error("TELEGRAM_BOT_TOKEN missing");
  process.exit(1);
}

const me = await fetch(`https://api.telegram.org/bot${token}/getMe`).then((r) =>
  r.json()
);
console.log("getMe:", me.ok ? `OK @${me.result?.username}` : me.description);

const chat = await fetch(`https://api.telegram.org/bot${token}/getChat`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ chat_id: chatId }),
}).then((r) => r.json());
console.log(
  "getChat:",
  chat.ok ? `OK ${chat.result?.title}` : chat.description,
  `(id ${chatId})`
);

const send = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    chat_id: chatId,
    text: "✅ check-telegram.mjs — форми сайту мають працювати",
  }),
}).then((r) => r.json());
console.log("sendMessage:", send.ok ? "OK" : send.description);

process.exit(me.ok && chat.ok && send.ok ? 0 : 1);
