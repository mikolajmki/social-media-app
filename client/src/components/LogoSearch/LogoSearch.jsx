import React from "react";
import Logo from '../../img/logo.png';
import './LogoSearch.css'
import { UilSearch } from '@iconscout/react-unicons';

const logoSearch = () => {
    return (
        <div className="logo-search">
            <img src={Logo} alt=""/>
            <div className="search">
                <input type="text" placeholder="#Explore" />
                <div className="s-icon">
                    <UilSearch/>
                </div>
            </div>
        </div>
    )
}

export default logoSearch;