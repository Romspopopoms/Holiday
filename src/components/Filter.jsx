import React from "react";

const Filter = ({ cities, postalCodes, onFilterChange }) => {
    const handleCityChange = (e) => {
        onFilterChange({ type: "city", value: e.target.value });
    };


    return (
        <div className="flex gap-4 mb-4">
            <select onChange={handleCityChange} className="p-2 border rounded-xl">
                <option value="">Villes</option>
                {cities.map((city, index) => (
                    <option key={index} value={city}>
                        {city}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Filter;
