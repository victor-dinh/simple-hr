import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { register, login } from "../slices/auth";
import { setMessage, clearMessage } from "../slices/message";

const Register = () => {
    const [successful, setSuccessful] = useState(false);
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { message } = useSelector((state) => state.message);

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    const initialValues = {
        full_name: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    const validationSchema = Yup.object().shape({
        full_name: Yup.string()
            .required("This field is required!"),
        email: Yup.string()
            .email("Enter a valid email address")
            .required("This field is required!"),
        password: Yup.string()
            .required("This field is required!")
            .test(
                "is-strong-password",
                "Password must be at least 8 characters, include 2 numbers and 2 symbols.",
                function (value) {
                    if (!value) return false;
                    const numMatches = (value.match(/[0-9]/g) || []).length;
                    const symbolMatches = (value.match(/[^A-Za-z0-9]/g) || []).length;
                    return value.length >= 8 && numMatches >= 2 && symbolMatches >= 2;
                }
            ),
        confirmPassword: Yup.string()
            .required('This field is required!')
            .oneOf([Yup.ref('password')], 'Your passwords do not match.')
    });

    const handleRegister = (formValue) => {
        const { full_name, email, password } = formValue;
        setSuccessful(false);

        dispatch(register({ full_name, email, password }))
            .unwrap()
            .then(() => {
                setSuccessful(true);
                dispatch(login({ email, password }))
                    .unwrap()
                    .then(() => {

                        console.log('✌️message --->', message);
                        dispatch(setMessage({ message: "Your account has been created.", messageType: "success" }));
                        navigate("/dashboard");
                    })
                    .catch(() => {
                        setSuccessful(false);
                    });
            })
            .catch((errorMessage) => {
                setSuccessful(false);
                dispatch(setMessage({ message: errorMessage, messageType: "error" }));
            });
    };

    return (
        <div className="col-md-12 signup-form">
            <div className="card card-container">

                {message && (
                    <div className="form-group">
                        <div
                            className={successful ? "alert alert-success" : "alert alert-danger"}
                            role="alert"
                        >
                            {message}
                        </div>
                    </div>
                )}
                <h2 className="h4 mb-3 fw-normal">Register for</h2>
                <h1 className="h3 mb-3 fw-normal">Domain Checker</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleRegister}
                >
                    <Form>
                        {!successful && (
                            <div>
                                <div className="form-group mb-4">
                                    <label htmlFor="full_name">Full Name</label>
                                    <Field id="register-full-name" name="full_name" type="text" className="form-control" />
                                    <ErrorMessage
                                        name="full_name"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>

                                <div className="form-group mb-4">
                                    <label htmlFor="email">Email</label>
                                    <Field id="register-email" name="email" type="email" className="form-control" />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>

                                <div className="form-group mb-4">
                                    <label htmlFor="password">Password</label>
                                    <Field
                                        id="register-password"
                                        name="password"
                                        type="password"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>
                                <div className="form-group mb-4">
                                    <label htmlFor="confirmPassword">Re-Enter Password</label>
                                    <Field
                                        id="register-password2"
                                        name="confirmPassword"
                                        type="password"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="confirmPassword"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>

                                <div className="form-group mb-4">
                                    <button id="register-btn" type="submit" className="w-100 btn btn-primary btn-block">Sign Up</button>
                                </div>
                                <div className="form-group">
                                    <p>Already have an account? <Link to="/login">Login here.</Link></p>
                                </div>
                            </div>
                        )}
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default Register;