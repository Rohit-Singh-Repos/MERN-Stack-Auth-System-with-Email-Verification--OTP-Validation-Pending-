import React, { useState } from 'react';

import {
  Link,
  useParams,
} from 'react-router-dom';

import { COMMON_SERVICES } from '../redux/commonServices/common.services';

export const ResetPasswordPageComponent = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [inputValue, setInputValue] = useState({
    password: "",
    confirmPassword: "",
  });
  const { id, token } = useParams();
  const [resetUserPassword] = COMMON_SERVICES.useResetUserPasswordMutation();

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const resetPassword = async () => {
    const { password, confirmPassword } = inputValue;
    if (password === "") {
      setError("Password should not be empty");
    } else {
      if (confirmPassword === password) {
        const requestData = { password, id, token };
        const { data } = await resetUserPassword(requestData);
        if (data && data?.status === "success") {
          setInputValue({ password: "", confirmPassword: "" });
          setError("");
          setSuccess(data?.message);
        } else {
          setError(data?.message);
        }
      } else {
        setError("Password and Confirm Password not match");
      }
    }
  };
  return (
    <div className="container mt-3">
      <h3>Reset password</h3>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="card mt-4 p-4">
            <div className="mt-4">
              <label htmlFor="passwordInput" className="form-label">
                New Password
              </label>
              <input
                type="text"
                className="form-control"
                value={inputValue.password}
                id="passwordInput"
                name="password"
                placeholder="New Password ..."
                onChange={handleInputs}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="confirmPasswordInput" className="form-label">
                Confirm New Password
              </label>
              <input
                type="text"
                className="form-control"
                value={inputValue.confirmPassword}
                id="confirmPasswordInput"
                name="confirmPassword"
                placeholder="Confirm Password ..."
                onChange={handleInputs}
              />
            </div>
          </div>
        </div>
      </div>
      <button className="btn btn-primary mt-3" onClick={resetPassword}>
        Reset Password
      </button>
      {error && success === "" ? (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      ) : (
        <></>
      )}
      {error === "" && success ? (
        <div className="alert alert-success mt-3" role="alert">
          {success}{" "}
          <Link className="btn btn-link" to="/login">
            Login Again
          </Link>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
