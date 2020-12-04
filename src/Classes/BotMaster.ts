import { Client } from 'discord.js';
import Config from '../Interfaces/Config';
import CommandMaster from './CommandMaster';
import StartupMaster from './StartupMaster';
import * as utils from './Utils';
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
    public config: Config | null;

    public init = async () => {
        utils.logGood('Starting Helium...');
        this.config = utils.readConfig();

        if (!this.config || !this.config.token) {
            utils.logError('No bot token provided!');
            return;
        }

        this.bot = new Client();

        this.startupMaster = new StartupMaster();
        await this.startupMaster.init();

        this.commandMaster = new CommandMaster();
        await this.commandMaster.init();

        this.bot.addListener(
            'message',
            this.commandMaster.handler
        );

        this.bot.login(this.config.token);
        utils.logGood('Bot ready');
    };
}
