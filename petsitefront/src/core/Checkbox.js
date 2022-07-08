import React, { useState } from "react";


const Checkbox = ({categories , handleFilters}) => {

    const [checked, setCheked] = useState([]);
//basic logic not in state uncheck in state check
    //higher order fuc one fuc calling other 
    //gets the cat and returns another fuc
    const handleToggle = c => () => {
        // return the first index or -1 ie. at whic ele is found in array if no ele -1 
        const currentCategoryId = checked.indexOf(c); 
        const newCheckedCategoryId = [...checked];
        // if currently checked was not already in checked state then push
        // else pull/take off
        if (currentCategoryId === -1) { //if cat not in state
            newCheckedCategoryId.push(c);
        } else {  //when user clicks 
            newCheckedCategoryId.splice(currentCategoryId, 1);
        }
        //console.log(newCheckedCategoryId);
        setCheked(newCheckedCategoryId); //updating state
        handleFilters(newCheckedCategoryId);
    };

    return categories.map( (c,i) => (
        <li key={i} className="list-unstyled">
        <input
            onChange={handleToggle(c._id)}
            value={checked.indexOf(c._id === -1)}
            type="checkbox"
            className="form-check-input"
        />
        <label className="form-check-label">{c.name}</label>
    </li>

    ));
}




export default Checkbox;