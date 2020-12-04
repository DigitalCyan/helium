import { Message } from 'discord.js';
import BotMaster from '../Core/BotMaster';
import Command from '../Interfaces/Command';
import CommandModule from '../Interfaces/CommandModule';

const module: CommandModule = {
    command: 'help',
    description: 'A help command!',
    usage: `${BotMaster.instance.prefix}help`,
    function: (msg: Message, cmd: Command) => {
        let message = '```\nHELP\n---------------\n';
        BotMaster.instance.commandMaster.commandsMap.forEach((value, key) => {
            message += `${value.command} - ${value.description}\n`;
            message += `Usage: ${value.usage}\n---------------\n`;
        });
        message += '```';
        msg.channel.send(message);
    },
};

export default module;
