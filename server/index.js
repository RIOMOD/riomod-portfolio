import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import pool from './db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;
const ADMIN_PIN = process.env.ADMIN_PIN || '2026';

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health check
app.get('/health', async (req, res) => {
  let dbHealthy = false;
  if (pool) {
    try {
      await pool.query('SELECT 1');
      dbHealthy = true;
    } catch (e) {
      dbHealthy = false;
    }
  }

  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'riomod-portfolio-api',
    neonDatabase: dbHealthy ? 'connected' : 'disconnected'
  });
});

// GET /api/portfolio - Fetch latest portfolio data & layout from Neon PostgreSQL
app.get('/api/portfolio', async (req, res) => {
  if (!pool) {
    return res.status(200).json({ data: null, layout: null, source: 'offline' });
  }

  try {
    const result = await pool.query('SELECT data, layout, updated_at FROM portfolio_store WHERE id = $1 LIMIT 1', ['main']);
    if (result.rows.length > 0) {
      return res.json({
        data: result.rows[0].data,
        layout: result.rows[0].layout,
        updatedAt: result.rows[0].updated_at,
        source: 'neon_postgres'
      });
    }
    return res.json({ data: null, layout: null, source: 'neon_empty' });
  } catch (err) {
    console.error('Error fetching portfolio from Neon DB:', err);
    res.status(500).json({ error: 'Database query failed', message: err.message });
  }
});

// POST /api/portfolio - Save portfolio data & layout to Neon PostgreSQL
app.post('/api/portfolio', async (req, res) => {
  const { data, layout } = req.body;

  if (!data) {
    return res.status(400).json({ error: 'Data payload is required' });
  }

  if (!pool) {
    return res.status(200).json({ message: 'Saved in memory (no DATABASE_URL configured)', source: 'local' });
  }

  try {
    const upsertSql = `
      INSERT INTO portfolio_store (id, data, layout, updated_at)
      VALUES ($1, $2, $3, NOW())
      ON CONFLICT (id) DO UPDATE 
      SET data = EXCLUDED.data,
          layout = EXCLUDED.layout,
          updated_at = NOW()
      RETURNING updated_at;
    `;
    const result = await pool.query(upsertSql, ['main', JSON.stringify(data), JSON.stringify(layout || [])]);
    return res.json({
      success: true,
      message: 'Successfully updated in Neon.tech PostgreSQL database!',
      updatedAt: result.rows[0].updated_at
    });
  } catch (err) {
    console.error('Error saving portfolio to Neon DB:', err);
    res.status(500).json({ error: 'Database write failed', message: err.message });
  }
});

// POST /api/auth/verify - Verify admin PIN
app.post('/api/auth/verify', (req, res) => {
  const { pin } = req.body;
  if (pin === ADMIN_PIN) {
    return res.json({ success: true, authorized: true });
  }
  return res.status(401).json({ success: false, authorized: false, error: 'Invalid PIN' });
});

// Serve frontend static assets in production
const distPath = path.resolve(__dirname, '../dist');
app.use(express.static(distPath));

// Fallback to index.html for SPA routing (compatible with Express 4 & 5)
app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Portfolio Server running on port ${PORT}`);
  console.log(`🌐 Neon.tech Database: ${process.env.DATABASE_URL ? 'Configured' : 'Not configured'}`);
});
