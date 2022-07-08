import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import {createCategory} from "./apiAdmin";

const AddCategory = () => {
    const [name,setName] = useState(""); 
    const [error,setError] = useState(false);
    const [success,setSuccess] = useState(false);
//def value f 

// destructure user and token from localstorage 
    const { user, token } = isAuthenticated(); //check if user logged in
//handles chan
    const handleChange = e => {
        setError("");
        setName(e.target.value);
    };

    const clickSubmit = e => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        // make request to api to create category
        createCategory(user._id, token, { name }).then(data => {
            if (data.error) {
                setError(data.error); //set state as error if something wrong
            } else {
                setError(""); //else set it to empty 
                setSuccess(true); //set success to true
            }
        });
    };
//cat form
    const newCategoryFom = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name of the Category</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={name}
                    autoFocus 
                    required
                />
            </div>
            <button className="btn btn-outline-primary">Create New Category</button>
        </form>
    );

    const showSuccess = () => {
        if (success) {
            return <h3 className="text-success">{name} is successfully created!</h3>;
        }
    };

    const showError = () => {
        if (error) {
            return <h3 className="text-danger">Oops .. Category names should be unique</h3>;
        }
    };

    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">
                Back to your Dashboard
            </Link>
        </div>
    );

    return (
        <Layout
            title="Add a new category"
            description={`Hello Hello!  ${user.name}, are you ready to add a new category?`}
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {newCategoryFom()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    );
};

export default AddCategory;