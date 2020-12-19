import Helium from '../Helium/Helium';
import * as fileFetching from '../../Helpers/FileUtils';

import * as log from '../../Helpers/Logger';

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

    public async init() {
        const paths = Helium.instance.config.startupPaths;
        const files = await fileFetching.getFiles(paths);
        for (const file of files) {
            try {
                const module = new (await import(file)).default();
                module.handle();
            } catch {
                log.error(`The module does not have a consturctor or it does not implement StartupModuleInterface.`)
            }
        }
    }
}
