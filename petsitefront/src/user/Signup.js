import React,{useState} from 'react'
import Layout from "../core/Layout"
import { Link } from 'react-router-dom'
import {signup} from '../auth/index'

const Signup = () => {
    const [values,setValues]=useState({
        name:'',
        email:'',
        username: '',
        hashedpwd:'',
        error:'',
        success:false
    }) //UseState here is an object

    const {name,email,username,hashedpwd,success,error}=values //grab name,email,user from values

    const handleChange=name=>event=>{
        setValues({...values, error:false, [name]:event.target.value});

    }

    const clickSubmit=(event)=>{
        event.preventDefault();  //Browser doesnt reload when the button is clicked
        setValues({...values, error:false})
        signup({name,email,username,hashedpwd})  //calling the signup method on clicking th submit
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error , success:false})
            }else{
                setValues({
                    ...values,
                    name:'',
                    email:'',
                    username: '',
                    hashedpwd:'',
                    error:'',
                    success:true
                })
            }
        })
    };
    const signUpForm=()=>(
        <form>
          <div className="form-group">
            <label className="text-muted">Name</label>
            <input onChange={handleChange('name')} type="text" className="form-control" value={name}/>
          </div>
          <div className="form-group">
            <label className="text-muted">Username</label>
            <input onChange={handleChange('username')} type="text" className="form-control" value={username}/>
          </div>
          <div className="form-group">
            <label className="text-muted">Email</label>
            <input onChange={handleChange('email')} type="email" className="form-control" value={email}/>
          </div>
          <div className="form-group">
            <label className="text-muted">Password</label>
            <input onChange={handleChange('hashedpwd')} type="password" className="form-control" value={hashedpwd}/>
          </div>
          <button onClick={clickSubmit} className="btn btn-dark">Submit</button>
        </form>
    )
    const showError = () => (
        //if error then dislplay or none '?' meaning value of error
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}> 
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            Bow Wow!! Your account was succesfully created. Please <Link to="/signin">Signin Here</Link>
        </div>
    );

    return (
        <Layout title="Signup" description="Sign up to Ecommerce App" className="container col-md-8 offset-md-2">
        {showSuccess()}
        {showError()}
        {signUpForm()}
        </Layout>
    )

}

export default Signup;