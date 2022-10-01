import { useState } from 'react';

import { useDispatch } from 'react-redux';
import {
  Link,
  useNavigate,
} from 'react-router-dom';

import { TOKEN_UTILS } from '../helpers/utils/tokenUtils';
import { userTokenDataStateAction } from '../redux/commonReducers/authSlice';
import { COMMON_SERVICES } from '../redux/commonServices/common.services';

export const LoginPageComponent = () => {

  const navigate = useNavigate();
  const [ loginUser ] = COMMON_SERVICES.useLoginUserMutation()
  const dispatch = useDispatch();
  const [error, setError] = useState("")
  const [inputValue, setInputValue] = useState({
    email:"",
    password:""
  })

  const handleInputs = (e) => {
    const { name,value } = e.target
    setInputValue({
      ...inputValue,
      [name]:value
    })
  }

  const loginUserData = async() => {
    const { email, password } = inputValue
    if(email && password){
      const { data } = await loginUser(inputValue)
      if(data && data?.status === "success"){
        TOKEN_UTILS.storeToken(data.token)
        dispatch(userTokenDataStateAction(data.token))
        navigate("/dashboard")
      }else{
        setError(data.message)
      }
    }else(
      setError("All fields are required")
    )
  }

  return (
    <div className="container mt-3">
      <h3>Login</h3>
      <div className="card mt-4 p-4">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail" className="form-label">
              Email 
            </label>
            <input
              type="email"
              name='email'
              value={inputValue.email}
              onChange={handleInputs}
              className="form-control"
              id="exampleInputEmail"
              placeholder='Enter email ...'
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              name='password'
              value={inputValue.password}
              onChange={handleInputs}
              className="form-control"
              id="exampleInputPassword"
              placeholder='Enter password ...'
            />
            <div className="form-text mt-2">
              <Link to="/sendpasswordresetlink" className='text-decoration-none'>Forget Password ?</Link>
            </div>
          </div>
          <button className="btn btn-primary mt-2" onClick={loginUserData}>Login</button>
        <div className="form-text mt-3">
          Not a member ?<Link to="/register" className='text-decoration-none'> Signup now</Link>
        </div>
      </div>
      {error && (
        <div className="alert alert-danger mt-2" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
