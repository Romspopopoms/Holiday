import React, { useState } from "react";

const Form = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [onSubmit, setOnSubmit] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted values:", name, email, password);
        setOnSubmit(true)
        // Reset form and state after logging the values
        e.target.reset();
        setName("");
        setEmail("");
        setPassword("");
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-y-6 p-8 bg-slate-600">
                {onSubmit &&  (
                    <div className="text-white bg-green-500 p-2 rounded-md">
                        Form submitted!
                    </div>
                )}
                <label className="flex flex-col items-center justify-center gap-y-2">
                    Name:
                    <input type="text" name="name" onChange={(e) => setName(e.target.value)} />
                </label>
                <label className="flex flex-col items-center justify-center gap-y-2">
                    Email:
                    <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label className="flex flex-col items-center justify-center gap-y-2">
                    Password:
                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button type="submit" className="border-2 border-black bg-slate-200 px-6 py-2">Submit</button>
            </form>
            </div>
    );
};

export default Form;
