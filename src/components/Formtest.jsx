import React, { useState } from "react";

const Form = () => {
    const [childName, setChildName] = useState("");
    const [childSurname, setChildSurname] = useState("");
    const [dob, setDob] = useState("");
    const [parentName, setParentName] = useState("");
    const [parentSurname, setParentSurname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [city, setCity] = useState("");
    const [emergencyContact, setEmergencyContact] = useState("");
    const [emergencyPhone, setEmergencyPhone] = useState("");
    const [medicalInfo, setMedicalInfo] = useState("");
    const [authorizations, setAuthorizations] = useState({
        photo: false,
        medical: false,
        pickup: false,
    });
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
                    childName, childSurname, dob, parentName, parentSurname, email, phone, address, postal_code: postalCode, city,
                    emergencyContact, emergencyPhone, medicalInfo, authorizations
                }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Submitted values:", result);
                setOnSubmit(true);
                e.target.reset();
                setChildName("");
                setChildSurname("");
                setDob("");
                setParentName("");
                setParentSurname("");
                setEmail("");
                setPhone("");
                setAddress("");
                setPostalCode("");
                setCity("");
                setEmergencyContact("");
                setEmergencyPhone("");
                setMedicalInfo("");
                setAuthorizations({ photo: false, medical: false, pickup: false });
            } else {
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setError('An error occurred while submitting the form');
        }
    };

    const handleAuthorizationChange = (e) => {
        const { name, checked } = e.target;
        setAuthorizations((prev) => ({
            ...prev,
            [name]: checked,
        }));
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
                <h2 className="text-2xl font-bold mb-4">Informations sur l'enfant</h2>
                <label className="flex flex-col w-full">
                    Nom de l'enfant:
                    <input type="text" className="p-2 border rounded" value={childName} onChange={(e) => setChildName(e.target.value)} />
                </label>
                <label className="flex flex-col w-full">
                    Prénom de l'enfant:
                    <input type="text" className="p-2 border rounded" value={childSurname} onChange={(e) => setChildSurname(e.target.value)} />
                </label>
                <label className="flex flex-col w-full">
                    Date de naissance:
                    <input type="date" className="p-2 border rounded" value={dob} onChange={(e) => setDob(e.target.value)} />
                </label>
                <h2 className="text-2xl font-bold mt-6 mb-4">Informations sur les parents</h2>
                <label className="flex flex-col w-full">
                    Nom du parent:
                    <input type="text" className="p-2 border rounded" value={parentName} onChange={(e) => setParentName(e.target.value)} />
                </label>
                <label className="flex flex-col w-full">
                    Prénom du parent:
                    <input type="text" className="p-2 border rounded" value={parentSurname} onChange={(e) => setParentSurname(e.target.value)} />
                </label>
                <label className="flex flex-col w-full">
                    Email:
                    <input type="email" className="p-2 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
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
                    Code Postal:
                    <input type="text" className="p-2 border rounded" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                </label>
                <label className="flex flex-col w-full">
                    Ville:
                    <input type="text" className="p-2 border rounded" value={city} onChange={(e) => setCity(e.target.value)} />
                </label>
                <h2 className="text-2xl font-bold mt-6 mb-4">Contact d'urgence</h2>
                <label className="flex flex-col w-full">
                    Nom du contact d'urgence:
                    <input type="text" className="p-2 border rounded" value={emergencyContact} onChange={(e) => setEmergencyContact(e.target.value)} />
                </label>
                <label className="flex flex-col w-full">
                    Téléphone du contact d'urgence:
                    <input type="text" className="p-2 border rounded" value={emergencyPhone} onChange={(e) => setEmergencyPhone(e.target.value)} />
                </label>
                <h2 className="text-2xl font-bold mt-6 mb-4">Informations médicales</h2>
                <label className="flex flex-col w-full">
                    Informations médicales (allergies, médicaments, etc.):
                    <textarea className="p-2 border rounded" value={medicalInfo} onChange={(e) => setMedicalInfo(e.target.value)}></textarea>
                </label>
                <h2 className="text-2xl font-bold mt-6 mb-4">Autorisations</h2>
                <label className="flex items-center">
                    <input type="checkbox" name="photo" checked={authorizations.photo} onChange={handleAuthorizationChange} />
                    <span className="ml-2">Autorise la prise de photos</span>
                </label>
                <label className="flex items-center">
                    <input type="checkbox" name="medical" checked={authorizations.medical} onChange={handleAuthorizationChange} />
                    <span className="ml-2">Autorise les soins médicaux d'urgence</span>
                </label>
                <label className="flex items-center">
                    <input type="checkbox" name="pickup" checked={authorizations.pickup} onChange={handleAuthorizationChange} />
                    <span className="ml-2">Autorise les personnes suivantes à récupérer l'enfant:</span>
                </label>
                <button type="submit" className="mt-6 border-2 border-black bg-purple-400 text-white px-6 py-2 rounded hover:bg-purple-500">Inscrire</button>
            </form>
        </div>
    );
};

export default Form;
