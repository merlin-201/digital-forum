import React from 'react'

import { Button, Modal } from "react-bootstrap"

/* --------------------------------- images --------------------------------- */
import {QRCodeLoading } from "../../../assets/images"

/* ------------------------------- react-redux ------------------------------ */
import { useDispatch, useSelector } from "react-redux";

/* --------------------------------- actions -------------------------------- */
import { verify } from "../../../actions/auth";



function QR( { errorMessage } ) {
    const dispatch = useDispatch();

    /* --------------------------------- states --------------------------------- */
    const [ totp, setTotp ] = React.useState(null);

    /* ------------------------- variables obtained in the redux store after signup ------------------------- */
    const userId = useSelector( (state) => state.auth.userId );
    const qrCodeDataURL = useSelector( (state) => state.auth.qr );


    /* -------------------------------- functions ------------------------------- */
    const handleChange = (event) => {
        setTotp(event.target.value);
    }

    const handleSubmit = () => {
        const formData = {
            userId : userId,
            totp : totp
        }
        dispatch( verify(formData) );
    }


    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Scan QR Code</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="text-center mb-2">
                    <strong className="text-center">Scan the below QR Code using Google Authenticator on your mobile device.</strong>
                </div>

                <form>
                    <div className="form-group d-flex justify-content-center">

                        <img src={qrCodeDataURL || QRCodeLoading} alt="" width="200" height="200" />

                    </div>

                    <div className="form-group mb-2">
                        <label htmlFor="totp">Enter T-OTP</label>
                        <input name="totp" className="text-center form-control rounded " type="text" id="totp" maxLength="6" onChange={handleChange}/>
                    </div>

                    { errorMessage && (
                        <div className="form-group text-center fw-bold">
                            <p className="text-danger">{errorMessage}</p>
                        </div>
                    )}
                </form>
            </Modal.Body>
            <Modal.Footer> 
                <Button variant="primary" onClick={handleSubmit}>
                    Verify
                </Button>
            </Modal.Footer>
        </>
    )
}

export default QR