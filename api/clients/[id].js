import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { nom, prenom, telephone, adresse, type, date_prise_en_charge, statut, etatdevis } = req.body;

    try {
      // Récupérer les données actuelles du client
      const { rows: currentDataRows } = await pool.query('SELECT * FROM clients WHERE id = $1', [id]);
      if (currentDataRows.length === 0) {
        return res.status(404).json({ message: 'Client not found' });
      }
      const currentData = currentDataRows[0];

      // Enregistrer uniquement les modifications réelles
      const fields = [
        { name: 'nom', oldValue: currentData.nom, newValue: nom },
        { name: 'prenom', oldValue: currentData.prenom, newValue: prenom },
        { name: 'telephone', oldValue: currentData.telephone, newValue: telephone },
        { name: 'adresse', oldValue: currentData.adresse, newValue: adresse },
        { name: 'type', oldValue: currentData.type, newValue: type },
        { name: 'date_prise_en_charge', oldValue: currentData.date_prise_en_charge ? currentData.date_prise_en_charge.toISOString() : null, newValue: date_prise_en_charge },
        { name: 'statut', oldValue: currentData.statut, newValue: statut },
        { name: 'etatdevis', oldValue: currentData.etatdevis, newValue: etatdevis }
      ];

      const modificationPromises = fields.map(field => {
        if (field.oldValue !== field.newValue) {
          const description = `${field.name} modifié de "${field.oldValue}" à "${field.newValue}"`;
          return pool.query(
            `INSERT INTO client_modifications (client_id, description, modified_at) VALUES ($1, $2, NOW())`,
            [id, description]
          );
        }
        return null;
      }).filter(promise => promise !== null);

      await Promise.all(modificationPromises);

      // Mettre à jour les données du client
      const { rows } = await pool.query(
        `UPDATE clients
         SET nom = $1, prenom = $2, telephone = $3, adresse = $4, type = $5, date_prise_en_charge = $6, statut = $7, etatdevis = $8, updated_at = NOW()
         WHERE id = $9
         RETURNING *`,
        [nom, prenom, telephone, adresse, type, date_prise_en_charge, statut, etatdevis, id]
      );

      res.status(200).json(rows[0]);
    } catch (error) {
      console.error('Error updating client:', error);
      res.status(500).json({ message: 'Error updating client', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
