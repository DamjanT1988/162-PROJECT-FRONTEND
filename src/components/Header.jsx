import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Link } from "react-router-dom";

function Navbar() {
  return (

    <header className="row">
        <div>
            <br/><br/><br/><br/>

            <nav className="navbar fixed-top navbar-dark bg-dark bg-gradient d-flex justify-content-center">

                <a id="start">
                    <Link to="/" className="m-1 btn btn-light text-decoration-none">START</Link>
                </a>
                <a id="add">
                    <Link to="/Add" className="m-1 btn btn-light text-decoration-none">ADD</Link>
                </a>
                <a id="manage">
                    <Link to="/Edit" className="m-1 btn btn-light text-decoration-none">EDIT</Link>
                </a>
                <a id="logout" className="m-1">
                    LOGOUT?
                </a>
            </nav>
        </div>
    </header>

  );
}

export default Navbar;