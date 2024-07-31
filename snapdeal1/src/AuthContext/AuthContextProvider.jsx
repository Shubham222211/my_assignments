import { createContext, useState } from "react";

export const AuthContext=createContext()

export function AuthContextProvider({children}){

    const [authDetails,setAuthDetails]=useState({

        isLoggedin:false,
        token:"",
    })


const login=(token)=>{
    setAuthDetails({
        isLoggedin:true,
        token,  
    })
}



const logout=(token)=>{
    setAuthDetails({
        isLoggedin:false,
        token,  
    })
}

const valuesInContextBox={
    ...authDetails,
    login,
    logout
}



    return  <AuthContext.Provider value={valuesInContextBox}>
            {children}
    </AuthContext.Provider>
}