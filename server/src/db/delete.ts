//this files deletes the links model
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { links } from './schema';

// 🧾 Hardcoded DB connection info — edit to match your local setup
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'myapp_admin',         
  password: 'superSecret123!',
  database: 'myapp_db',      
});

const db = drizzle(pool);

async function deleteAllLinks() {
  try {
    await db.delete(links);
    console.log('✅ All links deleted.');
  } catch (err) {
    console.error('❌ Failed to delete links:', err);
  } finally {
    await pool.end();
  }
}

deleteAllLinks();

