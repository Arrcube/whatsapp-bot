import {Client, Message, MessageMedia} from "whatsapp-web.js";

import {Command} from "../utils/command.js";

export default new Command({
    name: "sticker",
    description: "Membuat sticker dari gambar",
    aliases: [],
    async run(message: Message, client: Client) {
        if(message.hasMedia) {
            const media: MessageMedia = await message.downloadMedia();
            await client.sendMessage(message.from, media, {
                sendMediaAsSticker: true,
                stickerAuthor: "@agustacandi",
                stickerName: "Sticker by Kurumi Bot",
            })
        } else {
            await message.reply("Kirim atau reply gambar dengan caption .sticker");
        }
    },
});