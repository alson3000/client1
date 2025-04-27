import {Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

export default function RegisterPage(){
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    //Submit function for the form
    async function registerUser(ev){
        ev.preventDefault();
        try{
            await axios.post('http://localhost:5000/register', {
                name,
                email,
                password,
            }, { withCredentials:true});
            alert('Registration successful. Now you can log in');
        }   catch (e){
            alert('Registration failed. Please try again later');
        }
    }
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Create an Account</h1>
                <form className="w-full mx-auto max-w-md" onSubmit={registerUser}>
                   
                    <input type="text" 
                        placeholder="John Doe"
                        value={name}
                        onChange={ev => setName(ev.target.value)}
                        className="w-full border border-gray-400 my-1 py-2 px-3 rounded-2xl"
                    />
                        

                    <input type="email" 
                        placeholder="your@email.com"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}
                        className="w-full border border-gray-400 my-1 py-2 px-3 rounded-2xl"
                    />
                       

                    <input type="password" 
                        placeholder="password" 
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}
                        className="w-full border border-gray-400 my-1 py-2 px-3 rounded-2xl"
                    />
                        
                    <button className="w-full bg-sky-500 text-white py-2 px-4 rounded-full mt-2">Register</button>
                    
                    <div className="text-center py-2 text-gray-500">
                        Already a member?  
                        <Link className="underline text-black" to={'/login'}> Login</Link>
                    </div>

                    <p className="text-center text-red-500 mt-2">Note: Password must be at least 6 letters</p>
                </form>
            </div>
        </div>
    );
}