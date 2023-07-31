import Whatsapp, {Client, Message} from "whatsapp-web.js";

import {Command} from "../utils/command.js";

export default new Command({
    name: "about",
    description: "Tentang Kurumi Bot",
    aliases: [],
    async run(message: Message, client: Client) {
        await message.reply("Loading...");

        const media: Whatsapp.MessageMedia = await Whatsapp.MessageMedia.fromUrl("https://avatars.githubusercontent.com/u/78532599?s=200&v=4", {
            unsafeMime: true,
        });
        const req = await fetch("https://api.github.com/repos/Arrcube/whatsapp-bot/contributors");
        const res = await req.json();
        let contributors = "";
        res.forEach((data: Record<string, any>, i: number) => {
            contributors += `${i + 1}. 🧑🏻‍💻 \`\`\`${data.login}\`\`\` - 🎯 Contribute Point ${data.contributions}\n`;
        })
        await client.sendMessage(message.from, media, {
            caption: "Kurumi Bot adalah bot whatsapp yang dibuat oleh Arrcube Team. Bot ini dibuat menggunakan NodeJS dan library whatsapp-web.js. Source code bot ini bisa dilihat di pada\nhttps://github.com/Arrcube/whatsapp-bot\n\nList Contributor:\n" + contributors
        });
    },
});