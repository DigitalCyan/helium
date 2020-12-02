import * as path from 'path';
import * as fs from 'fs';

import StartupModule from '../Interfaces/StartupModule';

export default class StartupMaster {
    public init = async () => {
        const startupDir = path.join(__dirname, '../Startup');

        let files = fs.readdirSync(startupDir);
        files = files.filter((filename) => filename.endsWith('.ts'));

        for (const file of files) {
            try {
                const module = await import(path.join(startupDir, file));
                (module.default as StartupModule).function();
            } catch {
                console.log(
                    `ERROR | Startup module ${file} is invalid. Make sure you set an object that implements StartupModule interface as a default export.`
                );
            }
        }
    };
}
