import "dotenv/config";

import fs from "fs";
import {Client, Message} from "whatsapp-web.js";

const prefix: string = process.env.PREFIX!;

const message = (client: Client): void => {
    client.on("message", async (message: Message) => {
        const command = message.body.split(" ")[0].replace(prefix, "");
        
        const listCommands: {
            name: string;
            description: string;
            aliases: string[] | undefined;
        }[] = [];

        const commandFiles = fs.readdirSync(process.env.TYPE! === 'development' ? "./src/commands" : './build/commands');
        for (const file of commandFiles) {
            const commandModule = await import(`../commands/${file}`);
            const commands = commandModule.default;

            listCommands.push({
                name: commands.name,
                description: commands.description,
                aliases: commands.aliases,
            });


            if (message.body.startsWith(prefix)) {
                if (commands.name.split(' ').length > 1) {
                    const splittedData: string[] = commands.name.split(' ');
                    const newData: string[] = splittedData.slice(1)
                    const stringifiedNewData: string = newData.join(' ');
                    commands.run(stringifiedNewData, client);
                } else if (commands.name === command) {
                    commands.run(message, client);
                }
            } else if (commands.aliases?.includes(command)) {
                commands.run(message);
            }
        }

        if (command === "help") {
            let text = "*List Perintah Bot*\n";
            listCommands.forEach((command) => {
                text += `\n${prefix}${command.name}: ${command.description}`;
            });
            await message.reply(text);
        }
    });
}

export default message;