import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Link } from "react-router-dom";
import logo from '../assets/MGG-logotype.jpg';

function Footer() {
  return (

    <div className="text-center font-weight-bolder">
        
    <img src={logo} className="img-fluid" />
    <br />
    Created by Damjan Tosic @ MIUN 2022
    <br /><br /><br />
</div>
      );
}

export default Footer;