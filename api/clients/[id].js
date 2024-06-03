import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { nom, prenom, telephone, adresse, type, date_prise_en_charge, statut, etatdevis } = req.body;

    try {
      const { rows } = await pool.query(
        `UPDATE clients
         SET nom = $1, prenom = $2, telephone = $3, adresse = $4, type = $5, date_prise_en_charge = $6, statut = $7, etatdevis = $8, updated_at = NOW()
         WHERE id = $9
         RETURNING *`,
        [nom, prenom, telephone, adresse, type, date_prise_en_charge, statut, etatdevis, id]
      );

      if (rows.length === 0) {
        return res.status(404).json({ message: 'Client not found' });
      }

      res.status(200).json(rows[0]);
    } catch (error) {
      console.error('Error updating client:', error);
      res.status(500).json({ message: 'Error updating client', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
