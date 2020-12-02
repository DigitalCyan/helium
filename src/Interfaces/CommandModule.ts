import { Message } from 'discord.js';

export default interface CommandModule {
    command: string;
    description: string;
    usage: string;
    function(msg: Message);
}
