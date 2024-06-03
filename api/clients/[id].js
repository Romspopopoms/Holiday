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

      // Enregistrer chaque modification individuelle
      const fields = [
        { name: 'nom', value: nom },
        { name: 'prenom', value: prenom },
        { name: 'telephone', value: telephone },
        { name: 'adresse', value: adresse },
        { name: 'type', value: type },
        { name: 'date_prise_en_charge', value: date_prise_en_charge },
        { name: 'statut', value: statut },
        { name: 'etatdevis', value: etatdevis }
      ];

      const modificationPromises = fields.map(field => {
        const description = `${field.name} modifié à ${field.value}`;
        return pool.query(
          `INSERT INTO modifications (client_id, nom, prenom, field_modified, modification_description, updated_at)
           VALUES ($1, $2, $3, $4, $5, NOW())`,
          [id, nom, prenom, field.name, description]
        );
      });

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
