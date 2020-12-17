import { Message } from 'discord.js';
import Helium from '../../Core/Classes/Helium/Helium';

export default () => {
    Helium.instance.client.on('message', (message: Message) => {
        if (message.author.id != Helium.instance.client.user.id) {
            message.reply('k');
        }
    });
};
