import { Message } from 'discord.js';
import BotMaster from '../Core/BotMaster';
import Command from '../Interfaces/Command';
import CommandModule from '../Interfaces/CommandModule';

const module: CommandModule = {
    command: 'args',
    description: 'Example command!',
    usage: `${BotMaster.instance.config.prefix}example`,
    function: (msg: Message, cmd: Command) => {
        msg.channel.send(`\`\`\`${JSON.stringify(cmd.args, undefined, 2)}\`\`\``);
    },
};

export default module;
