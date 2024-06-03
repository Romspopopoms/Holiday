import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { hours_worked, work_date } = req.body;

    try {
      const { rows } = await pool.query(
        `UPDATE work_hours
         SET hours_worked = $1, work_date = $2, updated_at = NOW()
         WHERE id = $3
         RETURNING *`,
        [hours_worked, work_date, id]
      );

      res.status(200).json(rows[0]);
    } catch (error) {
      console.error('Error updating work hours:', error);
      res.status(500).json({ message: 'Error updating work hours', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
