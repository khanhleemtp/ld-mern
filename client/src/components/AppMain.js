import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { getItems, deleteItems } from '../actions/itemActions';
import PropTypes from 'prop-types';

function AppMain({ deleteItems, getItems, item }) {
    
    useEffect(() => {
        getItems();
    }, [])
    
    return (
        <div>
            <ul className="px-5 m-5">
                {
                    item.items && item.items.length > 0 ? item.items.map((item) => (
                        <li className="border-b-2 p-2 flex justify-between" key={item._id}> 
                            {item.name} 
                            <button 
                            className="rounded-full bg-red-500 text-red-100 p-2"
                            onClick={() => {
                                deleteItems(item._id);
                            }}
                            >Remove</button>
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
    deleteItems: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
    item: state.item
    }
}

const mapDispatchToProps = dispatch => {
    return {
    getItems: () => dispatch(getItems()),
    deleteItems: (id) => dispatch(deleteItems(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppMain);
