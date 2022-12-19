import React from 'react';
import './App.css';

/*******************************************************************************************/
// CHILD COMPONENT: REGISTER

class Register extends React.Component {

  render() {
    return (
      <div></div>
    )
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
      email: '',
      password: ''
    };

    this.handleChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const email = target.email;
    const password = target.password;

    this.setState({
      [email]: email.value,
      [password]: password.value
    });
  }

  handleSubmit(event) {
    alert('Email: ' + this.state.email + 'Password: ' + this.state.password);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Your email:
          <br />
          <input
            name='email'
            type="text"
            value={this.state.value}
            onChange={this.handleInputChange} />
          <br />
        </label>
        <label>
          <br />
          Your password:
          <br />
          <input
            name='password'
            type="password"
            value={this.state.value}
            onChange={this.handleInputChange} />
        </label>
        <br /><br />
        <input type="submit" value="Submit" />

        {/*ADD LATER*/}
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
    return (
      <div class="row">
        <div class="col-md bg-dark bg-gradient text-white p-4">

          <h2>LOG IN</h2>
          <p>
            Log in below, then navigate through the buttons in top.
          </p>
          <Login />
        </div>

        <div class="col-md bg-dark bg-gradient text-white p-4">
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
