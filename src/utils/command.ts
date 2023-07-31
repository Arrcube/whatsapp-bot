import {Client, Message} from "whatsapp-web.js";

export class Command<T extends never[]> {
    name: string;
    description: string;
    aliases: string[] | undefined;
    run: (message: Message, client: Client, args: T) => Promise<void>;

    constructor(props: {
        name: string;
        description: string;
        aliases: string[] | undefined;
        run: (message: Message, client: Client, args: T) => Promise<void>;
    }) {
        this.name = props.name;
        this.description = props.description;
        this.aliases = props.aliases;
        this.run = props.run;
    }
}