-- Schema for Neon.tech PostgreSQL Database
-- Table: portfolio_store

CREATE TABLE IF NOT EXISTS portfolio_store (
  id VARCHAR(50) PRIMARY KEY DEFAULT 'main',
  data JSONB NOT NULL,
  layout JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index on updated_at
CREATE INDEX IF NOT EXISTS idx_portfolio_store_updated ON portfolio_store(updated_at DESC);
