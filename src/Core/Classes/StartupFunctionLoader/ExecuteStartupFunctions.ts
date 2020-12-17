import * as path from 'path';
import * as fs from 'fs';
import * as log from '../../Helpers/Logger';

export default async (directories: string[]) => {
    const modulePaths: string[] = new Array();

    for (const directory of directories) {
        const fullDirPath = path.join(__dirname, `../../../${directory}`);

        if (!fs.existsSync(fullDirPath)) {
            log.error(`Path ${fullDirPath} does not exist!`);
            continue;
        }

        const files = fs.readdirSync(fullDirPath).filter((f) => f.endsWith('.ts'));

        for (const file of files) {
            modulePaths.push(path.join(fullDirPath, file));
        }
    }

    for(const modulePath of modulePaths){
        try {
            const module = await import(modulePath)
            module.default()
        }catch(err){
            log.error(`The default export of ${modulePath} is likely not a function or it has an error.`, err);
        }
    }
};
