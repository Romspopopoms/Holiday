import React from "react";
import RecentUpdates from "../components/RecentUpdates";

const Accueil = () => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Bienvenue sur la page d'accueil</h1>
            <RecentUpdates />
        </div>
    );
};

export default Accueil;
