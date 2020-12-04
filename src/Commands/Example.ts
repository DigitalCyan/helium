import { Message } from 'discord.js';
import BotMaster from '../Core/BotMaster';
import Command from '../Interfaces/Command';
import CommandModule from '../Interfaces/CommandModule';

const module: CommandModule = {
    command: 'example',
    description: 'Example command!',
    usage: `${BotMaster.instance.config.prefix}example`,
    function: (msg: Message, cmd: Command) => {
        msg.channel.send(
            'Hello! This is an example command! Please dont forget to remove it!'
        );
    },
};

export default module;
