import * as chalk from 'chalk';
import * as path from 'path';
import * as fs from 'fs';
import Config from '../Interfaces/Config';
import BotMaster from './BotMaster';
import Command from '../Interfaces/Command';

export const logError = (error: string) => {
    console.log(chalk.red(`ERROR | ${error}`));
};

export const logGood = (message: string) => {
    console.log(chalk.green(message));
};

export const readConfig = (): Config | null => {
    let config: Config;
    try {
        config = JSON.parse(
            fs
                .readFileSync(path.join(__dirname, '../../config.json'))
                .toString()
        );
    } catch {
        logError(
            'Could not read config.json. Make sure the file exists in the repo root and that properties "token" and "prefix" are defined.'
        );
        return null;
    }
    return config;
};

export const parseCommand = (messageText: String): Command => {
    messageText = messageText.substr(BotMaster.instance.config.prefix.length);
    const args: Array<string> = [];
    const messageChars = messageText.split('');

    let inQuotes = false;
    let arg = '';

    messageChars.forEach((char, index) => {
        if (char == '"') {
            inQuotes = !inQuotes;
        }
        if ((char != ' ' || inQuotes) && char != '"') {
            arg += char;
        }
        if ((char == ' ' && !inQuotes) || index == messageChars.length - 1){
            args.push(arg);
            arg = ''
        }
    });

    const command = args[0];
    args.shift();

    return {
        command: command,
        args: args,
    };
};