import Navbar from './navbar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { auth, getUser } from '../services/auth';
import { useNavigate } from 'react-router-dom';


export const Login = () => {

    //for redirect to another page
    const navigate = useNavigate();

    const [state, setState] = useState({
        username:"",
        password:""
    })
    const { username, password } = state;

    const inputValue = (name) => (event) => {
        setState({...state, [name]:event.target.value});
    }

    const submitForm = (event) => {
        event.preventDefault();
        //axios for bring data from input post to database
        axios
        .post(`${import.meta.env.VITE_REACT_APP_API}/login`, {username, password})
        .then((res) => {
            Swal.fire(
                'Login success!',
                'Thank you for login.',
                'success'
            )
            auth(res, ()=>{navigate("/create")})
        })
        .catch((err) => {
            Swal.fire(
                'Sorry for a problem!',
                err.response.data.error,
                'error'
            )
        })
    }

    useEffect(()=>{
        getUser() && navigate("/")
    },[])

    return (
        <div className="container p-5">
            <Navbar/>
            <h1>WELCOME TO LOGIN</h1>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" onChange={inputValue("username")} value={username} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" onChange={inputValue("password")} value={password} />
                </div>
                <input type="submit" value="Login" className="btn btn-primary m-2" />
                {/* <a className="btn btn-success" href="/">Homepage</a> */}
            </form>
        </div>
    )
}