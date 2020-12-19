import StartupModuleInterface from '../../Core/Interfaces/StartupModuleInterface';

export default class ExampleStartup implements StartupModuleInterface {
    public handle() {
        console.log('This is a startup file that was designed to annoy you till you study it and remove it.');
    }
}
