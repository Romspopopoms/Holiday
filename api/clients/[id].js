import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { nom, prenom, telephone, adresse, type, date_prise_en_charge, statut, etatdevis } = req.body;

    console.log("Request body data:", req.body);

    try {
      // Récupérer les données actuelles du client
      const currentResult = await pool.query('SELECT * FROM clients WHERE id = $1', [id]);
      const currentData = currentResult.rows[0];

      if (!currentData) {
        return res.status(404).json({ message: 'Client not found' });
      }

      // Mise à jour de la table clients
      const updateResult = await pool.query(
        `UPDATE clients
         SET nom = $1, prenom = $2, telephone = $3, adresse = $4, type = $5, date_prise_en_charge = $6, statut = $7, etatdevis = $8, updated_at = NOW()
         WHERE id = $9
         RETURNING *`,
        [nom, prenom, telephone, adresse, type, date_prise_en_charge, statut, etatdevis, id]
      );

      const updatedClient = updateResult.rows[0];

      console.log("Updated client data from database:", updatedClient);

      if (!updatedClient) {
        return res.status(404).json({ message: 'Client not found' });
      }

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
          const description = field.newValue; // Juste la nouvelle valeur
          return pool.query(
            `INSERT INTO modifications (client_id, nom, prenom, field_modified, modification_description, updated_at)
             VALUES ($1, $2, $3, $4, $5, NOW())`,
            [id, nom, prenom, field.name, description]
          );
        }
      }).filter(Boolean); // Filtrer les undefined pour les champs non modifiés

      await Promise.all(modificationPromises);

      res.status(200).json(updatedClient);
    } catch (error) {
      console.error('Error updating client:', error);
      res.status(500).json({ message: 'Error updating client', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
