import React from 'react'

import { Button, Modal } from "react-bootstrap"

/* ------------------------------- react-redux ------------------------------ */
import { useDispatch, useSelector } from 'react-redux'

/* --------------------------------- actions -------------------------------- */
import { signup } from "../../../actions/auth"

import QR from "./QR.js"

function Signup( {errorMessage} ) {
    const dispatch = useDispatch();

    /* --------------------------------- states --------------------------------- */
    const [formData, setFormData] = React.useState({
        firstname : "Ninad",
        lastname : "Patil",
        email : "ninu@gmail.com",
        phone : "8793531178"
    });

    /* -------------------------- redux-store variables ------------------------- */
    const showQRCode = useSelector( (state) => state.auth.qr ? true : false )

    /* -------------------------------- functions ------------------------------- */
    const handleChange = (event) => {
        setFormData( prevFormData => {
            return {
                ...prevFormData,
                [event.target.name] : event.target.value
            }
        })
    }

    const handleSubmit = () => {
        console.log("Sending signup request...");
        console.log(formData);

        dispatch( signup(formData) );
    }

    return ( 
        showQRCode
        ? <QR errorMessage={errorMessage}/>
        : (
            <>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form className='px-3'>
                        <div className="row">
                            <div className="form-group col-6">
                                <label htmlFor="firstname">First Name</label>
                                <input
                                    id="firstname"
                                    type="text"
                                    className="form-control mb-3"
                                    name="firstname"
                                    placeholder="First Name"
                                    autoFocus 
                                    onChange={handleChange}
                                    value={formData.firstname}
                                />
                            </div>

                            <div className="form-group col-6">
                                <label htmlFor="lastname">Last Name</label>
                                <input
                                    id="lastname"
                                    type="text"
                                    className="form-control mb-3"
                                    name="lastname"
                                    placeholder="Last Name"
                                    onChange={handleChange}
                                    value={formData.lastname}
                                />
                            </div>
                        </div>
                        

                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input 
                                id="phone"
                                type="tel"
                                className="form-control mb-3"
                                name="phone"
                                maxLength="12"
                                placeholder="Enter Phone Number"
                                onChange={handleChange}
                                value={formData.phone}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input 
                                id="email"
                                type="email"
                                className="form-control mb-3"
                                name="email"
                                placeholder="Enter Email"
                                onChange={handleChange}
                                value={formData.email}
                            />
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
                        Scan QR Code
                    </Button>
                </Modal.Footer>
            </>
        )
    )
}

export default Signup