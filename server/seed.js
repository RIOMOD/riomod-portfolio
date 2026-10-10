import pool from './db.js';
import { portfolioData } from '../src/data/portfolioData.js';
import { defaultLayout } from '../src/data/defaultLayout.js';

async function seed() {
  if (!pool) {
    console.error('❌ Cannot seed: DATABASE_URL not set.');
    process.exit(1);
  }

  try {
    console.log('🌱 Checking Neon.tech database status...');
    
    // Ensure table exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS portfolio_store (
        id VARCHAR(50) PRIMARY KEY DEFAULT 'main',
        data JSONB NOT NULL,
        layout JSONB NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const check = await pool.query('SELECT id, updated_at FROM portfolio_store WHERE id = $1', ['main']);

    if (check.rows.length === 0) {
      const insertSql = `
        INSERT INTO portfolio_store (id, data, layout, updated_at)
        VALUES ($1, $2, $3, NOW())
        RETURNING updated_at;
      `;
      const res = await pool.query(insertSql, ['main', JSON.stringify(portfolioData), JSON.stringify(defaultLayout)]);
      console.log('✅ Đã nạp thành công dữ liệu Portfolio và Bố cục mặc định lên Neon PostgreSQL!');
      console.log('🕒 Thời gian cập nhật:', res.rows[0].updated_at);
    } else {
      console.log('ℹ️ Neon Database đã có bản ghi id "main" (Cập nhật lúc:', check.rows[0].updated_at, ')');
      // Update with latest if needed
      const updateSql = `
        UPDATE portfolio_store
        SET data = $2, layout = $3, updated_at = NOW()
        WHERE id = $1
        RETURNING updated_at;
      `;
      const res = await pool.query(updateSql, ['main', JSON.stringify(portfolioData), JSON.stringify(defaultLayout)]);
      console.log('✅ Đã đồng bộ và cập nhật thành công dữ liệu mới nhất lên Neon PostgreSQL!');
      console.log('🕒 Thời gian cập nhật mới:', res.rows[0].updated_at);
    }

    process.exit(0);
  } catch (err) {
    console.error('❌ Lỗi nạp dữ liệu Neon DB:', err);
    process.exit(1);
  }
}

seed();
