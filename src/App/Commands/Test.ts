import CommandModuleInterface from '../../Core/Interfaces/CommandModuleInterface';

import CommandBundleInterface from '../../Core/Interfaces/CommandModuleInterface';

export default class Test implements CommandModuleInterface {
    public command = 'test';
    public handle(handleBundle: CommandBundleInterface) {
        console.log(handleBundle.command);
    }
}
