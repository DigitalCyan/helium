import CommandHandler from '../../Core/Classes/CommandHandler/CommandHandler';
import Helium from '../../Core/Classes/Helium/Helium';
import CommandModuleInterface from '../../Core/Interfaces/CommandModuleInterface';
import HandleBundleInterface from '../../Core/Interfaces/HandleBundleInterface';

export default class Help implements CommandModuleInterface {
    public command = 'help';
    public description = 'show commands';
    public usage = 'help';

    private page = 1;
    private perPage = 5;
    private lastPage = 0;
    private commandNumber = 0;

    public handle(handleBundle: HandleBundleInterface): void {
        this.commandNumber = CommandHandler.instance.commandMap.size;
        this.lastPage = Math.ceil(this.commandNumber / this.perPage);

        this.page = this.getPage(handleBundle.command.args);

        if (this.page == 0) {
            handleBundle.message.channel.send('Page not found!');
            return;
        }

        const commands: CommandModuleInterface[] = [];

        CommandHandler.instance.commandMap.forEach((v, k) => {
            commands.push(v);
        });

        const start = (this.page - 1) * this.perPage;
        const end = start + this.perPage - 1;

        let out = '\nAvailable commands:\n```\n';
        commands.slice(start, end + 1).forEach((v, k) => {
            out += `${v.command} | ${v.description}\nUsage: ${Helium.instance.config.prefix}${v.usage}\n\n`;
        });
        out += `\`\`\`\n Use \`${Helium.instance.config.prefix}help <number>\` to select a page.\nPage ${this.page} of ${this.lastPage}`;

        handleBundle.message.channel.send(out);
    }

    private getPage(args: string[]): number {
        let page = 1;
        if (args[0]) {
            try {
                page = parseInt(args[0]);
            } catch {}
        }
        if (page < 1 || page > this.lastPage) {
            return 0;
        }
        return page;
    }
}
