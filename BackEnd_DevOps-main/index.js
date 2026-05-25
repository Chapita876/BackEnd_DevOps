const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'appdb'
});

app.get('/', (req, res) => {
  res.json({ message: 'Backend funcionando correctamente' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/datos', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() as fecha');
    res.json({ fecha: result.rows[0].fecha });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend corriendo en puerto ${PORT}`);
});