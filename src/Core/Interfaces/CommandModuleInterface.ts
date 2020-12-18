import HandleBundleInterface from './HandleBundleInterface';
export default interface CommandModuleInterface {
    command: string;
    usage: string;
    description: string;
    init?(): void;
    handle(HandleBundleInterface): void;
}
