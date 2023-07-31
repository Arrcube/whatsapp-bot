import { Message } from "whatsapp-web.js";

export class Command<T extends any[]> {
    name: string;
    description: string;
    aliases: string[] | undefined;
    run: (message: Message, args: T) => Promise<void>;

    constructor(props: {
        name: string;
        description: string;
        aliases: string[] | undefined;
        run: (message: Message, args: T) => Promise<void>;
    }) {
        this.name = props.name;
        this.description = props.description;
        this.aliases = props.aliases;
        this.run = props.run;
    }
}