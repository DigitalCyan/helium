import { Message } from 'discord.js';
import Command from '../Interfaces/Command';
import CommandModule from '../Interfaces/CommandModule';

const module: CommandModule = {
    command: 'args',
    description: 'Dumps the arguments into the same chat. Supports strings using "',
    usage: '.args <arguments>',
    function: (msg: Message, cmd:Command) => {
        msg.channel.send(`\`\`\`\n${JSON.stringify(cmd, undefined, 2)}\n\`\`\``);
    }
}

export default module;