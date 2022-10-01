import {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { userInfoDataStateAction } from '../redux/commonReducers/userInfoSlice';
import { COMMON_SERVICES } from '../redux/commonServices/common.services';

export const DashboardPageComponent = () => {
  const { data:userInfoData, isSuccess } = COMMON_SERVICES.useGetLoggedInUserInfoQuery()
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch()
  const { userInfo:{userInfoDataState : {userData : {useremail,username} = {}} = {}} = {}} = useSelector((state) => state.commonReducer)
  const [inputValue, setInputValue] = useState({
    oldpassword:"",
    password:"",
    confirmnewpassword:""
  })
  const [ changeUserPassword ] = COMMON_SERVICES.useChangeUserPasswordMutation();
  useEffect(() => {
    if(userInfoData && isSuccess){
      dispatch(userInfoDataStateAction(userInfoData))
    }
  },[userInfoData])

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]:value
    })
  }

  const changePassword = async () => {
      const { oldpassword, password, confirmnewpassword } = inputValue;
      if(password !== ""){
        if(confirmnewpassword === password){
            const { data } = await changeUserPassword(password);
            if(data && data?.status === "success"){
              setError("")
              setInputValue({
                oldpassword:"",
                password:"",
                confirmnewpassword:""
              })
              setSuccess(data?.message)
            }else{
              setError("Something went wrong")
            }
        }else{
          setError("New Password and Confirm Password Not Match")
        }
      }else{
        setError("Enter new password")
      }
  }
  return (
    <div className="container mt-3">
      <h3>User Dashboard</h3>
      <div className="g-0 mt-5">
        <div className="card row">
          <div className="col-md-4">
            <img src="..." className="img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">User Info</h5>
              <p className="card-text mt-2">
                <span>Name - {username && username}</span>
                <br />
                <span>Email - {useremail && useremail}</span>
              </p>
              {/* <Link className='btn btn-primary' to="/updateuserinfo">Update Info</Link> */}
            </div>
          </div>
        </div>
      </div>
      <div className="card mt-5">
        <div className="card-body">
          <h5 className="card-title">Change Password</h5>
          <div className="mb-3 mt-3">
            <label htmlFor="oldPasswordBox" className="form-label">
              Old Password
            </label>
            <input
              type="email"
              value={inputValue.oldpassword}
              className="form-control"
              name='oldpassword'
              id="oldPasswordBox"
              placeholder="Old Password ..."
              onChange={handleInputs}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="newPasswordBox" className="form-label">
              New Password
            </label>
            <input
              type="email"
              value={inputValue.password}
              name='password'
              className="form-control"
              id="newPasswordBox"
              placeholder="New Password ..."
              onChange={handleInputs}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Confirm New Password
            </label>
            <input
              type="email"
              value={inputValue.confirmnewpassword}
              name='confirmnewpassword'
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Confirm New Password ..."
              onChange={handleInputs}
            />
          </div>
          <button className="btn btn-primary" onClick={changePassword}>Change Password</button>
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
}
