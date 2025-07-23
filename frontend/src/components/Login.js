import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { login } from "../slices/auth";
import { setMessage, clearMessage } from "../slices/message";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Enter a valid email address")
      .required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const handleLogin = (formValue) => {
    const { email, password } = formValue;
    setLoading(true);

    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        dispatch(setMessage({ message: "Login successful.", messageType: "success" }));
        navigate("/dashboard");
      })
      .catch((errorMessage) => {
        setLoading(false);
        dispatch(setMessage({ message: errorMessage, messageType: "error" }));
      });
  };


  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="col-md-12 login-form">
      <div className="card card-container">
        <h1 className="h3 mb-3 fw-normal">Domain Checker</h1>

        {message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <div className="form-group mb-4">
              <label htmlFor="email">Email</label>
              <Field id="login-email" name="email" type="email" className="form-control" />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="form-group mb-4">
              <label htmlFor="password">Password</label>
              <Field id="login-password" name="password" type="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="form-group mb-4">
              <button id="login-btn"
                type="submit"
                className="w-100 btn btn-primary btn-block"
                disabled={loading}
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm me-2" />
                )}
                <span>Login</span>
              </button>
            </div>

            <div className="form-group mb-4 text-center">
              <p>
                Don't have an account? <Link to="/register">Register here.</Link>
              </p>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
