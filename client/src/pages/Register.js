import React from 'react'

export default function Register() {
  return (
    <div class="card card-primary">
        <div class="card-header">
            <h4>Register</h4>
        </div>
        <div class="card-body">
            <form method="POST" action="/auth/register">
                <div class="row">
                    <div class="form-group col-6">
                        <label for="first_name">Name</label>
                        <input id="first_name" type="text" class="form-control" name="name" autofocus />
                    </div>
                    <div class="form-group col-6">
                        <label for="phone">Phone Number</label>
                        <input id="phone" type="tel" class="form-control" name="phone" maxlength="12" />
                    </div>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input id="email" type="email" class="form-control" name="email" />
                    <div class="invalid-feedback">
                    </div>
                </div>

                <div class="form-group">
                    <button type="submit" class="btn btn-primary btn-lg btn-block">
                        Scan The QR Code
                    </button>
                </div>
            </form>
        </div>
        <div class="mb-4 text-muted text-center">
            Already Registered? <a href="/auth/login">Login</a>
        </div>

        <div class="alert alert-danger mx-4" role="alert">
            dummy message
        </div>
    </div>
  )
}