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

    return (
        <div className="bg-gray-200 flex flex-col items-center py-4">
            {error && <p className="text-red-500">Error: {error.message}</p>}
            <h1 className="text-center font-extrabold text-2xl text-purple-400 mb-4">Users</h1>
            <Filter cities={cities} onFilterChange={handleFilterChange} />
            <table className="table-auto bg-white shadow-md rounded-lg w-3/4">
                <thead className="bg-purple-400 text-white">
                    <tr>
                        <th className="px-4 py-2 text-center">Nom</th>
                        <th className="px-4 py-2 text-center">Prénom</th>
                        <th className="px-4 py-2 text-center">Email</th>
                        <th className="px-4 py-2 text-center">Téléphone</th>
                        <th className="px-4 py-2 text-center">Adresse</th>
                        <th className="px-4 py-2 text-center">Code postal</th>
                        <th className="px-4 py-2 text-center">Ville</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map(user => (
                        <tr key={user.id} className="text-center">
                            <td className="border px-4 py-2 text-center">{user.name}</td>
                            <td className="border px-4 py-2 text-center">{user.surname}</td>
                            <td className="border px-4 py-2 text-center">{user.email}</td>
                            <td className="border px-4 py-2 text-center">{user.phone}</td>
                            <td className="border px-4 py-2 text-center">{user.address}</td>
                            <td className="border px-4 py-2 text-center">{user.postal_code}</td>
                            <td className="border px-4 py-2 text-center">{user.city}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AffichageData;
