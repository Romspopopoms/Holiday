import React from "react";

const Filter = ({ clientTypes, onFilterChange }) => {
    const handleTypeChange = (e) => {
        onFilterChange({ type: "type", value: e.target.value });
    };

    return (
        <div className="flex gap-4 mb-4">
            <select onChange={handleTypeChange} className="p-2 border rounded-xl">
                <option value="">Type de Client</option>
                {clientTypes.map((type, index) => (
                    <option key={index} value={type}>
                        {type}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Filter;
