import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const result = await sql`SELECT * FROM clients ORDER BY updated_at DESC LIMIT 20;`;
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching recent updates:', error);
      res.status(500).json({ message: 'Error fetching recent updates', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
