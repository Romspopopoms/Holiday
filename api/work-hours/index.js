import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { client_id, employee_name, hours_worked, work_date } = req.body;

    try {
      const { rows } = await pool.query(
        `INSERT INTO work_hours (client_id, employee_name, hours_worked, work_date)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [client_id, employee_name, hours_worked, work_date]
      );

      res.status(200).json(rows[0]);
    } catch (error) {
      console.error('Error inserting work hours:', error);
      res.status(500).json({ message: 'Error inserting work hours', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
