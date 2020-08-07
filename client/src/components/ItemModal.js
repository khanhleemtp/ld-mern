import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addItem } from '../actions/itemActions';


function ItemModal({ addItem, isAuthenticated }) {

    const [modal, setModal] = useState(false);
    const [name, setName] = useState({});

    const toggle = () => {
        setModal(!modal);
    }

    const onChangeHandler = (e) => {
        setName({ [e.target.name]: e.target.value });
        console.log('Name', name)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const newItem = {
            name: name.name
        }
        console.log('newItem', newItem);
        // addItem via addItem action
        addItem(newItem);
        // close modal  
        toggle();
    }   

    return (
        <div>
            {
                isAuthenticated ?
                <button className="bg-red-500 rounded-full text-red-100 p-2 m-4"
                onClick={toggle}
                >Add Item</button> : <h2>Please login to manage items</h2>
            }
            
            <div className={modal ? "block":"hidden"}>
                <form onSubmit={onSubmitHandler} className="bg-red-200 w-1/4 p-4 m-3 h-36 rounded cursor-pointer grid grid-cols-6">
                    <span onClick={toggle} className="text-2xl pb-2 col-span-2">x</span>
                    {/* <label htmlFor="item" className="">Item</label> */}
                    <input
                        type="text"
                        name= "name"
                        id="item"
                        placeholder="Add to do"
                        onChange={onChangeHandler}
                        className="bg-orange-200 rounded-md outline-none col-span-6"
                     /> 
                    <button onClick={onSubmitHandler} className="bg-red-500 rounded p-1 text-red-100 m-2 col-span-2">Add Item</button>
                </form>
            </div>
            
        </div>
    )
}



const mapStateToProps = (state) => (
    {
        item: state.item,
        isAuthenticated: state.auth.isAuthenticated
    }
)

const mapDispatchToProps = (dispatch) => (
    {
        addItem: (item) => dispatch(addItem(item)) 
    }
)


export default connect(mapStateToProps, mapDispatchToProps)(ItemModal)
