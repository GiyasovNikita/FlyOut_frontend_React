import React from 'react';
import planeImage from '../../assets/plane.png';

const Header: React.FC = () => {
    return (
        <div className="header">
            <img src={planeImage} alt="Takeoff the Plane" className="logo"/>
            <h1 className="title">ФлайАут</h1>
            <div className="auth">
                <button className="auth-button">Войти</button>
            </div>
        </div>
    );
};

export default Header;