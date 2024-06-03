import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      clientName, clientSurname, phone, address, clientType, date, status, etatDevis
    } = req.body;

    try {
      const { rows } = await pool.query(
        `INSERT INTO clients (
          nom, prenom, telephone, adresse, type, date_prise_en_charge, statut, etat_devis, updated_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, NOW()
        ) RETURNING *`,
        [
          clientName, clientSurname, phone, address, clientType, date, status, etatDevis
        ]
      );

      res.status(200).json({ message: 'Client added successfully', client: rows[0] });
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).json({ message: 'Error inserting data', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
