import { useSelector } from 'react-redux';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import { AboutPageComponent } from '../pages/aboutPageComponent';
import { DashboardPageComponent } from '../pages/dashboardPageComponent';
import { ErrorPageComponent } from '../pages/errorPageComponent';
import { HomePageComponent } from '../pages/homePageComponent';
import { LoginPageComponent } from '../pages/loginPageComponent';
import { RegisterPageComponent } from '../pages/registerPageComponent';
import {
  ResetPasswordPageComponent,
} from '../pages/resetPasswordPageComponent';
import { SendPasswordResetInfo } from '../pages/sendPasswordResetInfo';

const AppRoutesComponent = () => {
    const { userToken:{userTokenDataState} = {} } = useSelector((state) => state.commonReducer)
    return(
        <Routes>
            <Route path="/" element={<HomePageComponent/>}/>
            <Route path="/about" element={<AboutPageComponent/>}/>
            <Route path="/login" element={userTokenDataState.length === 0 ? <LoginPageComponent/> : <Navigate to="/dashboard"/>}/>
            <Route path="/register" element={userTokenDataState.length === 0 ? <RegisterPageComponent/> : <Navigate to="/dashboard"/>}/>
            <Route path="/sendpasswordresetlink" element={<SendPasswordResetInfo/>}/>
            <Route path="/api/user/resetpassword/:id/:token" element={<ResetPasswordPageComponent/>}/>
            <Route path="/dashboard" element={userTokenDataState.length !== 0 ? <DashboardPageComponent/> : <Navigate to="/login"/>}/>
            <Route path="*" element={<ErrorPageComponent/>}/>
        </Routes>
    )
}

export default AppRoutesComponent