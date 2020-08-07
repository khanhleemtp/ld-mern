import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { register, login } from  '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions';



function LoginModel({ login, error, clearErrors, isAuthenticated }) {
    

    const [modal, setModal] = useState(false);
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

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }


    const onSubmitHandler = (e) => {
        e.preventDefault();
        
        const user = { email, password };

        // Attempt to login
        login(user);
    } 

    useEffect(() => {
        if(error.id === 'LOGIN_FAIL') {
            setMsg(error.msg.msg);
        }
        else if( error.id === null) {
            setModal(false);
        }
        else {
            setMsg(null);
        } 
    }, [error])
    
    return (
        <div>
            <button className="bg-red-500 rounded-full text-red-100 p-2 m-4"
            onClick={toggle}
            >Login</button>

            <div className={modal ? "block":"hidden"}>
                {
                   msg ? <h2>{msg}</h2> : null
                }
                <form onSubmit={onSubmitHandler} className="bg-red-200 w-1/4 p-4 m-3 h-64 rounded cursor-pointer grid grid-cols-6">
                    <span onClick={toggle} className="text-2xl pb-2 col-span-2">x</span>
                    {/* <label htmlFor="item" className="">Item</label> */}
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
                    <button onClick={onSubmitHandler} className="bg-red-500 rounded p-1 text-red-100 m-2 col-span-2">Login</button>
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
        login: (user) => dispatch(login(user)),
        clearErrors: () => dispatch(clearErrors())
    }
)


export default connect(mapStateToProps, mapDispatchToProps)(LoginModel)
