import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { nom, prenom, telephone, adresse, type, date_prise_en_charge, statut } = req.body;

    try {
      const result = await sql`
        UPDATE clients
        SET nom = ${nom}, prenom = ${prenom}, telephone = ${telephone}, adresse = ${adresse}, type = ${type}, date_prise_en_charge = ${date_prise_en_charge}, statut = ${statut}
        WHERE id = ${id}
        RETURNING *;
      `;

      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Client not found' });
      }

      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error updating client:', error);
      res.status(500).json({ message: 'Error updating client', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}