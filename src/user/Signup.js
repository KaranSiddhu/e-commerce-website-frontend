import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { API } from "../backend";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    errors: [],
    success: false
  });

  const { name, email, password, errors, success } = values;

  const handleChange = val => event => {
    setValues({ ...values, errors: [], [val]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, errors: [] });
    fetch(`${API}/auth/signup`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "name":name,
        "email":email,
        "password":password
      })
    })
      .then(response =>  response.json())
      .then(data => {
          if (data.errors) {
            setValues({ ...values, errors: data.errors.map(errMsg => errMsg.msg), success: false });
          } else {
            setValues({
              ...values,
              name: "",
              email: "",
              password: "",
              errors: [],
              success: true
            });
          }
        })
      .catch(err => console.log("Error IN SIGNUP",err));
   
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
                value={name}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                value={email}
              />
            </div>

            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                onChange={handleChange("password")}
                className="form-control"
                type="password"
                value={password}
              />
            </div>
            <button onClick={onSubmit} className="mt-4 btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. Please{" "}
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
   
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display:( (errors.length === 0) ? "none" : "") }}
          >
            {
             errors.map(err => <li key={err}>{err}</li>)
            }
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign up page" description="">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
    </Base>
  );
};

export default Signup;
