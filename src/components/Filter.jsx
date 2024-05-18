import React from "react";

const Filter = ({ cities, postalCodes, onFilterChange }) => {
    const handleCityChange = (e) => {
        onFilterChange({ type: "city", value: e.target.value });
    };

    const handlePostalCodeChange = (e) => {
        onFilterChange({ type: "postal_code", value: e.target.value });
    };

    return (
        <div className="flex gap-4 mb-4">
            <select onChange={handleCityChange} className="p-2 border rounded">
                <option value="">Select City</option>
                {cities.map((city, index) => (
                    <option key={index} value={city}>
                        {city}
                    </option>
                ))}
            </select>
            <select onChange={handlePostalCodeChange} className="p-2 border rounded">
                <option value="">Select Postal Code</option>
                {postalCodes.map((code, index) => (
                    <option key={index} value={code}>
                        {code}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Filter;
