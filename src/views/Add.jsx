import React from 'react';
import ListProducts from '../subcomponents/ListProducts';

/*******************************************************************************************/
// CHILD COMPONENT: ADDPRODUCTS

class AddProducts extends React.Component {
  constructor(props) {
    super(props);
    //set initial state
    this.state = {
      emailUser: '',
      passwordUser: ''
    };

    //bind methods/functions
    this.handleInputChange = this.handleInputChange.bind(this);
    this.loginUser = this.loginUser.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  //save the input value and update state
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    //update state with new values
    this.setState({
      [name]: value
    });
  }

  /*  handleSubmit(event) {
      alert('Email: ' + this.state.emailUser + ' ' + 'Password: ' + this.state.passwordUser);
      event.preventDefault();
      if (this.state.emailUser.length > 0) {
        //this.loginUser;
      }
    }*/


  /*
    loginUser(event) {
  
      fetch("http://localhost:3000")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
        }
      )
      }
      */

  /*   
  event.preventDefault();
  
      let xhr = new XMLHttpRequest();
      let productBody = {
        name: "d",
        email: '44',
        password: '11'
      };
  
      //open the request
      xhr.open('POST', 'http://localhost:3000/users/')
      xhr.setRequestHeader("Content-Type", "application/json");
  
      //send the form data
      xhr.send(JSON.stringify(productBody));
  
      return false;
    }*/

  //log in the user
  async loginUser(event) {
    //prevent reload
    event.preventDefault();
    //check if input
    //if (this.state.emailUser.length > 0 || this.state.emailUser !== undefined) {
    document.getElementById("responseLoginFail").innerHTML = "";
    document.getElementById("responseLoginSuccess").innerHTML = "";

    //create a JS object
    let userBody = {
      //name: "ww",
      email: this.state.emailUser,
      password: this.state.passwordUser
    };

    //fetch("http://localhost:3001/users/").then(req => req.text()).then(console.log)

    //send request to API 
    const resp = await fetch("http://localhost:3000/users/", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json",
        //"Access-Control-Allow-Origin": 'http://127.0.0.1:8080'
      },

      //convert JS object to JSON object
      body: JSON.stringify(userBody)
    });

/*
    //store response
    const data = resp.json();
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
    //}
  */}

  render() {
    return (
     <div></div>
    );
  }
}

// END OF LOGIN COMPONENT
/*******************************************************************************************/


/*******************************************************************************************/
// PARENT COMPONENT: STARTVIEW

class AddView extends React.Component {

  render() {
    //check if a cookie value exist/logged in user
    if (document.cookie === 'UserToken=' || document.cookie === '') {
      window.location = '/';
    } else {
      //render if token has value
      return (
        <div className="row">
          <div className="col-md bg-dark bg-gradient text-white p-4">

            <h2>ADD PRODUCT</h2>
            <p>

            </p>
            <AddProducts />
          </div>

          <div className="col-md bg-dark bg-gradient text-white p-4">
            <h2>PRODUCT LIST</h2>
            <p>

            </p>
            <ListProducts />
          </div>
        </div>
      )
    }
  }
}

// END OF STARTVIEW COMPONENT
/*******************************************************************************************/

function Add() {

  //View components
  return (
    <AddView />
  );
}


export default Add;