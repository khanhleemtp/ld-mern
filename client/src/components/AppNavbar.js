import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import imgLogo from '../img/milk.svg';
import imgToggle from '../img/toggle.svg';

function AppNavbar() {
    const [open, setOpen] = useState(false);

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
                    {/* <ul className={open ? "transition-all duration-500  delay-150 ease-in-out text-white-100 ml-auto w-1/2 flex justify-between" : "transition-all duration-500 flex justify-between delay-150 ease-in-out w-1/2 -ml-64"}>
                        <li>
                                <Link to="/">Home</Link>
                        </li>
                        <li className="mx-2">
                                <Link to="/">About</Link>
                        </li>
                        <li>
                                <Link to="/">Contact</Link>
                        </li>
                    </ul>   */}
            </nav>
    )
}

export default AppNavbar
