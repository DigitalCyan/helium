import * as path from 'path';
import * as fs from 'fs';
import * as log from '../../Helpers/Logger';

export default (directories: string[]): string[] => {
    const modules: string[] = new Array();

    for (const directory of directories) {
        const fullDirPath = path.join(__dirname, `../../../${directory}`);

        if (!fs.existsSync(fullDirPath)) {
            log.error(`Path ${fullDirPath} does not exist!`);
            continue;
        }

        const files = fs.readdirSync(fullDirPath).filter((f) => f.endsWith('.ts'));

        for (const file of files) {
            modules.push(path.join(fullDirPath, file));
        }
    }

    return modules;
};
