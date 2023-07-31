import "dotenv/config";
import { Client } from "whatsapp-web.js";
import fs from "fs";

const prefix = process.env.PREFIX!;

const message = (client: Client) => {
    client.on("message", async (message) => {
        const commandFiles = fs.readdirSync("./src/commands").filter((file) => file.endsWith(".ts"));
        for (const file of commandFiles) {
            const fileName = file.split(".")[0] + ".js";
            const commandModule = await import(`../commands/${fileName}`);
            const commands = commandModule.default;

            const command = message.body.split(" ")[0].replace(prefix, "");
            const args = message.body.split(" ").slice(1);

            if (message.body.startsWith(prefix)) {
                if (commands.name === command) {
                    commands.run(message, args);
                }
            } else if (commands.aliases?.includes(command)) {
                commands.run(message, args);
            }
        }
    });
}

export default message;