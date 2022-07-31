import React from 'react';
import headerImage from '../assets/images/paint_logo-04.jpg';

const Header: React.FC = (): JSX.Element => 
    <div id="header-container">
        <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand" href="#">
                <img src={headerImage} width="30" height="30" className="d-inline-block align-top" alt="" />
                The Minis Paint App
            </a>
        </nav>
    </div>

export default Header;