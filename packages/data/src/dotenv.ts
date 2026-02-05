import { findUp } from 'find-up';
import dotenv from 'dotenv';

const envPath = await findUp('.env');
dotenv.config({ path: envPath });
