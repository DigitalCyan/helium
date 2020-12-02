import { Message } from 'discord.js';
import BotMaster from '../Classes/BotMaster';
import CommandModule from '../Interfaces/CommandModule';

const module: CommandModule = {
    command: 'example',
    description: 'Example command!',
    usage: `${BotMaster.instance.prefix}example`,
    function: (msg: Message) => {
        msg.channel.send(
            'Hello! This is an example command! Please dont forget to remove it!'
        );
    },
};

export default module;
