import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { getItems, deleteItems } from '../actions/itemActions';
import PropTypes from 'prop-types';

function AppMain({ deleteItems, getItems, item, isAuthenticated }) {
    
    useEffect(() => {
        getItems();
    }, [isAuthenticated])
    
    return (
        <div>
            <ul className="px-5 m-5">
                {
                    item.items && item.items.length > 0 ? item.items.map((item) => (
                        <li className="border-b-2 p-2 flex justify-between" key={item._id}> 
                            {item.name}
                            {   isAuthenticated ?
                                <button 
                                className="rounded-full bg-red-500 text-red-100 p-2"
                                onClick={() => {
                                    deleteItems(item._id);
                                }}
                                >Remove</button> : null
                            } 

                        </li>
                    )) :
                    <div>Loading</div>
                }
            </ul>

        </div>
    )
}

AppMain.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    deleteItems: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = state => {
    return {
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
    }
}

const mapDispatchToProps = dispatch => {
    return {
    getItems: () => dispatch(getItems()),
    deleteItems: (id) => dispatch(deleteItems(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppMain);
