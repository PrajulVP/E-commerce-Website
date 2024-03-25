import React from 'react'
import Base from '../core/Base'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { authenticate, isAuthenticated, login } from '../auth/helper'


const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    success: false,
    loading: false,
    didRedirect: false,
  })

  const { email, password, error, didRedirect } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value })
  }


  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });

    login({ email, password })
      .then(data => {
        console.log("DATA", data);
        if (data.token) {
          authenticate(data, () => {
            console.log("Token added");
            setValues({ ...values, didRedirect: true, isAuthenticated: true });
            isAuthenticated(true)
            console.log("is Authenticated", isAuthenticated())
          });
        } else {
          setValues({ ...values, loading: false, error: "Invalid email or password" }); // Handle invalid credentials here
        }
      })
      .catch(error => {
        console.log("Login error:", error);
        setValues({ ...values, error: "Login failed! Check the fields and try again", loading: false });
      });
  };


  const performRedirect = () => {
    if (didRedirect) {
      return <Navigate to="/" />;
    }
    return null;
  }


  const emailRegex = /([\w.-]+)?\w+@[\w-]+(\.\w+){1,}/;

  const errorMessage = () => {
    let firstErrorDisplayed = false;

    return (
      <div className="row">
        <div className="col-6 offset-sm-3 text-left">
          {error && !email && !password && (
            <div className='alert alert-danger'>
              {firstErrorDisplayed = true}
              Please fill in the fields
            </div>
          )}
          {error && email && !emailRegex.test(email) && !firstErrorDisplayed && (
            <div className='alert alert-danger'>
              {firstErrorDisplayed = true}
              Invalid email address
            </div>
          )}
          {error && !password && !firstErrorDisplayed && (
            <div className='alert alert-danger'>
              {firstErrorDisplayed = true}
              Password is required
            </div>
          )}
          {error && password && password.length < 3 && !firstErrorDisplayed && (
            <div className='alert alert-danger'>
              {firstErrorDisplayed = true}
              Password must be at least 3 characters long
            </div>
          )}
          {error && !firstErrorDisplayed && (
          <div className='alert alert-danger'>
            {error}
          </div>
        )}
        </div>
      </div>  
    )
  }


  const loginForm = () => {
    return (
      <div className="row">
        <div className="col-md-4 mx-auto offset-sm-3 text-left mt-4">
          <form style={{ marginBottom: "20px" }}>
            <h1 className='text-white text-center mb-4'>Login Form</h1>
            <div className="form-group mb-2">
              <label className='text-light'>Email</label>
              <input type="email" className="form-control" value={email} onChange={handleChange("email")} />
            </div>
            <div className="form-group mb-2">
              <label className='text-light'>Password</label>
              <input type="password" className="form-control" value={password} onChange={handleChange("password")} />
            </div>
            <button
              onClick={onSubmit} className='btn btn-success btn-block mt-3' style={{ width: "100%" }}>Submit</button>
          </form>
        </div>
      </div>
    )
  }


  return (
    <Base>
      {errorMessage()}
      {loginForm()}
      {performRedirect()}
      <p className='text-center text-white'>
      </p>
      <footer style={{ marginTop: "110px" }}></footer>
    </Base>
  )
}

export default Login
