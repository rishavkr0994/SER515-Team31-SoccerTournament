import React, { Component } from "react";
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class SignUp extends Component {
    render() {
        return (
            <form>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" />
                </div>
		<div className="form-group">
		    <label>Role</label>
                    <input type="text" className="form-control" placeholder="Enter your role" />
              </div>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="../login.component.js">sign in?</a>
                </p>
            </form>
        );
    }
}
