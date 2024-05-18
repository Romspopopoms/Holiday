// pages/api/submit-form.js
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { childName, childSurname, dob, parentName, parentSurname, email, phone, address, postal_code, city,
            emergencyContact, emergencyPhone, medicalInfo, authorizations } = req.body;

    try {
      const { rows } = await pool.query(
        'INSERT INTO patro (child_name, child_surname, dob, parent_name, parent_surname, email, phone, address, postal_code, city, emergency_contact, emergency_phone, medical_info, authorizations) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *',
        [childName, childSurname, dob, parentName, parentSurname, email, phone, address, postal_code, city, emergencyContact, emergencyPhone, medicalInfo, authorizations]
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
