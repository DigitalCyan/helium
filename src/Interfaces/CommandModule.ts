import { Message } from 'discord.js';
import Command from './Command';

export default interface CommandModule {
    command: string;
    description: string;
    usage: string;
    function(message: Message, command: Command);
}
