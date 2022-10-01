import React from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  NavLink,
  useNavigate,
} from 'react-router-dom';

import { TOKEN_UTILS } from '../helpers/utils/tokenUtils';
import {
  resetUserTokenDataStateAction,
} from '../redux/commonReducers/authSlice';
import {
  resetUserInfoStateAction,
} from '../redux/commonReducers/userInfoSlice';

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { userToken:{userTokenDataState} = {} } = useSelector((state) => state.commonReducer)
  const logoutUser = () => {
    TOKEN_UTILS.removeToken("authToken");
    dispatch(resetUserTokenDataStateAction())
    dispatch(resetUserInfoStateAction())
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          MERN Stack Auth App
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {userTokenDataState.length !== 0 ? (
              <>
                <li className="nav-item">
                  <NavLink
                    type="button"
                    className={({isActive}) => isActive ? "btn btn-link text-decoration-none text-white active" : "btn btn-link text-decoration-none text-white"}
                    onClick={logoutUser}
                  >
                    Logout
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({isActive}) => isActive ? "btn btn-link text-decoration-none text-white active" : "btn btn-link text-decoration-none text-white"}
                    to="/dashboard"
                  >
                    Dashboard
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="/about"
                  >
                    About
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="/register"
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
