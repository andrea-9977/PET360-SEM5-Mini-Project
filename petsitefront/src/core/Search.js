import React, { useState, useEffect } from "react";
import { getCategories, list } from "./apiCore";
import Card from "./Card";

const Search = () => {
    const [data,setData] = useState({
        categories: [],
        category: "",
        search: "",
        results: [], //storing search bar text here
        searched: false
    })
    //destruct
    const { categories, category, search, results, searched } = data;

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setData({ ...data, categories: data }); //get all data n cat is empty arr so we populate it with data
            }
        });
    };

    useEffect(() => {
        loadCategories();
    }, []);
    //api req
    const searchData = () => {
        //console.log(search, category);
        if (search) { // or if nothing undef basic params sending to backend here
            list({ search: search || undefined, category: category }).then(
                response => {
                    if (response.error) {
                        console.log(response.error);
                    } else {
                        setData({ ...data, results: response, searched: true });
                    }
                }
            );
        }
    };

    const searchSubmit = e => {
        e.preventDefault();
        searchData();
    };

    const handleChange = name => event => {
        setData({ ...data, [name]: event.target.value, searched: false }); //grabing name from serach box and setting serach to false
    };

    const searchMessage = (searched, results) => {
        if (searched && results.length > 0) {
            return `Found ${results.length} products`;
        }
        if (searched && results.length < 1) {
            return `Woops ! No products found ! Sorry`;
        }
    };
    const searchedProducts = (results = []) => { //sometimes no result so empty arr as def value
        return (
            <div>
                <h2 className="mt-4 mb-4">
                    {searchMessage(searched, results)}
                </h2>
              
                <div className="row">
                    {results.map((product, i) => (
                         <div key={i} className="col-4 mb-3">
                            <Card product={product} /> 
                        </div>
                    ))}
                    
                </div>
            </div>
        );
    };
    //form span to make everything in line neat 
    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend"> 
                        <select //dropdown prepend b4 
                            className="btn mr-2"
                            onChange={handleChange("category")}>
                                {/* by def all  */}
                            <option value="All">All</option> 
                            {categories.map((c, i) => ( //showing list via index
                                <option key={i} value={c._id}>
                                    {c.name} 
                                </option>
                            ))}
                        </select>
                    </div>

                    <input
                        type="search"
                        className="form-control"
                        onChange={handleChange("search")}
                        placeholder="Search by name"/>
                </div>
                <div
                    className="btn input-group-append"
                    style={{ border: "none" }}>
                    <button className="input-group-text">Search</button>
                </div>
            </span>
        </form>
    );

    return(
        <div>
            <div className="container mb-3">{searchForm()}</div>
            <div className="container-fluid mb-3">
                {searchedProducts(results)}
            </div>
        </div>
    )
}


export default Search;