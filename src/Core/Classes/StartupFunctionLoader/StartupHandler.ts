import Helium from '../Helium/Helium';
import executeStartupFunctions from './ExecuteStartupFunctions'

import * as log from '../../Helpers/Logger'

export default class StartupHandler {
    //#region Singleton
    private static _instance: StartupHandler;
    public static get instance(): StartupHandler {
        if (!this._instance) {
            this._instance = new StartupHandler();
        }
        return this._instance;
    }
    //#endregion
    
    public init(){
        executeStartupFunctions(Helium.instance.config.startupPaths);
    }
}