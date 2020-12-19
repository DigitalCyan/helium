import * as fs from 'fs';
import { join } from 'path';

export const getFiles = async(paths: string[]): Promise<string[]> => {
    const filePaths: string[] = [];
    const rootDir = join(__dirname, '../../');
    for (const path of paths) {
        const fullpath = join(rootDir, path)
        const files = fs.readdirSync(fullpath);
        for(const filePath of files){
            filePaths.push(join(fullpath, filePath))
        }
    }
    return filePaths;
};

export const getModules = async(paths: string[]): Promise<any[]> => {
    const modules: any[] = [];
    for (const path of paths) {
        modules.push(await import(path))
    }
    return modules;
}


