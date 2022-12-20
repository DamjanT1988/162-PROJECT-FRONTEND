import React from 'react';
import './App.css';

/*******************************************************************************************/
// CHILD COMPONENT: REGISTER

class Register extends React.Component {
  render() {
    return (
      <div></div>
    );
  }
}
// END OF REGISTER COMPONENT
/*******************************************************************************************/


/*******************************************************************************************/
// CHILD COMPONENT: LOGIN

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailUser: '',
      passwordUser: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  /*  handleSubmit(event) {
      //alert('Email: ' + this.state.emailUser + ' ' + 'Password: ' + this.state.passwordUser);
      event.preventDefault();
      if (this.state.emailUser.length > 0) {
        //this.loginUser;
      }
    }*/

  /*
  loginUser(event) {
  
    event.preventDefault();    
    let xhr = new XMLHttpRequest();
    let productBody = {
      name: "d",
      email: '44',
      password: '11'
    };
  
    //open the request
    xhr.open('POST', 'http://localhost:3000/users')
    xhr.setRequestHeader("Content-Type", "application/json");
  
    //send the form data
    xhr.send(JSON.stringify(productBody));
  }
  */

  async loginUser1(event) {
    //prevent reload
    event.preventDefault();
    //check if input
    if (this.state.emailUser.length > 0) {
      document.getElementById("responseLoginFail").innerHTML = "";
      document.getElementById("responseLoginSuccess").innerHTML = "";

      //create a JS object
      let productBody = {
        email: this.state.emailUser,
        password: this.state.passwordUser
      };

      //fetch("http://localhost:3001/users/").then(req => req.text()).then(console.log)

      //send request to API 
      const resp = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
          //"Access-Control-Allow-Origin": "http://localhost:3001"
        },

        //convert JS object to JSON object
        body: JSON.stringify(productBody)
      });


      //store response
      const data = await resp.json();
      const msg = data.message;

      //check login
      if (data.token == undefined) {
        //no value
        document.cookie = "UserToken=";
      } else {
        //add value
        document.cookie = "UserToken=" + data.token;
      }

      if (msg == "Användare inloggad!") {
        // print message
        document.getElementById("responseLoginSuccess").innerHTML = "Login success ";
      } else {
        document.getElementById("responseLoginFail").innerHTML = "Login fail";
      }
    }
  }

  render() {
    return (
      <form onSubmit={this.loginUser}>
        <label>
          Your email:
          <br />
          <input
            name="emailUser"
            type="text"
            checked={this.state.emailUser}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Your password:
          <br />
          <input
            name="passwordUser"
            type="password"
            value={this.state.passwordUser}
            onChange={this.handleInputChange} />
        </label>
        <br /><br />
        <input
          type="submit"
          value="Log in!"
          className="btn btn-dark" />

        <p id="responseLoginFail"></p>
        <p id="responseLoginSuccess"></p>
      </form>
    );
  }
}

// END OF LOGIN COMPONENT
/*******************************************************************************************/


/*******************************************************************************************/
// PARENT COMPONENT: STARTVIEW

class StartView extends React.Component {
  /*className="row"*/
  render() {
    return (
      <div>
        <div className="col-md bg-dark bg-gradient text-white p-4">

          <h2>LOG IN</h2>
          <p>
            Log in below, then navigate through the buttons in top.
          </p>
          <Login />
        </div>

        <div className="col-md bg-dark bg-gradient text-white p-4">
          <h2>REGISTER</h2>
          <p>
            Register below. Navigate above. The key is used by the employer.
          </p>
          <Register />
        </div>
      </div>

    )
  }
}

// END OF STARTVIEW COMPONENT
/*******************************************************************************************/

function App() {

  //View components
  return (

    <StartView />

  );
}

export default App;
