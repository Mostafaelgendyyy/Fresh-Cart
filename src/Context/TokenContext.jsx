import { createContext, useEffect, useState } from "react";

export let TokenContext = createContext();

export default function TokenContextProvider(props)
{
    const [Token, setToken] = useState(null);
    useEffect(()=>{
        if(localStorage.getItem('token'))
        {
            setToken(localStorage.getItem('token'));
        }
    },[])
    return  <TokenContext.Provider value={{Token,setToken}}>
                {props.children}
            </TokenContext.Provider>
}