import React from 'react'

import { Button, Modal } from "react-bootstrap"

/* ------------------------------- react-redux ------------------------------ */
import { useDispatch, useSelector } from 'react-redux'

/* --------------------------------- actions -------------------------------- */
import { login } from "../../../actions/auth";

function Login( {errorMessage} ) {
    const dispatch = useDispatch();
    /* --------------------------------- states --------------------------------- */
    const [formData, setFormData] = React.useState({
        email : "ninu@gmail.com",
        totp : ""
    })

    const wasRedirectedFromSignup = useSelector( (state) => state.auth.totpVerified );

    /* -------------------------------- functions ------------------------------- */
    const handleChange = (event) => {
        setFormData( (prevFormData) => {
            return {
                ...prevFormData,
                [event.target.name] : event.target.value
            }
        })
    }

    const handleSubmit = () => {
        console.log("Sending request to login...");
        console.log(formData);

        dispatch( login(formData) );
    }

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Log In</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {
                    wasRedirectedFromSignup && (
                        <div className="text-center mb-2">
                            <strong className="text-center text-success">Signed Up successfully. Please login to continue...</strong>
                        </div>
                    )
                }

                <form>
                    
                    <div className="form-group mb-3">
                        <label htmlFor="email">Email</label>
                        <input
                            name="email"
                            id="email"
                            type="email"
                            className="form-control"
                            required
                            autoFocus
                            onChange={handleChange}
                            value={formData.email}
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="totp">Enter T-OTP</label>
                        <input
                            name="totp"
                            id="totp"
                            className="text-center form-control rounded"
                            type="text"
                            maxLength="6"
                            onChange={handleChange}
                            value={formData.totp}
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
                    Login
                </Button>
            </Modal.Footer>
        </>
    )
}

export default Login