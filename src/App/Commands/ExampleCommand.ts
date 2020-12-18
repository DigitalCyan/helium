import CommandModuleInterface from '../../Core/Interfaces/CommandModuleInterface';
import HandleBundleInterface from '../../Core/Interfaces/HandleBundleInterface';

export default class Test implements CommandModuleInterface {
    public command = 'example';
    public usage = 'example';
    public description = 'Example command!'

    private a = 5;

    public init(){
        console.log('Initilized ExampleCommand.ts')
    }

    public handle(handleBundle: HandleBundleInterface) {
        handleBundle.message.channel.send(`Yes the bot is up and running! Now delete this command and do something more productive!`)
    }
}
