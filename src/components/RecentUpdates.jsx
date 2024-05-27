import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Assuming you have a column `updated_at` to track the last modification date
      const { rows } = await pool.query('SELECT * FROM clients ORDER BY updated_at DESC LIMIT 20');
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error fetching recent updates:', error);
      res.status(500).json({ message: 'Error fetching recent updates', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
