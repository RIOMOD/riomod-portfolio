import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

let pool = null;

if (connectionString) {
  pool = new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false // Required for Neon.tech cloud SSL
    }
  });

  // Verify connection and auto-initialize tables
  pool.connect()
    .then((client) => {
      console.log('✅ Connected to Neon.tech PostgreSQL database successfully!');
      const initSql = `
        CREATE TABLE IF NOT EXISTS portfolio_store (
          id VARCHAR(50) PRIMARY KEY DEFAULT 'main',
          data JSONB NOT NULL,
          layout JSONB NOT NULL,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `;
      return client.query(initSql)
        .then(() => {
          console.log('✅ Database schema verified/initialized in Neon.tech');
          client.release();
        });
    })
    .catch((err) => {
      console.error('⚠️ Could not connect to Neon.tech PostgreSQL database:', err.message);
    });
} else {
  console.log('ℹ️ No DATABASE_URL provided. Running in memory / LocalStorage fallback mode.');
}

export default pool;
