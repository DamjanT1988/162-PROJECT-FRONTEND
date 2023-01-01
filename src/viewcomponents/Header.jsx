import React from 'react';
import { Link } from "react-router-dom";

//logout
function handleLogout() {
    //delete cookie value
    document.cookie = 'UserToken=';
    //hide menu
    document.getElementById("header").innerHTML = "";
};


class Header extends React.Component {
    //on load
    componentDidMount() {
        //check if a cookie value exist/logged in user
        if (document.cookie === 'UserToken=' || document.cookie === '') {
            document.getElementById("header").innerHTML = "";
        }
    }

    render() {
        return false
    }
}

//main menu
function Navbar() {
    return (
        <header id="header" className="row">
            <div>
                <Header />
                <br />
                <nav className="navbar fixed-top navbar-dark bg-dark bg-gradient d-flex justify-content-center">
                    <Link to="/" className="m-1 btn btn-light text-decoration-none">START</Link>
                    <Link to="/Add" className="m-1 btn btn-light text-decoration-none">ADD</Link>
                    <Link to="/Edit" className="m-1 btn btn-light text-decoration-none">EDIT</Link>
                    <Link to="/" id="logout" className="m-1 btn btn-danger text-decoration-none" onClick={handleLogout}>LOGOUT</Link>
                </nav>
            </div>
        </header>

    );
}

export default Navbar;