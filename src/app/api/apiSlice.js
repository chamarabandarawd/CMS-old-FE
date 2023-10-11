import { createSlice, fetchBaseQuery } from "@reduxjs/toolkit";
import {setCredentails,logOut} from '../../features/auth/authSlice'


const baseQuery=fetchBaseQuery({
    baseUrl:'http://localhost:8080',
    //credential:'include'
    prepareHeader:(headers,{getState})=>{
        const token=getState().auth.token
        if(token){
            headers.set("authorization",`Bearer ${token}`)
        }
        return headers;
    }
})


const baseQueryWithReauth=async(args,api,extraOptions)=>{
    let result = await baseQuery(args,api,extraOptions)

    if(result?.error?.originalStatus===401){
        console.log('sending refresh token')
        //send refresh token to get new accesstoken
        const refreshResult=await baseQuery('/userInfo/refreshToken',api,extraOptions)
        console.log(refreshResult)
        if(refreshResult?.data){
            const user =api.getState().auth.user
            //store the ne token
            api.dispatch(setCredentails({...refreshResult.data,user}))
            //retry the original query with new access token
            result=await baseQuery(args,api,extraOptions)
        }else{
            api.dispatch(logOut());
        }
    }
    return result;
}



export const apiSlice=createAPi({
    baseQuery:baseQueryWithReauth,
    endpoints:builder=>({})
})