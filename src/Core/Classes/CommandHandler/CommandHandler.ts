import { Message } from 'discord.js';
import parseMessageContent from './ParseMessageContent';
import CommandInterface from '../../Interfaces/CommandInterface';
import CommandModuleInterface from '../../Interfaces/CommandModuleInterface';
import HandleBundleInterface from '../../Interfaces/HandleBundleInterface';
import Helium from '../Helium/Helium';
import Registrator from '../Registrator/Registrator';

export default class CommandHandler {
    //#region Singleton
    private static _instance: CommandHandler;
    public static get instance(): CommandHandler {
        if (!this._instance) {
            this._instance = new CommandHandler();
        }
        return this._instance;
    }
    //#endregion

    public commandMap: Map<string, CommandModuleInterface> = new Map();

    public async init() {
        await Registrator.instance.init();
    }

    public async handler(message: Message) {
        const prefix = Helium.instance.config.prefix;
        if (!message.content.startsWith(prefix)) {
            return;
        }
        const messageContent = message.content.substr(prefix.length);

        const command: CommandInterface = parseMessageContent(messageContent);

        if (CommandHandler.instance.commandMap.has(command.command)) {
            const handleBundle: HandleBundleInterface = {
                message: message,
                command: command,
            };
            CommandHandler.instance.commandMap.get(command.command).handle(handleBundle);
        }
    }
}
