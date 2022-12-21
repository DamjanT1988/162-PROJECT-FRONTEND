import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Start</Link>
        </li>
        <li>
          <Link to="/Add">Add</Link>
        </li>
        <li>
          <Link to="/Edit">Edit</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;