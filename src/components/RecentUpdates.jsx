import React, { useEffect, useState } from "react";

const RecentUpdates = () => {
    const [recentUpdates, setRecentUpdates] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/api/recent-updates")
            .then(response => response.json())
            .then(data => {
                console.log("Fetched recent updates:", data);
                setRecentUpdates(data);
            })
            .catch(error => {
                console.error('Error fetching recent updates:', error);
                setError(error);
            });
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Dernières Modifications</h2>
            {error && <p className="text-red-500">Erreur : {error.message}</p>}
            <ul className="list-none pl-0">
                {recentUpdates.length > 0 ? (
                    recentUpdates.map((update, index) => (
                        <li key={index} className="mb-2">
                            <span className="font-bold">{update.nom} {update.prenom}</span> - {update.field_modified} modifié à <span className="font-bold">{update.modification_description.split(' ')[2]}</span> (modifié le {new Date(update.updated_at).toLocaleDateString()})
                        </li>
                    ))
                ) : (
                    <p>Aucune mise à jour récente trouvée.</p>
                )}
            </ul>
        </div>
    );
};

export default RecentUpdates;
