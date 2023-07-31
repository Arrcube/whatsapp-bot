import "dotenv/config";

import Bard, { askAI } from "bard-ai";
import qrcode from "qrcode-terminal";
import { Client } from "whatsapp-web.js";
import fs from "fs";

import { listCommands } from "./config.js";
import message from "./events/message.js";

const client = new Client({
  puppeteer: {
    args: ["--no-sandbox"],
  },
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

const init = async () => {
  await Bard.init(process.env.BARD_COOKIE!);
  client.initialize();
};

init();

message(client);

// client.on("message", async (message) => {
//   const commandFiles = fs.readdirSync("./src/commands")
//     .filter((file) => file.endsWith(".ts"));
//   for (const file of commandFiles) {
//     const command = await import(`./commands/${file}`);
//     if (command.run.name === message.body.split(" ")[0]) {
//       command.run.run(message, message.body.split(" "));
//     }
//   }

//   if (listCommands.includes(message.body)) {
//     if (message.body === ".info") {
//       message.reply("info kosong");
//     }
//     if (message.body === ".ping") {
//       message.reply("pong");
//     }
//     if (message.body === ".help") {
//       message.reply(
//         "*List Perintah Bot*\n1. ```ping```: digunakan untuk mengirim ping ke bot.\n2. ```info```: digunakan untuk menampilkan informasi terbaru terkait kampus atau mata kuliah.\n3. ```cuaca```: digunakan untuk menampilkan cuaca dan temperatur yang ada di daerah Bondowoso.\n4. ```bard```: AI yang mirip Chat GPT buatan google yang bisa digunakan untuk bertanya semua hal. untuk penggunaannya gunakan perintah '.bard <kalimat tanya>'. contohnya '.bard apa itu teknik informatika?'."
//       );
//     }
//     if (message.body === ".cuaca") {
//       message.reply(`Loading...`);
//       const req = await fetch(process.env.WEATHER_API!);
//       const res = await req.json();
//       if (res.cod == 200) {
//         message.reply(
//           `*Cuaca ${res.name}*\n- Lat: ${res.coord.lat}\n- Lon: ${res.coord.lon}\n- Cuaca: ${res.weather[0].main}/${res.weather[0].description}\n- Temperatur: ${res.main.temp}\n- Kecepatan Angin: ${res.wind.speed}`
//         );
//       } else {
//         message.reply(`Gagal mendapatkan cuaca`);
//       }
//     }
//   } else if (message.body.split(" ")[0] === ".bard") {
//     message.reply(`Loading...`);
//     const answer = await askAI(message.body.split(".bard ")[1]);
//     message.reply(`${answer}`);
//   }
// });
