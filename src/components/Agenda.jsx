import React, { useState } from 'react';

const Agenda = ({ clientId }) => {
  const [employeeName, setEmployeeName] = useState('Geoffrey');
  const [hoursWorked, setHoursWorked] = useState('');
  const [workDate, setWorkDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/work-hours', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: clientId,
          employee_name: employeeName,
          hours_worked: hoursWorked,
          work_date: workDate,
        }),
      });

      if (response.ok) {
        setMessage('Heures enregistrées avec succès');
        setHoursWorked('');
        setWorkDate('');
      } else {
        const errorData = await response.json();
        setMessage(`Erreur: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error recording work hours:', error);
      setMessage('Erreur lors de l\'enregistrement des heures');
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Agenda</h3>
      {message && <p className="mb-4">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Nom de l'employé</label>
          <select
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="Geoffrey">Geoffrey</option>
            <option value="JB">JB</option>
            <option value="Romain">Romain</option>
            <option value="Sylvain">Sylvain</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Heures travaillées</label>
          <input
            type="number"
            value={hoursWorked}
            onChange={(e) => setHoursWorked(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            value={workDate}
            onChange={(e) => setWorkDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default Agenda;
