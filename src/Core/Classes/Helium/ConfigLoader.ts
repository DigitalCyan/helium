import * as path from 'path';
import * as fs from 'fs';

import ConfigInterface from '../../Interfaces/ConfigInterface';
import * as logger from '../../Helpers/Logger';

export default (): ConfigInterface => {
    const config = JSON.parse(
        fs.readFileSync(path.join(__dirname, '../../../../config.json')).toString()
    ) as ConfigInterface;

    if (config.prefix && config.commandPaths && config.startupPaths) {
        return config;
    } else {
        logger.warning(
            'Could not set up the configuration. The config file (config.json) does not implement the interface correctly or has an error. Using a default config.'
        );
    }

    const defConfig: ConfigInterface = {
        prefix: '!',
        commandPaths: ['./App/Commands'],
        startupPaths: ['./App/Startup'],
    };
    return defConfig;
};
