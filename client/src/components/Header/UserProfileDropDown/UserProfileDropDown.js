import React from 'react'

import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import {
    Profile,
} from "../../../assets/images";
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../../../actions/auth';


function UserProfileDropDown() {
    /* --------------------------------- states --------------------------------- */
    const user = useSelector( (state) => state.auth.user );

    /* ---------------------------------- hooks --------------------------------- */
    const dispatch = useDispatch();

    /* -------------------------------- functions ------------------------------- */
    const handleLogOut = () => {
        dispatch( logout() );
    }


    return (
        <div className="nav-item dropdown">

            <Link to="#"  className="nav-link nav-profile d-flex align-items-center gap-2" data-bs-toggle="dropdown">
                <img src={Profile} alt="Profile" className="rounded-circle dropdown-toggle" />
            </Link>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile p-3">

                <li className="dropdown-header">
                    <h6>{user.firstname} {user.lastname}</h6>
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
                    <Link to="/" className="dropdown-item d-flex align-items-center gap-2" onClick={handleLogOut}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                        <span>Log Out</span>
                    </Link>
                </li>

            </ul>
        </div>
    )
}

export default UserProfileDropDown