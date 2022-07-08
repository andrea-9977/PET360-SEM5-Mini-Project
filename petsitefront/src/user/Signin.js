import React,{useState} from 'react'
import {Redirect} from "react-router-dom";
import Layout from "../core/Layout"
import {signin,authenticate,isAuthenticated} from "../auth";

const Signin = () => {
    const [values,setValues]=useState({
        email:'',
        hashedpwd:'',
        error:'',
        loading:false,
        redirectToReferrer:false,
    }); //UseState here is an object

    const {email,hashedpwd,loading,error,redirectToReferrer}=values //grab name,email,user from values
    const {user} = isAuthenticated()

    const handleChange=name=>event=>{
        setValues({...values, error:false, [name]:event.target.value});

    }


    const clickSubmit=(event)=>{
        event.preventDefault();  //Browser doesnt reload when the button is clicked
        setValues({...values, error:false , loading:true}) //to show the user the acc is loading
        signin({email,hashedpwd})  //calling the signup method on clicking th submit
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error , loading:false})
            }else{
                authenticate(data,() => {
                    setValues({
                        ...values,
                        redirectToReferrer : true //redirect the user to some page
                    });
                });

            }
        });
    };


    const signInForm=()=>(
        <form>
          <div className="form-group">
            <label className="text-muted">Email</label>
            <input onChange={handleChange('email')} type="email" className="form-control"/>
          </div>
          <div className="form-group">
            <label className="text-muted">Password</label>
            <input onChange={handleChange('hashedpwd')} type="password" className="form-control"/>
          </div>
          <button onClick={clickSubmit} className="btn btn-dark">Submit</button>
        </form>
    )

    const showError=()=>(
        <div 
        className="alert alert-danger"
        style={{display:error ? "" :"none"}}
        >
            {error}
        </div>

    )
    const showLoading = () =>
    loading && (
        <div className="alert alert-info">
            <h2>Loading...</h2>
        </div>
    );
         
    const redirectUser=()=>{
        // if(redirectToReferrer){
        //     return <Redirect to = "/home" />} 
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/user/dashboard" />;
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };


   
    return (
        <Layout title="Signin" description="Sign in to Petlive" className="container col-md-8 offset-md-2">
            {showLoading()}
            {showError()}
            {signInForm()}
            {redirectUser()}

        </Layout>
    )

}

export default Signin;