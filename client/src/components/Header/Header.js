import React from 'react'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faLock } from '@fortawesome/free-solid-svg-icons';

import {
    Profile,
    Logo,
    // Favicon
} from "../../assets/images";

import './Header.css'

export default function Header() {
    return (
        <header id="header" className="header fixed-top d-flex justify-content-between align-items-center px-4 py-3">

            <div className="d-flex align-items-center justify-content-center">
                <Link to="/" className="logo d-flex align-items-center">
                    <img className="mx-2" src={Logo} alt="" />
                    <span className="d-none d-lg-block">Stocks Forum</span>
                </Link>
            </div>

            <div className="search-bar w-50">
                <form className="search-form d-flex align-items-center" method="POST" action="#">
                    <input className="px-3" type="text" name="query" placeholder="Search Topics" title="Enter search keyword" />
                </form>
            </div>

            <nav className="header-nav ms-auto">

                <div className="nav-item dropdown">

                    <Link to="#"  className="nav-link nav-profile d-flex align-items-center gap-2" data-bs-toggle="dropdown">
                        <img src={Profile} alt="Profile" className="rounded-circle dropdown-toggle" />
                    </Link>

                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile p-3">

                        <li className="dropdown-header">
                            <h6>merlin-201</h6>
                        </li>

                        <li><hr className="dropdown-divider" /></li>

                        <li>
                            <Link to="/profile" className="dropdown-item d-flex align-items-center gap-2" >
                                <FontAwesomeIcon icon={faHome} ></FontAwesomeIcon>

                                <span>My Profile</span>
                            </Link>
                        </li>

                        <li><hr className="dropdown-divider" /></li>

                        <li>
                            <Link to="/signout" className="dropdown-item d-flex align-items-center gap-2">
                                <FontAwesomeIcon icon={faLock} ></FontAwesomeIcon>
                                <span>Sign Out</span>
                            </Link>
                        </li>

                    </ul>
                </div>

            </nav>

        </header>
    )
}
