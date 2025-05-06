import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
    return (
        <div className="unauthorized-wrapper">
            <div className="unauthorized-card">
                <h1>Access Denied</h1>
                <p>You do not have permission to view this page</p>
                <Link to="/dashboard">
                    <button className="save-btn">Go Back to Dashboard</button>
                </Link>
            </div>
        </div>
    );
};

export default Unauthorized