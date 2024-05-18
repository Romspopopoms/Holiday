import React, { useEffect, useState } from "react";

const AffichageData = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/api/users")
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => setError(error));
    }, []);

    return (
        <div className="bg-gray-200 flex flex-col items-center py-4">
            {error && <p className="text-red-500">Error: {error.message}</p>}
            <h1 className="text-center font-extrabold text-2xl text-purple-400 mb-4">Users</h1>
            <table className="table-auto bg-white shadow-md rounded-lg w-3/4">
                <thead className="bg-purple-400 text-white">
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="text-center">
                            <td className="border px-4 py-2">{user.id}</td>
                            <td className="border px-4 py-2">{user.name}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AffichageData;
