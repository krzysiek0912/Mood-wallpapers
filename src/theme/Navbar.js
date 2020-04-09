import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <NavLink to="/">
                        <img
                            src="https://bulma.io/images/bulma-logo.png"
                            width="112"
                            height="28"
                            alt=""
                        />
                    </NavLink>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <button type="button" className="button is-primary">
                                <strong>
                                    <NavLink to="/">Home</NavLink>
                                </strong>
                            </button>
                            <button type="button" className="button is-light">
                                <NavLink to="/favorite">Favorite</NavLink>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
