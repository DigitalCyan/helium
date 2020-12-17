import CommandModuleInterface from '../../Core/Interfaces/CommandModuleInterface';
import HandleBundleInterface from '../../Core/Interfaces/HandleBundleInterface';

export default class Test implements CommandModuleInterface {
    public command = 'test';
    public usage = 'test';
    public description = 'Test command!'
    public handle(handleBundle: HandleBundleInterface) {
        handleBundle.message.channel.send('Yes, the bot is running. Now go remove this command from the project and do something more productive.')
    }
}
