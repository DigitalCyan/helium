import { Message } from 'discord.js';
import CommandInterface from './CommandInterface';

export default interface HandleBundleInterface {
    message: Message;
    command: CommandInterface;
}
