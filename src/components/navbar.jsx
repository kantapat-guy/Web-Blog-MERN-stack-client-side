import {Link, useNavigate} from 'react-router-dom'
import { getUser, logout } from '../services/auth';

const Navbar = () => {

    //for redirect to another page
    const navigate = useNavigate();

    return (
        <nav>
            <ul className="nav nav-tabs">
                <li className="nav-item pr-3 pt-3 pb-3">
                    <Link className="nav-link" to="/">Homepage</Link>
                </li>
                {!getUser() && (
                        <li className="nav-item pr-3 pt-3 pb-3">
                        <Link className="nav-link" to="/login">Login</Link>
                        </li>
                    )}
                {getUser() && (
                        <li className="nav-item pr-3 pt-3 pb-3">
                            <Link className="nav-link" to="/create">Create content</Link>
                        </li>
                    )}
                {getUser() && (
                        <li className="nav-item pr-3 pt-3 pb-3">
                            <button className="nav-link" onClick={()=>logout(()=>navigate("/"))}>Logout</button>
                        </li>
                    )}
            </ul>
        </nav>
    )
}

export default Navbar;