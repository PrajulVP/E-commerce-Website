import React from 'react'
import { useState } from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { signup } from '../auth/helper'



const Signup = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false,
    })

    const { name, email, password, error, success } = values;

    const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }


    const onSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false })

        // Validation checks
        if (!name || !email || !password) {
            setValues({
                ...values,
                error: "All fields are required",
                success: false,
            });
            return;
        }

        // Name validation
        const nameRegex = /^[a-zA-Z ]+$/;
        if (!nameRegex.test(name)) {
            setValues({
                ...values,
                error: "Name cannot contain numbers",
                success: false,
            });
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setValues({
                ...values,
                error: "Invalid email address",
                success: false,
            });
            return;
        }

        // Password validation
        if (password.length < 3) {
            setValues({
                ...values,
                error: "Password must be at least 3 characters long",
                success: false,
            });
            return;
        }

        signup({ name, email, password })
            .then(data => {
                console.log("DATA", data)
                if (data.email === email) {
                    setValues({
                        ...values,
                        name: "",
                        email: "",
                        password: "",
                        error: "",
                        success: true,
                    })
                }
                else {
                    setValues(
                        {
                            ...values,
                            error: true,
                            success: false,
                        }
                    )
                }
            })
            .catch((err) => console.log(err))
    }



    const successMessage = () => {
        return (
            <div className="row">
                <div className="col-6 offset-sm-3 text-left">
                    <div
                        className='alert alert-success' style={{ display: success ? "" : "none" }}>Account created successfully!!
                        <Link to="/login">Click here</Link> to login
                    </div>
                </div>
            </div>
        )
    }

    const nameRegex = /^[a-zA-Z ]+$/;
    const emailRegex = /([\w.-]+)?\w+@[\w-]+(\.\w+){1,}/;


    const errorMessage = () => {
        let firstErrorDisplayed = false;
    
        return (
            <div className="row">
                <div className="col-6 offset-sm-3 text-left">
                    {error && !name && !email && !password && (
                        <div className='alert alert-danger'>
                            {firstErrorDisplayed = true}
                            Please fill in all fields
                        </div>
                    )}
                    {error && !name && !firstErrorDisplayed && (
                        <div className='alert alert-danger'>
                            {firstErrorDisplayed = true}
                            Name is required
                        </div>
                    )}
                    {error && name && !nameRegex.test(name) && !firstErrorDisplayed && (
                        <div className='alert alert-danger'>
                            {firstErrorDisplayed = true}
                            Name cannot contain numbers
                        </div>
                    )}
                    {error && !email && !firstErrorDisplayed && (
                        <div className='alert alert-danger'>
                            {firstErrorDisplayed = true}
                            Email is required
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
                </div>
            </div>
        )
    }
    

    const signUpForm = () => {
        return (
            <div className="row">
                <div className="col-md-5 mx-auto mt-4">
                    <form style={{ marginBottom: "20px" }}>
                        <h1 className='text-white text-center mb-4'>Register</h1>
                        <div className="form-group mb-2">
                            <label className='text-light'>Name</label>
                            <input type="text" className="form-control" value={name} onChange={handleChange("name")} />
                        </div>
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
        <Base title='Signup page'>
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
        </Base>
    )
}

export default Signup
