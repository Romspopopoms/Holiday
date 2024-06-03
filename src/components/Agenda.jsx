import React, { useState, useEffect } from 'react';

const Agenda = ({ clientId }) => {
  const [employeeName, setEmployeeName] = useState('Geoffrey');
  const [hoursWorked, setHoursWorked] = useState('');
  const [workDate, setWorkDate] = useState('');
  const [message, setMessage] = useState('');
  const [workHours, setWorkHours] = useState([]);
  const [editingWorkHour, setEditingWorkHour] = useState(null);

  useEffect(() => {
    fetch(`/api/work-hours?clientId=${clientId}`)
      .then(response => response.json())
      .then(data => setWorkHours(data))
      .catch(error => console.error('Error fetching work hours:', error));
  }, [clientId]);

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
        const newWorkHour = await response.json();
        setWorkHours([...workHours, newWorkHour]);
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

  const handleEdit = (workHour) => {
    setEditingWorkHour(workHour);
    setHoursWorked(workHour.hours_worked);
    setWorkDate(workHour.work_date);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/work-hours/${editingWorkHour.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hours_worked: hoursWorked,
          work_date: workDate,
        }),
      });

      if (response.ok) {
        const updatedWorkHour = await response.json();
        setWorkHours(workHours.map(wh => (wh.id === updatedWorkHour.id ? updatedWorkHour : wh)));
        setMessage('Heures mises à jour avec succès');
        setEditingWorkHour(null);
        setHoursWorked('');
        setWorkDate('');
      } else {
        const errorData = await response.json();
        setMessage(`Erreur: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error updating work hours:', error);
      setMessage('Erreur lors de la mise à jour des heures');
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Agenda</h3>
      {message && <p className="mb-4">{message}</p>}
      <form onSubmit={editingWorkHour ? handleUpdate : handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Nom de l'employé</label>
          <select
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            className="w-full p-2 border rounded"
            disabled={!!editingWorkHour}
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
          {editingWorkHour ? 'Mettre à jour' : 'Enregistrer'}
        </button>
      </form>
      <div className="mt-6">
        <h4 className="text-lg font-semibold mb-4">Heures travaillées</h4>
        <ul>
          {workHours.map(workHour => (
            <li key={workHour.id} className="mb-2 flex justify-between">
              <span>{workHour.employee_name} - {workHour.hours_worked} heures le {new Date(workHour.work_date).toLocaleDateString()}</span>
              <button
                onClick={() => handleEdit(workHour)}
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
              >
                Modifier
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Agenda;
