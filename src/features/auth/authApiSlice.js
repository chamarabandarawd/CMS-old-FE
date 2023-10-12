import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        login:builder.mutation({
            query:credentilas=>({
                url:'/userInfo/login',
                method:'POST',
                body:{...credentilas}
            })
        }),
    })

})

export const {useLoginMutation}=authApiSlice