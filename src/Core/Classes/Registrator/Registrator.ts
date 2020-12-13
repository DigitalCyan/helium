import { fetchModulePaths } from '../../Helpers/ModulePathFethcer';
import Logger from '../../Helpers/Logger';
import CommandHandler from '../CommandHandler/CommandHandler';
import CommandModuleInterface from '../../Interfaces/CommandModuleInterface';

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
        const commandModuleDirs = ['./App/Commands'];
        const modulePaths = fetchModulePaths(commandModuleDirs);
        for (const modulePath of modulePaths) {
            try {
                console.log(modulePath);
                const module = new (await import(modulePath)).default();
                if (this.isCommandModule(module)) {
                    CommandHandler.instance.commandMap.set(
                        module.command,
                        module
                    );
                }else{
                    throw `Helium | Typeguard failiure. The module ${modulePath} does not implement CommandModuleInterface.`
                }
            } catch (err) {
                Logger.instance.logError(
                    `Error registering ${modulePath}. Please make sure the class implements CommandModuleInterface and has no errors.`,
                    err
                );
            }
        }
        console.log(CommandHandler.instance.commandMap);
    }

    private isCommandModule(module: CommandModuleInterface): boolean {
        return module.command && module.handle instanceof Function;
    }
}
