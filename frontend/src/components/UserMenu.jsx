import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="dropdown ms-3">
            <button
                className="btn btn-light rounded-circle d-flex align-items-center justify-content-center p-0"
                type="button"
                id="userMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ width: '40px', height: '40px' }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-fill text-success" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                </svg>
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userMenuButton">
                <li><button className="dropdown-item" type="button">User Profile</button></li>
                <li><button className="dropdown-item" type="button">Settings</button></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button className="dropdown-item text-danger" type="button" onClick={handleLogout}>Logout</button></li>
            </ul>
        </div>
    );
};

export default UserMenu;
