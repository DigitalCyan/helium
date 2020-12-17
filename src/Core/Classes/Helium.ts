import * as path from 'path';
import * as fs from 'fs';
import configLoader from '../Helpers/ConfigLoader'
import Logger from '../Helpers/Logger';
import ConfigInterface from '../Interfaces/ConfigInterface'

import CommandHandler from './CommandHandler/CommandHandler';
import { Client } from 'discord.js';

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
        return this._client;
    }
    
    public config: ConfigInterface;

    public async init() {
        this.config = configLoader()
        // TODO: Add a startup module loader
        await CommandHandler.instance.init();
        await this.initClient();
        console.log(CommandHandler.instance.commandMap)
        Logger.instance.logGood('READY!')
    }

    private async initClient() {
        this._client = new Client();
        this._client.on('message', CommandHandler.instance.handler);
        this._client.login(process.env.BOT_TOKEN);
    }
}
