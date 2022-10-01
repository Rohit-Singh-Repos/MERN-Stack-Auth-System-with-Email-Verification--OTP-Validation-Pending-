import { useState } from 'react';

import { COMMON_SERVICES } from '../redux/commonServices/common.services';

export const SendPasswordResetInfo = () => {
  const [radioValue, setRadioValue] = useState("email");
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [inputValue, setInputValue] = useState({
    email:"",
    number:""
  })
  const [ sendPasswordResetEmail,{isLoading} ] = COMMON_SERVICES.useSendPasswordResetEmailMutation()
  const handleRadio = (e) => {
    setError("")
    setSuccess("")
    setRadioValue(e.target.value)
  }
  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]:value
    })
  }

  const passwordResetMethod = async() => {
    const { email, number } = inputValue;
    if(email !== "" && number !== ""){
      setError("Please choose one method for password reset")
      setSuccess("")
    }else if(radioValue === "email"){
      if(email !== ""){
         const { data } = await sendPasswordResetEmail(email) 
         if(data && data?.status === "success"){
           setError("")
           setInputValue({email:""})
           setSuccess(data.message)
         }else{
           setError("Email Address not found")
           setSuccess("")
         }
      }else{
        setError("Please enter your email")
        setSuccess("")
      }
    }else if(radioValue === "number"){
      if(number !== ""){

      }else{
        setError("Please enter your number")
        setSuccess("")
      }
    }
  }

  return (
    <div className="container mt-3">
      <h3>Choose a method for reset password</h3>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="card mt-4 p-4">
            <div className="mb-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="email"
                  checked={radioValue === "email"}
                  name="resetpassword"
                  onChange={handleRadio}
                  id="emailRadioButton"
                />
                <label className="form-check-label" htmlFor="emailRadioButton">
                  Using Email
                </label>
              </div>
              <div className="mt-4">
                <label htmlFor="emailInputBox" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={inputValue.email}
                  id="emailInputBox"
                  name="email"
                  placeholder="Enter your email ..."
                  disabled={radioValue === "email" ? false : true}
                  onChange={handleInputs}
                />
              </div>
              {isLoading ? (
                <button class="btn btn-primary mt-4" type="button">
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Loading...</span>
                </button>
              ) : (
                <button
                  disabled={radioValue === "email" ? false : true}
                  className="btn btn-primary mt-4"
                  onClick={passwordResetMethod}
                >
                  Send Link
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="card mt-4 p-4">
            <div className="mb-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="resetpassword"
                  value="number"
                  checked={radioValue === "number"}
                  id="numberRadioButton"
                  onChange={handleRadio}
                />
                <label className="form-check-label" htmlFor="numberRadioButton">
                  Using Number
                </label>
              </div>
              <div className="mt-4">
                <label htmlFor="numberInputBox" className="form-label">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={inputValue.number}
                  disabled={radioValue === "number" ? false : true}
                  id="numberInputBox"
                  name="number"
                  placeholder="Enter your number ..."
                  onChange={handleInputs}
                />
              </div>
              <button
                onClick={passwordResetMethod}
                disabled={radioValue === "number" ? false : true}
                className="btn btn-primary mt-4"
              >
                Send OTP
              </button>
            </div>
          </div>
        </div>
      </div>
      {error && success === "" ? (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      ) : (
        <></>
      )}
      {error === "" && success ? (
        <div className="alert alert-success mt-3" role="alert">
          {success}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
