import React, { useState } from "react";

const Form = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [city, setCity] = useState("");
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
                body: JSON.stringify({ name, surname, email, password, phone, address, postal_code: postalCode, city }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Submitted values:", result);
                setOnSubmit(true);
                // Reset form and state after logging the values
                e.target.reset();
                setName("");
                setSurname("");
                setEmail("");
                setPassword("");
                setPhone("");
                setAddress("");
                setPostalCode("");
                setCity("");
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
        <div className="flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-y-6 p-8 bg-slate-600">
                {onSubmit && (
                    <div className="text-white bg-green-500 p-2 rounded-md">
                        Form submitted!
                    </div>
                )}
                {error && (
                    <div className="text-white bg-red-500 p-2 rounded-md">
                        {error}
                    </div>
                )}
                <label className="flex flex-col items-center justify-center gap-y-2">
                    Name:
                    <input type="text" name="name" onChange={(e) => setName(e.target.value)} />
                </label>
                <label className="flex flex-col items-center justify-center gap-y-2">
                    Name:
                    <input type="text" name="surname" onChange={(e) => setSurname(e.target.value)} />
                </label>
                <label className="flex flex-col items-center justify-center gap-y-2">
                    Email:
                    <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label className="flex flex-col items-center justify-center gap-y-2">
                    Password:
                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                </label>
                <label className="flex flex-col items-center justify-center gap-y-2">
                    Phone:
                    <input type="text" name="phone" onChange={(e) => setPhone(e.target.value)} />
                </label>
                <label className="flex flex-col items-center justify-center gap-y-2">
                    Address:
                    <input type="text" name="address" onChange={(e) => setAddress(e.target.value)} />
                </label>
                <label className="flex flex-col items-center justify-center gap-y-2">
                    Postal Code:
                    <input type="text" name="postal_code" onChange={(e) => setPostalCode(e.target.value)} />
                </label>
                <label className="flex flex-col items-center justify-center gap-y-2">
                    City:
                    <input type="text" name="city" onChange={(e) => setCity(e.target.value)} />
                </label>
                <button type="submit" className="border-2 border-black bg-slate-200 px-6 py-2">Submit</button>
            </form>
        </div>
    );
};

export default Form;
