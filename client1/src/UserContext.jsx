import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {data} from "autoprefixer";


export const UserContext = createContext({});

export function UserContextProvider({children}) {
    const [user,setUser] = useState(null);
    const [ready,setReady] = useState(false);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const { data } = await axios.get('http://localhost:5000/profile', 
                    { withCredentials: true, credentials:'include', 
                    });

                console.log("Profile data:", data);
                
                setUser(data);
            } catch (error) {
                console.error("Error fetching profile:", 
                    {
                        message: error.message,
                        response: error.response?.data,
                        status: error.response?.status,

                    });
                setUser(null);
            } finally {
                setReady(true);
            }
        }

        fetchProfile();
    }, []);
    return (
        <UserContext.Provider value={{user,setUser,ready}}>
             {children}
        </UserContext.Provider>
    );
}