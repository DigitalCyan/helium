import { config } from 'dotenv';
config();

import BotMaster from './Core/BotMaster';

BotMaster.instance.init(process.env.BOT_TOKEN);
