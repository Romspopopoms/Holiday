import React, { useEffect, useState } from "react";
import Filter from "./Filter"; // Assurez-vous que le chemin est correct

const AffichageData = () => {
    const [clients, setClients] = useState([]);
    const [filteredClients, setFilteredClients] = useState([]);
    const [clientTypes, setClientTypes] = useState([]);
    const [error, setError] = useState(null);
    const [editingClient, setEditingClient] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formValues, setFormValues] = useState({
        nom: '',
        prenom: '',
        telephone: '',
        adresse: '',
        type: '',
        date_prise_en_charge: '',
        statut: ''
    });
    const [statuses] = useState([
        "1er appel",
        "envoyé au design",
        "envoyé en prod",
        "produit fini et payé",
        "produit fini et en attente de paiement"
    ]);

    useEffect(() => {
        fetch("/api/clients")
            .then(response => response.json())
            .then(data => {
                setClients(data);
                setFilteredClients(data);
                const uniqueClientTypes = [...new Set(data.map(client => client.type))];
                setClientTypes(uniqueClientTypes);
            })
            .catch(error => {
                console.error('Error fetching clients:', error);
                setError(error);
            });
    }, []);

    const handleFilterChange = ({ type, value }) => {
        if (value === "") {
            setFilteredClients(clients);
            return;
        }
        const filtered = clients.filter(client => client[type] === value);
        setFilteredClients(filtered);
    };

    const handleEditClick = (client) => {
        setEditingClient(client);
        setFormValues({
            nom: client.nom,
            prenom: client.prenom,
            telephone: client.telephone,
            adresse: client.adresse,
            type: client.type,
            date_prise_en_charge: client.date_prise_en_charge,
            statut: client.statut
        });
        setShowModal(true);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/clients/${editingClient.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });

            if (response.ok) {
                const updatedClient = await response.json();
                setClients((prevClients) =>
                    prevClients.map((client) =>
                        client.id === updatedClient.id ? updatedClient : client
                    )
                );
                setFilteredClients((prevClients) =>
                    prevClients.map((client) =>
                        client.id === updatedClient.id ? updatedClient : client
                    )
                );
                setShowModal(false);
                setEditingClient(null);
            } else {
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (error) {
            console.error('Error updating client:', error);
            setError('An error occurred while updating the client');
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="bg-gray-100 min-h-screen py-6 flex flex-col items-center sm:py-12">
            <div className="relative py-3 w-full max-w-6xl">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-300 to-blue-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    {error && <p className="text-red-500 mb-4">Error: {error.message}</p>}
                    <h1 className="text-center font-extrabold text-3xl text-purple-600 mb-6">Liste des Clients</h1>
                    <Filter clientTypes={clientTypes} onFilterChange={handleFilterChange} />
                    <div className="overflow-x-auto w-full mt-6">
                        <div className="grid grid-cols-1 gap-6">
                            {filteredClients.map(client => (
                                <div key={client.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="mb-4">
                                            <h2 className="font-bold text-2xl mb-2 text-purple-700">{client.nom} {client.prenom}</h2>
                                            <p className="text-gray-700 mb-2"><strong>Téléphone:</strong> {client.telephone}</p>
                                            <p className="text-gray-700 mb-2"><strong>Adresse:</strong> {client.adresse}</p>
                                            <p className="text-gray-700 mb-2"><strong>Type:</strong> {client.type}</p>
                                            <p className="text-gray-700 mb-2"><strong>Date de prise en charge:</strong> {formatDate(client.date_prise_en_charge)}</p>
                                            <p className="text-gray-700 mb-2"><strong>Statut:</strong> {client.statut}</p>
                                            <button 
                                                onClick={() => handleEditClick(client)} 
                                                className="mt-2 border-2 border-purple-600 bg-purple-400 text-white px-4 py-2 rounded hover:bg-purple-500"
                                            >
                                                Modifier
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">Modifier Client</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Nom</label>
                                <input
                                    type="text"
                                    name="nom"
                                    value={formValues.nom}
                                    onChange={handleFormChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Prénom</label>
                                <input
                                    type="text"
                                    name="prenom"
                                    value={formValues.prenom}
                                    onChange={handleFormChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Téléphone</label>
                                <input
                                    type="text"
                                    name="telephone"
                                    value={formValues.telephone}
                                    onChange={handleFormChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Adresse</label>
                                <input
                                    type="text"
                                    name="adresse"
                                    value={formValues.adresse}
                                    onChange={handleFormChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Type</label>
                                <select
                                    name="type"
                                    value={formValues.type}
                                    onChange={handleFormChange}
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="autoentrepreneur">Autoentrepreneur</option>
                                    <option value="société">Société</option>
                                    <option value="association">Association</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Date de prise en charge</label>
                                <input
                                    type="date"
                                    name="date_prise_en_charge"
                                    value={formValues.date_prise_en_charge}
                                    onChange={handleFormChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Statut</label>
                                <select
                                    name="statut"
                                    value={formValues.statut}
                                    onChange={handleFormChange}
                                    className="w-full p-2 border rounded"
                                >
                                    {statuses.map((stat, index) => (
                                        <option key={index} value={stat}>
                                            {stat}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="mr-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                                >
                                    Sauvegarder
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AffichageData;
