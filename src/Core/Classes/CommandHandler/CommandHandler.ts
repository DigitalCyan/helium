import { Message } from 'discord.js';
import parseMessageContent from '../../Helpers/ParseMessageContent';
import CommandInterface from '../../Interfaces/CommandInterface';
import CommandModuleInterface from '../../Interfaces/CommandModuleInterface';
import HandleBundleInterface from '../../Interfaces/HandleBundleInterface';
import Helium from '../Helium';
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
        if(!message.content.startsWith(Helium.instance.config.prefix)){
            return;
        }


        const command: CommandInterface = parseMessageContent(message.content);
        if (CommandHandler.instance.commandMap.has(command.command)) {
            const handleBundle: HandleBundleInterface = {
                message: message,
                command: command,
            };
            CommandHandler.instance.commandMap.get(command.command).handle(handleBundle);
        }
    }
}
