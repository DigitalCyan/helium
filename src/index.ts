import { config } from 'dotenv';
config();

import BotMaster from './Classes/BotMaster';

new BotMaster().init(process.env.BOT_TOKEN);