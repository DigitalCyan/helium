import * as path from 'path';
import * as fs from 'fs';
import Logger from '../Helpers/Logger';

import Registrator from './Registrator/Registrator';
import CommandHandler from './CommandHandler/CommandHandler';

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

    public async init() {
        await Registrator.instance.init();
        await CommandHandler.instance.init();
    }
}
