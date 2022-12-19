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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value    
    });
  }

  handleSubmit(event) {
    alert('Email: ' + this.state.emailUser +' ' + 'Password: ' + this.state.passwordUser);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
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
            type="text"
            value={this.state.passwordUser}
            onChange={this.handleInputChange} />
        </label>
        <br /><br />
        <input 
        type="submit" 
        value="Submit"
        className="btn btn-dark" />

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
    {/*className="row"*/}
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
