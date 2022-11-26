import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from "../assets/react.svg"
import { AuthContext } from '../contexts/authContent';

export default function Navbar() {
    const {currentUser,logout} = useContext(AuthContext);



    return (
        <div className="navbar">
            <div className="container">
                <div className="logo">
                    <img src={Logo} alt="" />
                </div>
                <div className="links">
                    <NavLink className="link" to="/?cat=art" activeclass="active">ART</NavLink>
                    <NavLink className="link" to="/?cat=science" activeclass="active">SCIENCE</NavLink>
                    <NavLink className="link" to="/?cat=tech" activeclass="active">TECHNOLOGY</NavLink>
                    <NavLink className="link" to="/?cat=food" activeclass="active">FOOD</NavLink>
                    <span>{currentUser?.username}</span>
                    {currentUser ? <span onClick={logout}>Logout</span> : <Link className="link" to="/login">Login</Link>}
                    <span className="write">
                        <NavLink className="link" to="/write" activeclass="active">Write</NavLink>
                    </span>
                </div>
            </div>
        </div>
    )
}
