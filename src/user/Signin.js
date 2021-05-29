import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { API } from "../backend";
import {signin, authenticate, isAutheticated} from '../auth/helper';

const Signin = () => {

  const [values, setValues] = useState({
    email: "",
    password: "",
    error:'',
    loading: false,
    didRedirect: false
  });

  const { email, password, error, loading, didRedirect } = values;
  const { User } = isAutheticated();


  const handleChange = val => event => {
    setValues({ ...values, errors: [], [val]: event.target.value });
  };  

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, errors: false, loading: true });

    fetch(`${API}/auth/signin`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "email":email,
        "password":password
      })
    })
    .then(res => res.json())
    .then(data => {
      if(data.error){
        setValues({...values, error: data.error, loading: false});
      }else{
        authenticate(data, () => {
          setValues({
            ...values,
            didRedirect: true,
          });
        });
      }
    })
    .catch(err => console.log("Error IN SIGNIN",err));

  }

  const performedRedirect = () => {
    if(didRedirect){
      if(User && User.role === 1){
        console.log("IF USER - ", User);
        return <Redirect to='/admin/dashboard' />
      }else{
        console.log("ELSE USER - ", User);
        return <Redirect to='/user/dashboard' />
      }
    }
    if(isAutheticated()){
      return <Redirect to='/' />
    }
  }

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input 
                className="form-control" 
                value={email}
                type="email" 
                onChange={handleChange("email")} 
              />
            </div>

            <div className="form-group">
              <label className="text-light">Password</label>
              <input 
                className="form-control"
                value={password} 
                type="password"
                onChange={handleChange("password")}
              />
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">Submit</button>
          </form>
        </div>
      </div>
    );
  };

    
  const loadingMessage = () => {
    return (
      loading && (
        <div className='alert alert-info'>
          <h2>Loading..</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
   
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display:( error ? "" : "none") }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign In page" description="">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performedRedirect()}
      {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
    </Base>
  );
};

export default Signin;
