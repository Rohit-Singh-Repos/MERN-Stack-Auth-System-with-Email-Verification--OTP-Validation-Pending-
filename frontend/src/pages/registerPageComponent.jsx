import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import {
  Link,
  useNavigate,
} from 'react-router-dom';

import { TOKEN_UTILS } from '../helpers/utils/tokenUtils';
import { userTokenDataStateAction } from '../redux/commonReducers/authSlice';
import { COMMON_SERVICES } from '../redux/commonServices/common.services';

export const RegisterPageComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("")
  const [ registerUser ] = COMMON_SERVICES.useRegisterUserMutation()
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    tc: false,
  });

  const handleInputs = (e) => {
    const { name, value, type, checked } = e.target;
    setInputValue({
      ...inputValue,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const registerUserData = async (e) => {
    const { name, email, password, confirmpassword, tc } = inputValue;
    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmpassword !== "" &&
      tc
    ) {
      if (confirmpassword === password) {
        const { data } = await registerUser(inputValue);
        if (data.status === "success") {
          TOKEN_UTILS.storeToken(data.token)
          dispatch(userTokenDataStateAction(data.token))
          navigate("/dashboard")
        } else {
          setError(data.message);
        }
      } else {
        setError("Confirm password not match");
      }
    } else {
      setError("All fields are required");
    }
  };

  return (
    <div className="container mt-3">
      <h3>Register</h3>
      <div className="card mt-4 p-4">
        <div className="mb-3">
          <label htmlFor="nameInputBox" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="nameInputBox"
            placeholder="Enter name ..."
            value={inputValue.name}
            name="name"
            onChange={handleInputs}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="emailInputBox" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="emailInputBox"
            placeholder="Enter email ..."
            name="email"
            value={inputValue.email}
            onChange={handleInputs}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordInputBox" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="passwordInputBox"
            placeholder="Enter password ..."
            name="password"
            value={inputValue.password}
            onChange={handleInputs}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPasswordInputBox" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPasswordInputBox"
            placeholder="Confirm password ..."
            name="confirmpassword"
            value={inputValue.confirmpassword}
            onChange={handleInputs}
          />
        </div>
        <div className="mb-3">
          <div className="form-check">
            <input
              className="form-check-input"
              onChange={handleInputs}
              name="tc"
              type="checkbox"
              checked={inputValue.checkboxValue}
              id="flexCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              I accept the terms & conditions
            </label>
          </div>
        </div>
        <button className="btn btn-primary mt-2" onClick={registerUserData}>
          Register
        </button>
        <div className="form-text mt-3">
          Already Registered ?
          <Link to="/login" className="text-decoration-none">
            {" "}
            Login
          </Link>
        </div>
      </div>
      {error && (
        <div className="alert alert-danger mt-2" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};
