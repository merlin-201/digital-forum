import React from 'react'
import { Link } from 'react-router-dom'

import {
    Logo,
    // Favicon
} from "../../assets/images";

import './Header.css'

import UserProfileDropDown from './UserProfileDropDown/UserProfileDropDown';

/* ---------------------------- useDispatch Hook ---------------------------- */
import { useDispatch, useSelector } from 'react-redux';

/* --------------------------------- actions -------------------------------- */
import { showModal } from '../../actions/authModal';

export default function Header( ) {
    const user = useSelector( state => state.auth.user );

    /* -------------------------------- dispatch -------------------------------- */
    const dispatch = useDispatch();

    /* -------------------------------- functions ------------------------------- */
    const handleLoginButton = () => {
        dispatch( showModal("login") );  
    }

    const handleSignupButton = () => {
        dispatch( showModal("signup") )
    }

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
                { user 
                    ? <UserProfileDropDown />
                    : (
                        <div className="d-flex justify-space-between">
                            <button className="btn btn-success mx-2" onClick={handleLoginButton}>
                                Log In
                            </button>

                            <button className="btn btn-primary mx-2" onClick={handleSignupButton}>
                                Sign Up
                            </button>
                        </div>
                    )
                }
            </nav>

        </header>
    )
}
