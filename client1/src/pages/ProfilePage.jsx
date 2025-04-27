import {useContext, useState} from "react";
import { UserContext } from "../UserContext.jsx";
import {Link, Navigate, useParams} from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage.jsx";
import AccountNav from "../AccountNav.jsx";


export default function ProfilePage() {
    const [redirect,setRedirect] = useState(null);
    const {ready,user,setUser} = useContext(UserContext);

    let {subpage} = useParams();
    if (subpage === undefined) {
        subpage = 'profile';
    }

    async function logout() {
        try{
            await axios.post('http://localhost:5000/logout', {}, { withCredentials:true});
            setUser(null);
            setRedirect('/');
        } catch (error) {
            console.error('Logout failed:', error.response || error.message);
        }
    }

    if (!ready) {
        return 'Loading...';
    }

    if (ready && !user && !redirect) {
        return <Navigate to={'http://localhost:5000/login'} />
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return(
        <div>
            <AccountNav/>
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.username} ({user.email})<br />
                    <button onClick={logout} className="bg-sky-500 p-2 w-full mt-2 text-white rounded-2xl">Logout</button>
                </div>
            )}
            {subpage === 'places' && (
                <PlacesPage/>
            )}
        </div>
    );
}