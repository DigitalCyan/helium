import * as chalk from 'chalk';
export default class Logger {
    //#region Singleton
    private static _instance: Logger;
    public static get instance() {
        if (!this._instance) {
            this._instance = new Logger();
        }
        return this._instance;
    }
    //#endregion
    
    public log(message: string) {
        console.log(message);
    }

    public logGood(message: string){
        console.log(chalk.green(message))
    }

    public logWarning(message: string) {
        console.log(chalk.yellow(message));
    }

    public logError(message: string, error?: string) {
        console.log(chalk.red(message));
        if(error){
            console.log(chalk.red(error))
        }
    }
}
