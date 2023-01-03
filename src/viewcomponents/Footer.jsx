//import image file
import logo from '../assets/MGG-logotype.jpg';

function Footer() {
    //display logo and text
    return (
        <div className="text-center font-weight-bolder">
            <img src={logo} className="img-fluid" />
            <br />
            <p>Created by Damjan Tosic @ MIUN 2022</p>
            <br /><br /><br />
        </div>
    );
}

export default Footer;