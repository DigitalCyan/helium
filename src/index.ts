import { config } from 'dotenv';
config();

import BotMaster from './Classes/BotMaster';

BotMaster.instance.init(process.env.BOT_TOKEN);