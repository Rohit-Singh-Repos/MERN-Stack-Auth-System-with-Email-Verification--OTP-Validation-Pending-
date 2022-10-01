import { createApi } from '@reduxjs/toolkit/dist/query/react';

import { TOKEN_UTILS } from '../../helpers/utils/tokenUtils';
import { COMMON_API_CALLS } from '../commonApiCalls/common.api.';

export const registerUserServices = createApi({
    reducerPath:"registerUserServices",
    baseQuery:COMMON_API_CALLS.baseURLPath(),
    endpoints:(builder) => ({
        // Here "registerUser" is the action
        registerUser:builder.mutation({
            query:(userData) => {
                return {
                    url:"/registeruser",
                    method:"post",
                    body:userData,
                    // headers:{ Can also pass headers here
                    //     'Content-type':'application/json'
                    // }
                }
            }
        })
    })
})

export const loginUserServices = createApi({
    reducerPath:"loginUserServices",
    baseQuery:COMMON_API_CALLS.baseURLPath(),
    endpoints:(builder) => ({
        loginUser:builder.mutation({
            query:(userData) => {
                return {
                    url:"/loginuser",
                    method:"post",
                    body:userData,
                }
            }
        })
    })
})

export const getLoggedInUserServices = createApi({
    reducerPath:"getLoggedInUserServices",
    baseQuery:COMMON_API_CALLS.baseURLPath(),
    endpoints:(builder) => ({
        getLoggedInUserInfo:builder.query({
            query:() => {
                return {
                    url:"/getloggedinuserinfo",
                    method:"get",
                    headers:{
                        'Content-type':'application/json',
                        'Authorization':'Bearer '+TOKEN_UTILS.getToken()
                    }
                }
            }
        })
    })
})

export const sendPasswordResetEmailServices = createApi({
    reducerPath:"sendPasswordResetEmailServices",
    baseQuery:COMMON_API_CALLS.baseURLPath(),
    endpoints:(builder) => ({
        sendPasswordResetEmail:builder.mutation({
            query:(email) => {
                return {
                    url:"/sendpaswordresetemail",
                    method:"post",
                    body:{email}
                }
            }
        })
    })
})

export const resetPasswordServices = createApi({
    reducerPath:"resetPasswordServices",
    baseQuery:COMMON_API_CALLS.baseURLPath(),
    endpoints:(builder) => ({
        resetUserPassword:builder.mutation({
            query:(requestData) => {
                const { password, id, token} = requestData
                return {
                    url:`/resetpassword/${id}/${token}`,
                    method:"post",
                    body:{password}
                }
            }
        })
    })
})

export const changeUserPasswordServices = createApi({
    reducerPath:"changeUserPasswordServices",
    baseQuery:COMMON_API_CALLS.baseURLPath(),
    endpoints:(builder) => ({
        changeUserPassword:builder.mutation({
            query:(password) => {
                return {
                    url:`/changepassword`,
                    method:"post",
                    body:{password},
                    headers:{
                        'Content-type':'application/json',
                        'Authorization':'Bearer '+TOKEN_UTILS.getToken()
                    }
                }
            }
        })
    })
})

const { useRegisterUserMutation } = registerUserServices;
const { useLoginUserMutation } = loginUserServices;
const { useGetLoggedInUserInfoQuery } = getLoggedInUserServices;
const { useSendPasswordResetEmailMutation } = sendPasswordResetEmailServices;
const { useResetUserPasswordMutation } = resetPasswordServices;
const { useChangeUserPasswordMutation } = changeUserPasswordServices

export const COMMON_SERVICES = {
    useRegisterUserMutation,
    useLoginUserMutation,
    useGetLoggedInUserInfoQuery,
    useSendPasswordResetEmailMutation,
    useResetUserPasswordMutation,
    useChangeUserPasswordMutation
}