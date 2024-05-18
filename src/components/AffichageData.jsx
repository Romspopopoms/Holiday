import React, { useEffect, useState } from "react";
import Filter from "./Filter"; // Assurez-vous que le chemin est correct

const AffichageData = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [cities, setCities] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/api/users")
            .then(response => response.json())
            .then(data => {
                setUsers(data);
                setFilteredUsers(data);
                const uniqueCities = [...new Set(data.map(user => user.city))];
                setCities(uniqueCities);
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

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const formatAuthorizations = (authorizations) => {
        return (
            <ul className="list-disc pl-5">
                {Object.entries(authorizations).map(([key, value]) => (
                    <li key={key} className="capitalize">
                        {key.replace('_', ' ')}: {value ? "Oui" : "Non"}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="bg-gray-100 min-h-screen py-6 flex flex-col items-center sm:py-12">
            <div className="relative py-3 w-full max-w-6xl">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-300 to-blue-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    {error && <p className="text-red-500">Error: {error.message}</p>}
                    <h1 className="text-center font-extrabold text-3xl text-purple-600 mb-6">Inscriptions</h1>
                    <Filter cities={cities} onFilterChange={handleFilterChange} />
                    <div className="overflow-x-auto w-full mt-6">
                        <div className="grid grid-cols-1 gap-6">
                            {filteredUsers.map(user => (
                                <div key={user.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <h2 className="font-bold text-2xl mb-2 text-purple-700">{user.child_name} {user.child_surname}</h2>
                                            <p className="text-gray-700"><strong>Date de naissance:</strong> {formatDate(user.dob)}</p>
                                            <p className="text-gray-700"><strong>Nom du parent:</strong> {user.parent_name}</p>
                                            <p className="text-gray-700"><strong>Prénom du parent:</strong> {user.parent_surname}</p>
                                            <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
                                            <p className="text-gray-700"><strong>Téléphone:</strong> {user.phone}</p>
                                            <p className="text-gray-700"><strong>Adresse:</strong> {user.address}</p>
                                            <p className="text-gray-700"><strong>Code Postal:</strong> {user.postal_code}</p>
                                            <p className="text-gray-700"><strong>Ville:</strong> {user.city}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-700"><strong>Contact d'urgence:</strong> {user.emergency_contact}</p>
                                            <p className="text-gray-700"><strong>Téléphone d'urgence:</strong> {user.emergency_phone}</p>
                                            <p className="text-gray-700"><strong>Infos médicales:</strong> {user.medical_info}</p>
                                            <p className="text-gray-700"><strong>Autorisations:</strong> {formatAuthorizations(user.authorizations)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AffichageData;
