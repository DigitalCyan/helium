import HandleBundleInterface from './HandleBundleInterface';
export default interface CommandModuleInterface {
    command: string;
    usage: string;
    description: string;
    handle(HandleBundleInterface);
}
