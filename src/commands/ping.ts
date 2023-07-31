import { Command } from "../utils/command.js";

export default new Command({
    name: "ping", 
    description: "ping pong", 
    aliases: ["pong"],
    async run(message, args) {
        message.reply("pong");
    },
});