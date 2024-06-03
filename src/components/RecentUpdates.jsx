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
            <ul className="list-disc pl-5">
                {recentUpdates.length > 0 ? (
                    recentUpdates.map((update, index) => (
                        <li key={index} className="mb-2">
                            <strong>{update.nom} {update.prenom}</strong> - {update.statut} (modifié le {new Date(update.updated_at).toLocaleDateString()}) - État du devis : {update.etatdevis ? update.etatdevis : 'N/A'}
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
