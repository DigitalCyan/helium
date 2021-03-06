import fetchCommandModulePaths from './FetchCommandModulePaths';
import * as log from '../../Helpers/Logger';
import CommandHandler from '../CommandHandler/CommandHandler';
import CommandModuleInterface from '../../Interfaces/CommandModuleInterface';
import Helium from '../Helium/Helium';

export default class Registrator {
    //#region Singleton
    private static _instance: Registrator;
    public static get instance(): Registrator {
        if (!this._instance) {
            this._instance = new Registrator();
        }
        return this._instance;
    }
    //#endregion

    public async init() {
        await this.registerCommandModules();
    }

    private async registerCommandModules() {
        const modulePaths = fetchCommandModulePaths(Helium.instance.config.commandPaths);
        for (const modulePath of modulePaths) {
            try {
                const module = new (await import(modulePath)).default();
                if (this.isCommandModule(module)) {
                    if (module.init) {
                        module.init();
                    }
                    CommandHandler.instance.commandMap.set(module.command, module);
                    //TODO: Init a module if a init function is provided!
                } else {
                    throw `Helium | Typeguard failiure. The module ${modulePath} does not implement CommandModuleInterface.`;
                }
            } catch (err) {
                log.error(
                    `Error registering ${modulePath}. Please make sure the class implements CommandModuleInterface and has no errors.`,
                    err
                );
            }
        }
    }

    private isCommandModule(module: CommandModuleInterface): boolean {
        return module.command && module.description && module.usage && module.handle instanceof Function;
    }
}
