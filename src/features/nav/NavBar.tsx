import React from 'react';
import logo from '../../assets/logo.png';
import './NavBar.css';

const NavBar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="navbar-left">
                    <img src={logo} alt="logo" className="navbar-logo" />
                    <ul className="nav-links">
                        <li><a href="/Dashboard">Dashboard</a></li>
                        <li><a href="/Issues">Issues</a></li>
                        <li><a href="/Assets">Assets</a></li>
                        <li><a href="/Reports">Reports</a></li>
                    </ul>
                </div>
                <div className="user-info">
                    <span className="user-name">Welcome, User!</span>
                    <button className="logout-button">Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
