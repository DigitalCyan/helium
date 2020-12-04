import * as chalk from 'chalk';
import * as path from 'path';
import * as fs from 'fs';
import Config from '../Interfaces/Config';

export const logError = (error: string) => {
    console.log(chalk.red(`ERROR | ${error}`));
};

export const logGood = (message: string) => {
    console.log(chalk.green(message))
}

export const readConfig = (): Config | null => {
    let config: Config;
    try{
        config = JSON.parse(fs.readFileSync(path.join(__dirname, '../../config.json')).toString())
    }catch{
        logError('Could not read config.json. Make sure the file exists in the repo root and that properties \"token\" and \"prefix\" are defined.')
        return null;
    }
    return config;
}