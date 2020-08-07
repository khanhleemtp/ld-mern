import React, { useState, Fragment } from 'react'
import { Link } from 'react-router-dom';
import imgLogo from '../img/milk.svg';
import imgToggle from '../img/toggle.svg';
import RegisterModel from './auth/RegisterModel';
import Logout from './auth/Logout';
import LoginModal from './auth/LoginModal';
import { connect } from 'react-redux';


function AppNavbar({ auth }) {
    const [open, setOpen] = useState(false);
    const { isAuthenticated, user } = auth;

    const authLink = (
        <Fragment>
                <span>
                    <strong>{ user ? `Welcome ${user.name}` : ''}</strong>
                </span>
                <Logout />
        </Fragment>
    )

    const guestLink = (
        <Fragment>
                <RegisterModel />
                <LoginModal />
        </Fragment>
    )


    const toggle = () => {
        setOpen(!open);
    }

    return (
            <nav>
                <header>
                    <div className="flex justify-between p-5">
                    <div className="logo w-5">
                        <img src={imgLogo} alt="logo" />
                    </div>
                    <div className="toggle w-5 lg:hidden">
                        <img src={imgToggle} alt="toggle" onClick={toggle} />
                    </div>
                    </div>  
                </header>
                 {
                     isAuthenticated ? authLink : guestLink
                 }

            </nav>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, null)(AppNavbar)
