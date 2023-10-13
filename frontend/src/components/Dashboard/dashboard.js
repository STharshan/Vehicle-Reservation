import React, {  } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import './dashboard.css'
 
function Dashboard() {
 
    const navigate = useNavigate();
    const signOut = () => {
        localStorage.removeItem('Token')
        navigate("/login");
    }
    return (
            <div className="box">
                    <div className="box-container">
                    <div className="text">
                        <h4>Vehicle Reservation System</h4>                     
                    </div>
                        <ul className="navbar" >
                            <li>
                                <Link to="/"  className="dashboard">
                                    <span className="">Dashboard</span> 
                                </Link>
                            </li>
                            <li>
                                <Link to="/create" className="add">
                                    <span className="">Add vehicle</span> 
                                </Link>
                            </li>
                            <li>
                                <button type = 'button' className="signout" onClick= {signOut}>Sign Out</button>
                            </li>
                        </ul>
                    </div>

                <div className="table">
                    <Outlet />
                </div>
            </div>
    )
}
 
export default Dashboard