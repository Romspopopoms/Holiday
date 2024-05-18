import React, { useEffect, useState } from "react";
import Filter from "./Filter"; // Assurez-vous que le chemin est correct

const AffichageData = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [cities, setCities] = useState([]);
    const [postalCodes, setPostalCodes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/api/users")
            .then(response => response.json())
            .then(data => {
                setUsers(data);
                setFilteredUsers(data);
                const uniqueCities = [...new Set(data.map(user => user.city))];
                const uniquePostalCodes = [...new Set(data.map(user => user.postal_code))];
                setCities(uniqueCities);
                setPostalCodes(uniquePostalCodes);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                setError(error);
            });
    }, []);

    const handleFilterChange = ({ type, value }) => {
        if (value === "") {
            setFilteredUsers(users);
            return;
        }
        const filtered = users.filter(user => user[type] === value);
        setFilteredUsers(filtered);
    };

    return (
        <div className="bg-gray-200 flex flex-col items-center py-4">
            {error && <p className="text-red-500">Error: {error.message}</p>}
            <h1 className="text-center font-extrabold text-2xl text-purple-400 mb-4">Inscriptions</h1>
            <Filter cities={cities} postalCodes={postalCodes} onFilterChange={handleFilterChange} />
            <div className="overflow-x-auto w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
                    {filteredUsers.map(user => (
                        <div key={user.id} className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="font-bold text-xl mb-2">{user.child_name} {user.child_surname}</h2>
                            <p><strong>Date de naissance:</strong> {user.dob}</p>
                            <p><strong>Nom du parent:</strong> {user.parent_name}</p>
                            <p><strong>Prénom du parent:</strong> {user.parent_surname}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Téléphone:</strong> {user.phone}</p>
                            <p><strong>Adresse:</strong> {user.address}</p>
                            <p><strong>Code Postal:</strong> {user.postal_code}</p>
                            <p><strong>Ville:</strong> {user.city}</p>
                            <p><strong>Contact d'urgence:</strong> {user.emergency_contact}</p>
                            <p><strong>Téléphone d'urgence:</strong> {user.emergency_phone}</p>
                            <p><strong>Infos médicales:</strong> {user.medical_info}</p>
                            <p><strong>Autorisations:</strong> {JSON.stringify(user.authorizations)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AffichageData;
