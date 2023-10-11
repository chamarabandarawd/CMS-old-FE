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


const apiSlice=createSlice({})