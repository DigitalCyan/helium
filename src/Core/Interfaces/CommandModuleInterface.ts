import HandleBundleInterface from './HandleBundleInterface';
// TODO: Make sure to add: usage
export default interface CommandModuleInterface {
    command: string;
    handle(HandleBundleInterface);
}
