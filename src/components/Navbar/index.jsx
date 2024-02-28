import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge'
import Cart from '../../views/Cart';
import Modal from '../../Modal';


const Navbar = () => {
    const navigate = useNavigate();
    const [cartView, setCartView] = useState(false);
    const Logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link active fs-3" aria-current="page" to="#">Home</Link>
                            </li>
                            {(localStorage.getItem('token')) ?
                                <li className="nav-item">
                                    <Link className="nav-link active fs-3" aria-current="page" to="#">My Orders</Link>
                                </li> : ''}
                        </ul>
                        {(localStorage.getItem('token')) ?
                            <>
                                <div className='btn bg-white text-success mx-1' onClick={() => setCartView(true)}>My Cart <Badge pill bg='danger'>2</Badge></div>
                                {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : ""}
                                <div className="btn bg-white text-danger mx-1" onClick={Logout}>Logout</div>
                            </>
                            : <div className="d-flex ">
                                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                                <Link className="btn bg-white text-success mx-1" to="/signup">Signup</Link>

                            </div>}

                    </div >
                </div >
            </nav >
        </div >
    )
}

export default Navbar;
