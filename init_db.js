const pool = require('./db_config');

async function initDatabase() {
  try {
    // Drop existing table if it exists
    await pool.query(`DROP TABLE IF EXISTS users CASCADE`);
    
    // Create fresh users table
    await pool.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Database initialized successfully');
  } catch (err) {
    console.error('Error initializing database:', err);
    process.exit(1);
  }
}

// Run if this is the main module
if (require.main === module) {
  initDatabase();
}

module.exports = initDatabase;
