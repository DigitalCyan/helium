import CommandModuleInterface from '../../Interfaces/CommandModuleInterface';

export default class CommandHandler {
    //#region Singleton
    private static _instance: CommandHandler;
    public static get instance(): CommandHandler {
        if (!this._instance) {
            this._instance = new CommandHandler();
        }
        return this._instance;
    }
    //#endregion
    
    public commandMap: Map<string, CommandModuleInterface> = new Map();

    public async init(){
        console.log(this.commandMap)
    }
}
