import * as path from 'path';
import * as fs from 'fs';

import { Message } from 'discord.js';
import Command from '../Interfaces/Command';
import CommandModule from '../Interfaces/CommandModule';
import BotMaster from './BotMaster';
import * as utils from './Utils'

export default class CommandMaster {

    public commandsMap = new Map<string, CommandModule>();

    public init = async () => {
        const commandsDir = path.join(__dirname, '../Commands');
        
        let files = fs.readdirSync(commandsDir);
        files = files.filter((filename) => filename.endsWith('.ts'))

        for (const file of files) {
            try {
                const module = await import(path.join(commandsDir, file));
                const commandModule = (module.default as CommandModule);
                this.commandsMap.set(commandModule.command, commandModule)
            } catch {
                utils.logError(`Command module ${file} is invalid. Make sure you set an object that implements StartupModule interface as a default export.\n`);
            }
        }
    };

    public handler = (msg: Message) => {
        if (!this.isCommand(msg.content)) {
            return;
        }

        const cmd: Command = this._parse(msg.content);
        if(this.commandsMap.has(cmd.command)){
            this.commandsMap.get(cmd.command).function(msg)
        }
    };

    private _parse = (messageText: String): Command => {
        messageText = messageText.substr(BotMaster.instance.prefix.length);
        const args = messageText.split(' ');
        const cmd = args[0];
        args.shift();
        return {
            command: cmd,
            args: args,
        };
    };

    public isCommand = (messageText: string) => {
        return messageText.search(BotMaster.instance.prefix) == 0;
    };
}
