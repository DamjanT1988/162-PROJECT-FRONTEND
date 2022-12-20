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

  async loginUser(event) {
    // kontroll att något fylls i
    event.preventDefault();
    //if (this.state.emailUser.length > 0) {
    document.getElementById("responseLoginFail").innerHTML = "";
    document.getElementById("responseLoginSuccess").innerHTML = "";

    // skapa en JS-objekt att skicka med
    let productBody = {
      name: "d",
      email: '44',
      password: '11'
    };

    // skicka till API
    const resp = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json"
      },

      // omvandla JS-objekt till JSON
      body: JSON.stringify(productBody)
    });
    /*
        // lagra svar
        const data = await resp.json();
        const msg = data.message;
    
        //kolla om lyckad inlogg med token
        if (data.token == undefined) {
          //inget värde
          document.cookie = "UserToken=";
        } else {
          //sätt värde
          document.cookie = "UserToken=" + data.token;
        }
    
        if (msg == "Användare inloggad!") {
          // skriv ut meddelande
          document.getElementById("responseLoginSuccess").innerHTML = data.message;
        } else {
          document.getElementById("responseLoginFail").innerHTML = data.message;
        }
      */
    //}
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

  render() {
    {/*className="row"*/ }
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
