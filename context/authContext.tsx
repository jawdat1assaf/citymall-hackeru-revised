
import jwtDecode from "jwt-decode";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null as any);

export const AuthProvider = (props: any) => {
    const [user, stUser] = useState(null as any);


    useEffect(() => {
        const localStorageUser = localStorage.getItem("user");
        if (localStorageUser) {
            stUser(JSON.parse(localStorageUser));
        }
    }, [])

    const setUser = (usr: any) => {
        stUser(usr);
        localStorage.setItem("user", JSON.stringify(usr));
    }


    return (
        <AuthContext.Provider value={[user, setUser]} children={props.children} />
    )
}