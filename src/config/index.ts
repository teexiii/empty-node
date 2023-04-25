import { config } from 'dotenv';
const dotenv = config({ path: '.env' });
const __env = dotenv?.parsed || {};

export const PORT = __env.PORT || 4000;
