import { Client } from 'discord.js';
import CommandMaster from './CommandMaster';
import StartupMaster from './StartupMaster';

export default class BotMaster {
    private static _instance: BotMaster;
    public static get instance(): BotMaster {
        if (!this._instance) {
            this._instance = new BotMaster();
        }
        return this._instance;
    }

    private _botToken: string;

    public bot: Client;
    public prefix = '!';

    public startupMaster: StartupMaster;
    public commandMaster: CommandMaster;

    public init = async (botToken: string) => {
        if (!botToken) {
            console.log('No bot token provided!');
            return;
        }

        BotMaster.instance.bot = new Client();

        BotMaster.instance.startupMaster = new StartupMaster();
        await BotMaster.instance.startupMaster.init();

        BotMaster.instance.commandMaster = new CommandMaster();
        await BotMaster.instance.commandMaster.init();

        BotMaster.instance.bot.addListener(
            'message',
            BotMaster.instance.commandMaster.handler
        );

        BotMaster.instance.bot.login(botToken);
    };
}
