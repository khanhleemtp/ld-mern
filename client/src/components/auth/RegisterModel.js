import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { register } from  '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions';



function RegisterModel({ register, error, clearErrors, isAuthenticated }) {
    

    const [modal, setModal] = useState(false);
    const [name, setName] = useState({});
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState(null);



    const toggle = () => {
        // clearErrors();
        setModal(!modal);
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const onChangeName = (e) => {
        setName(e.target.value);
        // console.log(email, password, name)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }


    const onSubmitHandler = (e) => {
        e.preventDefault();
        // create new User
        const newUser = { name, email, password };
        // Attemt to register
        register(newUser);
        toggle();
    } 

    useEffect(() => {
        if(error.id === 'REGISTER_FAIL') {
            setMsg(error.msg.msg);
        }
        else if( error.id === null) {
            setModal(false);
        }
        else {
            setMsg(null);
            // setModal(!modal);
        }
        // console.log('msg', msg);
        // console.log('error', error);

        
    }, [error])
    
    return (
        <div>
            <button className="bg-red-500 rounded-full text-red-100 p-2 m-4"
            onClick={toggle}
            >Register</button>

            <div className={modal ? "block":"hidden"}>
                {
                   msg ? <h2>{msg}</h2> : null
                }
                <form onSubmit={onSubmitHandler} className="bg-red-200 w-1/4 p-4 m-3 h-64 rounded cursor-pointer grid grid-cols-6">
                    <span onClick={toggle} className="text-2xl pb-2 col-span-2">x</span>
                    {/* <label htmlFor="item" className="">Item</label> */}
                    <input
                        type="text"
                        name= "name"
                        id="name"
                        placeholder="Name"
                        onChange={onChangeName}
                        className="bg-orange-200 rounded-md outline-none col-span-6 m-2 p-2 "
                     />
                    <input
                        type="text"
                        name= "email"
                        id="email"
                        placeholder="Email"
                        onChange={onChangeEmail}
                        className="bg-orange-200 rounded-md outline-none col-span-6 m-2 p-1"
                     /> 
                    <input
                        type="text"
                        name= "password"
                        id="password"
                        placeholder="Password"
                        onChange={onChangePassword}
                        className="bg-orange-200 rounded-md outline-none col-span-6 m-1 p-1"
                     />  
                    <button onClick={onSubmitHandler} className="bg-red-500 rounded p-1 text-red-100 m-2 col-span-2">Register</button>
                </form>
            </div>
        </div>
    )
}



const mapStateToProps = (state) => (
    {
        isAuthenticated: state.auth.isAuthenticated,
        error: state.error
    }
)

const mapDispatchToProps = (dispatch) => (
    {
        register: (newUser) => dispatch(register(newUser)),
        clearErrors: () => dispatch(clearErrors())
    }
)


export default connect(mapStateToProps, mapDispatchToProps)(RegisterModel)
