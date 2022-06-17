import React from 'react'

import { Modal } from "react-bootstrap"

/* ------------------------------- react-redux ------------------------------ */
import { useSelector, useDispatch } from 'react-redux'

/* --------------------------------- actions -------------------------------- */
import { hideModal } from '../../actions/authModal'
import { resetSignup } from '../../actions/auth'

/* ------------------------------- components ------------------------------- */
import Signup from './Signup/Signup'
import Login from './Login/Login'



function AuthModal( ){
    const dispatch = useDispatch();

    /* ------------------------- redux-store selections ------------------------- */
    const showAuthModal = useSelector( (state) => state.authModal.show )
    const authModalBody = useSelector( (state) => state.authModal.body )
    const errorMessage = useSelector( (state) => state.authModal.errorMessage)

    /* -------------------------------- functions ------------------------------- */
    const handleModalHide = () => {
        dispatch( hideModal() );
        dispatch( resetSignup() );
    }

    return (
        <Modal show={showAuthModal} onHide={handleModalHide} centered>
            { ( authModalBody === 'login') && <Login errorMessage={errorMessage}/>}

            { ( authModalBody === 'signup') && <Signup errorMessage={errorMessage} />}

        </Modal>
    )
}

export default AuthModal