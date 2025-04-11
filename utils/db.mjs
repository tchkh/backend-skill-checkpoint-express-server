// Create PostgreSQL Connection Pool here !
import * as pg from 'pg'
const { Pool } = pg.default

const connectionPool = new Pool({
  connectionString: 'postgresql://postgres:123412345@localhost:5432/quora-mock',
})

export default connectionPool
