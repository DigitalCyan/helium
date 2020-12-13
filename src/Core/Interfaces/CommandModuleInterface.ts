import HandleBundleInterface from './HandleBundleInterface';

export default interface CommandModuleInterface {
    command: string;
    handle(HandleBundleInterface);
}
