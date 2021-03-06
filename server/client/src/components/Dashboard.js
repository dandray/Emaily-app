import React from 'react';
//Librairie React permettant de créer des liens de routage <Link>, à la place des ancres <a>, et les lier à nos routes du fichier App.js
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div><h2>Dashboard</h2> 
        
        <div className="fixed-action-btn">
            <Link to="/surveys/new" className="btn-floating btn-large red">
                <i className="material-icons">add</i>
            </Link>
            </div>
        </div>
    );
};

export default Dashboard;