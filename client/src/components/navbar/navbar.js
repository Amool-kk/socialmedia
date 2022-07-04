import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css'

const Navbar = () => {

    const navigate = useNavigate()

    const logout = async () => {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/logout`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        console.log(res.status)
        if(res.status === 200){
            navigate('/login')
        }
    }

    return (
        <>
            <div className="navbar">
                <div className="uper">
                    <div className="search">
                        <input type="text" placeholder='Search Your Friend' />
                        <div className="searchResult none">
                        </div>
                    </div>
                    <div className="profile">
                        <div className="profilePic" style={{color:'black',textTransform: 'capitalize',cursor:'pointer'}} name={localStorage.getItem('username')} 
                        onClick={(e)=>{navigate(`/profile:${localStorage.getItem('username')}`)}} >
                            {localStorage.getItem('username')[0]}
                        </div>
                        <div className="profileMenu none">
                            <li>Account</li>
                            {/* <li>Recent</li> */}
                        </div>
                    </div>
                </div>
                <ul>
                    <Link to={'/'}>Home</Link>
                    <Link to={'/logout'} onClick={logout}>Logout</Link>
                </ul>
            </div>
        </>
    )
}

export default Navbar;