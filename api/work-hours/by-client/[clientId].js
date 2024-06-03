import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export default async function handler(req, res) {
  const { clientId } = req.query;

  if (req.method === 'GET') {
    try {
      const { rows } = await pool.query('SELECT * FROM work_hours WHERE client_id = $1 ORDER BY work_date', [clientId]);
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error fetching work hours:', error);
      res.status(500).json({ message: 'Error fetching work hours', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
