import configLoader from './ConfigLoader';
import ConfigInterface from '../../Interfaces/ConfigInterface';
import CommandHandler from '../CommandHandler/CommandHandler';
import StartupHandler from '../StartupFunctionLoader/StartupHandler';
import { Client } from 'discord.js';
import * as log from '../../Helpers/Logger';

export default class Helium {
    //#region Singleton
    private static _instance: Helium;
    public static get instance(): Helium {
        if (!this._instance) {
            this._instance = new Helium();
        }
        return this._instance;
    }
    //#endregion

    private _client: Client;

    public get client() {
        if (!this._client) {
            this._client = new Client();
        }
        return this._client;
    }

    public config: ConfigInterface;

    public async init() {
        if (!process.env.BOT_TOKEN) {
            log.error('No bot token provided in env variable BOT_TOKEN.');
            return;
        }
        this.config = configLoader();
        await CommandHandler.instance.init();
        this.initClient();
        await StartupHandler.instance.init();
    }

    private initClient() {
        this.client.on('message', CommandHandler.instance.handler);
        this.client.login(process.env.BOT_TOKEN);
    }
}
