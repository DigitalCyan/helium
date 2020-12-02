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

       this.bot = new Client();

       this.startupMaster = new StartupMaster();
       await this.startupMaster.init();

       this.commandMaster = new CommandMaster();
       await this.commandMaster.init();

       this.bot.addListener(
           'message',
           BotMaster.instance.commandMaster.handler
       );

       this.bot.login(botToken);
    };
}
