import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

function Navbar() {
  return (

    <header className="row">
        <div>
            <br/><br/><br/><br/>

            <nav className="navbar fixed-top navbar-dark bg-dark bg-gradient d-flex justify-content-center">

                <Button id="start">
                    <Link to="/" className="m-1 btn btn-light text-decoration-none">START</Link>
                </Button>
                <Button id="add">
                    <Link to="/Add" className="m-1 btn btn-light text-decoration-none">ADD</Link>
                </Button>
                <Button id="manage">
                    <Link to="/Edit" className="m-1 btn btn-light text-decoration-none">EDIT</Link>
                </Button>
                <Button id="logout" className="m-1">
                LOGOUT!
                </Button>
            </nav>
        </div>
    </header>

  );
}

export default Navbar;