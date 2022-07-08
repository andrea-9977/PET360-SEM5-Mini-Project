import React, { useState } from "react";

const RadioBox = ({ prices, handleFilters }) => { //grab HF
    const [value, setValue] = useState(0);

    const handleChange = event => {
        handleFilters(event.target.value); //send to parent compo shop
        setValue(event.target.value); 
    };

    return prices.map((p, i) => (
        <div key={i}>
            <input
                onChange={handleChange}
                value={`${p._id}`}
                name={p} //to check on radionly other rename unchecked
                type="radio"
                className="mr-2 ml-4"
            />
            <label className="form-check-label">{p.name}</label>
        </div>
    ));
};

export default RadioBox;