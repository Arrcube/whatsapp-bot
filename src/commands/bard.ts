
import {askAI} from "bard-ai";
import {Message} from "whatsapp-web.js";

import {Command} from "../utils/command.js";

export default new Command({
    name: "bard",
    description: "AI seperti Chat-GPT tapi yang ini masih free",
    aliases: ["bard-ai"],
    async run(message: Message) {
        await message.reply(`Loading...`);
        const answer = await askAI(message.body.split(".bard ")[1]);
        await message.reply(`${answer}`);
    },
});