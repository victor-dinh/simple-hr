import React, { useState, useEffect, useCallback } from "react";
import { Navigate, Link } from "react-router-dom";
import UserService from "../services/user.service";
import { useDispatch, useSelector } from "react-redux";
import { HomeIcon, UserCircleIcon, BriefcaseIcon } from '@heroicons/react/24/solid';

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { logout } from "../slices/auth";

import { setMessage, clearMessage } from "../slices/message";

const Profile = () => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const userId = currentUser?.id;
  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const { message, messageType } = useSelector((state) => state.message);
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(clearMessage());
    }, 5000);

    return () => clearTimeout(timer);
  }, [message, dispatch]);

  const fetchUserData = useCallback(() => {
    UserService.getUser(userId).then((res) => {
      setUser(res.data);
    });
  }, [userId]);

  useEffect(() => {
    if (userId) fetchUserData();
  }, [userId, fetchUserData]);

  const initialValues = {
    full_name: user.full_name || "",
    email: user.email || "",
    phone_number: user.phone_number || "",
    nok_name: user.nok_name || "",
    nok_phone_number: user.nok_phone_number || "",
    address_line_1: user.address_line_1 || "",
    address_line_2: user.address_line_2 || "",
    city: user.city || "",
    state: user.state || "",
    country: user.country || ""
  };

  const handleUpdate = (formValue) => {
    setLoading(true);
    UserService.updateUser(userId, formValue)
      .then((response) => {
        setUser(response.data);
        fetchUserData();
        setLoading(false);
        dispatch(setMessage({
          message: "Profile updated successfully.",
          messageType: "success"
        }));
      })
      .catch((error) => {
        setLoading(false);
        dispatch(setMessage({
          message: "Failed to update profile.",
          messageType: "error"
        }));
      });
  };

  const validationSchema = Yup.object().shape({
    // email: Yup.string()
    //   .email("Enter a valid email address")
    //   .required("This field is required!"),
  });

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="wrapper">
      <div className="sidebar p-5">
        <h4>Domain Checker</h4>
        <div className="mt-4">
          <div className="d-flex align-items-center center flex-wrap">
            <div className="me-2">
              <UserCircleIcon className="me-2" width={40} />
            </div>
            <div>
              <strong>{user.full_name}</strong>
              <div><Link to="/" id="logout" className="btn-log-out" onClick={logOut}>Log out</Link></div>
            </div>
          </div>
          <ul className="nav flex-column mt-4">
            <li className="nav-item">
              <Link to="/" ><HomeIcon className="me-2" width={20} />Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/" ><BriefcaseIcon className="me-2" width={20} />Projects</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="profile-section">
        <div className="profile-header">
          <h3>Profile</h3>
          <ul className="nav col-12">
            <li className="nav-item"><Link to="#" className="active nav-link"><strong>Overview</strong></Link></li>
          </ul>
        </div>
        <div className="profile-content">
          {message && (
            <div className="form-group">
              <div className={`alert alert-${messageType === "error" ? "danger" : "success"}`} role="alert">
                {message}
              </div>
            </div>
          )}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleUpdate}
            enableReinitialize={true}
          >
            {({ loading }) => (
              <Form>
                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label">Full Name</label>
                    <Field type="text" name="full_name" className="form-control" readOnly />
                    <ErrorMessage name="full_name" component="div" className="text-danger" />

                    <label className="form-label mt-3">Email</label>
                    <Field type="email" name="email" className="form-control" readOnly />
                    <ErrorMessage name="email" component="div" className="text-danger" />

                    <label className="form-label mt-3">Phone Number</label>
                    <Field type="text" name="phone_number" className="form-control" />
                    <ErrorMessage name="phone_number" component="div" className="text-danger" />

                    <label className="form-label mt-3">N.O.K (Next of Kin)</label>
                    <Field type="text" name="nok_name" className="form-control" />
                    <ErrorMessage name="nok_name" component="div" className="text-danger" />

                    <label className="form-label mt-3">N.O.K Phone Number</label>
                    <Field type="text" name="nok_phone_number" className="form-control" />
                    <ErrorMessage name="nok_phone_number" component="div" className="text-danger" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Address Line #1</label>
                    <Field type="text" name="address_line_1" className="form-control" />
                    <ErrorMessage name="address_line_1" component="div" className="text-danger" />

                    <label className="form-label mt-3">Address Line #2</label>
                    <Field type="text" name="address_line_2" className="form-control" />
                    <ErrorMessage name="address_line_2" component="div" className="text-danger" />

                    <label className="form-label mt-3">City</label>
                    <Field type="text" name="city" className="form-control" />
                    <ErrorMessage name="city" component="div" className="text-danger" />

                    <label className="form-label mt-3">State</label>
                    <Field type="text" name="state" className="form-control" />
                    <ErrorMessage name="state" component="div" className="text-danger" />

                    <label className="form-label mt-3">Country</label>
                    <Field type="text" name="country" className="form-control" />
                    <ErrorMessage name="country" component="div" className="text-danger" />
                  </div>
                </div>
                <div className="mt-4 text-end">
                  <button type="submit" className="btn btn-save" disabled={loading}>
                    Save
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Profile;