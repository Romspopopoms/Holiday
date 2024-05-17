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
        <div className="bg-gray-200 flex flex-col">
            {error && <p>Error: {error.message}</p>}
            <h1>Users</h1>
            <ul className="flex flex-col">
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AffichageData;
