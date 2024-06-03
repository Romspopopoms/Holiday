import React, { useState } from "react";

const Form = () => {
    const [clientName, setClientName] = useState("");
    const [clientSurname, setClientSurname] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [clientType, setClientType] = useState("autoentrepreneur");
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("1er appel");
    const [etatdevis, setEtatdevis] = useState("a_faire");
    const [statuses] = useState([
        "1er appel",
        "envoyé au design",
        "envoyé en prod",
        "produit fini et payé",
        "produit fini et en attente de paiement"
    ]);
    const [etatdevisOptions] = useState([
        "Devis à faire",
        "Devis envoyé",
        "Devis validé"
    ]);
    const [onSubmit, setOnSubmit] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    clientName, clientSurname, phone, address, clientType, date, status, etatdevis
                }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Submitted values:", result);
                setOnSubmit(true);
                e.target.reset();
                setClientName("");
                setClientSurname("");
                setPhone("");
                setAddress("");
                setClientType("autoentrepreneur");
                setDate("");
                setStatus("1er appel");
                setEtatdevis("a_faire");
            } else {
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setError('An error occurred while submitting the form');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 p-6">
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-y-6 p-8 bg-white shadow-md rounded-lg w-full max-w-2xl">
                {onSubmit && (
                    <div className="text-white bg-green-500 p-2 rounded-md">
                        Formulaire soumis avec succès!
                    </div>
                )}
                {error && (
                    <div className="text-white bg-red-500 p-2 rounded-md">
                        {error}
                    </div>
                )}
                <h2 className="text-2xl font-bold mb-4">Informations sur le client</h2>
                <label className="flex flex-col w-full">
                    Nom du client:
                    <input type="text" className="p-2 border rounded" value={clientName} onChange={(e) => setClientName(e.target.value)} />
                </label>
                <label className="flex flex-col w-full">
                    Prénom:
                    <input type="text" className="p-2 border rounded" value={clientSurname} onChange={(e) => setClientSurname(e.target.value)} />
                </label>
                <label className="flex flex-col w-full">
                    Téléphone:
                    <input type="text" className="p-2 border rounded" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </label>
                <label className="flex flex-col w-full">
                    Adresse:
                    <input type="text" className="p-2 border rounded" value={address} onChange={(e) => setAddress(e.target.value)} />
                </label>
                <label className="flex flex-col w-full">
                    Type de client:
                    <select className="p-2 border rounded" value={clientType} onChange={(e) => setClientType(e.target.value)}>
                        <option value="autoentrepreneur">Autoentrepreneur</option>
                        <option value="société">Société</option>
                        <option value="association">Association</option>
                    </select>
                </label>
                <label className="flex flex-col w-full">
                    Date de prise en charge:
                    <input type="date" className="p-2 border rounded" value={date} onChange={(e) => setDate(e.target.value)} />
                </label>
                <label className="flex flex-col w-full">
                    Statut:
                    <select className="p-2 border rounded" value={status} onChange={(e) => setStatus(e.target.value)}>
                        {statuses.map((stat, index) => (
                            <option key={index} value={stat}>
                                {stat}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="flex flex-col w-full">
                    État du devis:
                    <select className="p-2 border rounded" value={etatdevis} onChange={(e) => setEtatdevis(e.target.value)}>
                        {etatdevisOptions.map((option, index) => (
                            <option key={index} value={option.toLowerCase().replace(/\s+/g, '_')}>
                                {option}
                            </option>
                        ))}
                    </select>
                </label>
                <button type="submit" className="mt-6 border-2 border-black bg-purple-400 text-white px-6 py-2 rounded hover:bg-purple-500">Soumettre</button>
            </form>
        </div>
    );
};

export default Form;
