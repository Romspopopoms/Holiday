// pages/api/submit-form.js
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password, phone, address, postal_code, city } = req.body;

    try {
      const { rows } = await pool.query(
        'INSERT INTO users (name, email, password, phone, address, postal_code, city) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [name, email, password, phone, address, postal_code, city]
      );

      res.status(200).json({ message: 'User added successfully', user: rows[0] });
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).json({ message: 'Error inserting data', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
