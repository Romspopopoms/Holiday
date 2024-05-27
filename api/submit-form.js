import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      clientName, clientSurname, phone, address, clientType, date, status
    } = req.body;

    try {
      const result = await sql`
        INSERT INTO clients (
          nom, prenom, telephone, adresse, type, date_prise_en_charge, statut
        ) VALUES (
          ${clientName}, ${clientSurname}, ${phone}, ${address}, ${clientType}, ${date}, ${status}
        ) RETURNING *;
      `;

      res.status(200).json({ message: 'Client added successfully', client: result.rows[0] });
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).json({ message: 'Error inserting data', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
