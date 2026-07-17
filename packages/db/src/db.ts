import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import path from 'path';

const dbFile = process.env.NODE_ENV === 'test' ? 'test.sqlite' : 'db.sqlite';
const sqlite = new Database(path.resolve(process.cwd(), '../../', dbFile));
const db = drizzle(sqlite);

export default db;
