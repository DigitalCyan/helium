import { Message } from 'discord.js';

export default interface HandleBundleInterface {
    message: Message;
    command: string;
    arguments: string[];
}
