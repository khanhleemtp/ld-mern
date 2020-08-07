import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';

function Logout({ logout }) {
    return (
        <Fragment>
            <nav onClick={ () => logout() } href="#" className="rounded-full bg-green-600 text-red-100 inline-block p-3 m-4 cursor-pointer" >
                Logout
            </nav>
        </Fragment>
    )
}

export default connect(null, { logout })(Logout)
