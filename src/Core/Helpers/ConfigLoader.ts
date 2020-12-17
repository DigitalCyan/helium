import * as path from 'path';
import * as fs from 'fs';

import ConfigInterface from '../Interfaces/ConfigInterface';

export default (): ConfigInterface => {
    console.log(path.join(__dirname, '../../../'))
    return {
        prefix: '!'
    }
}