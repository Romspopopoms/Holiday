import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { rows } = await pool.query('SELECT * FROM clients');
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ message: 'Error fetching data', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
