import {Link, Navigate} from "react-router-dom";
import {useContext, useState} from "react";
import axios from 'axios';
import {UserContext} from "../UserContext.jsx"


export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);
    
    async function handleLoginSubmit(ev){
        ev.preventDefault();
        try{
            const {data} = await axios.post('http://localhost:5000/login', {email,password}, { 
                withCredentials:true, credentials: 'include'});
            setUser(data);
            setRedirect(true);
        } catch (e){
           alert('Login failed');
        }
    }

    if (redirect){
        return <Navigate to={'/'} />
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="w-full mx-auto max-w-md" onSubmit={handleLoginSubmit}>

                    <input type="email" placeholder="your@email.com" 
                        value={email} 
                        onChange={ev => setEmail(ev.target.value)} 
                        className="w-full border border-gray-400 my-1 py-2 px-3 rounded-2xl"/>

                    <input type="password" placeholder="password" 
                        value={password} 
                        onChange={ev => setPassword(ev.target.value)} 
                        className="w-full border border-gray-400 my-1 py-2 px-3 rounded-2xl"/>

                    <button className="w-full bg-sky-500 text-white py-2 px-4 rounded-full mt-2">Login</button>
                    <div className="text-center py-2 text-gray-500">
                        Don't have account yet?  
                        <Link className="underline text-black" to={'/register'}> Register now</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}