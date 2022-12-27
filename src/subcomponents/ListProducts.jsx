import React from 'react';
/*******************************************************************************************/
// CHILD SUBCOMPONENT: PRODUCTSLIST

class ListProductsClass extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        nameUser: '',
        emailUser: '',
        passwordUser: '',
        keyUser: ''
      };
  
      //bind methods/functions
      this.handleInputChange = this.handleInputChange.bind(this);
      this.registerUser = this.registerUser.bind(this);
    }
  
    //save the input value and update state
    handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      //update state
      this.setState({
        [name]: value
      });
    }
  
    //register a new user
    async registerUser(event) {
      //prevent reload
      event.preventDefault();
      //check if input
      //if (this.state.emailUser.length > 0 || this.state.emailUser !== undefined) {
      document.getElementById("responseLoginFail").innerHTML = "";
      document.getElementById("responseLoginSuccess").innerHTML = "";
  
      //create a JS object
      let keyBody = {
        key: this.state.keyUser,
      };
  
      //send request to API 
      const respKey = await fetch("http://localhost:3000/keys/", {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
          //"Access-Control-Allow-Origin": "http://localhost:3001"
        },
  
        //convert JS object to JSON object
        body: JSON.stringify(keyBody)
      });
  
      //check if input key macthes with first database key
      if (respKey[0]._id == this.state.userKey) {
  
        //create a JS object
        let userBody = {
          name: this.state.nameUser,
          email: this.state.emailUser,
          password: this.state.passwordUser
        };
  
        //send request to API 
        const resp = await fetch("http://localhost:3000/users/", {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
            //"Access-Control-Allow-Origin": "http://localhost:3001"
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
    }
  
    render() {
      return (
        <article class="listobject">
          <h3 id="h3title"></h3>
          <br/>
          <p><strong>Product title:</strong>
          <p class="list"></p>
          </p>
          <p><strong>Article number:</strong>
          <p></p>
          </p>
          <p><strong>EAN number:</strong>
          <p></p>
          </p>
          <p><strong>Product description:</strong>
          <p></p>
          </p>
          <p><strong>Selling price:</strong>
          <p> kr</p>
          </p>
          <p><strong>Amount in storage:</strong>
          <p></p>
          </p>
          <input class="btn btn-light-red lager"/>
          <input class="btn btn-light-green lager"/>
          <br/>
          <p><strong>Expiration date:</strong>
          <p></p>
          </p>
          <p><strong>Visual description:</strong>
          <p></p>
          </p>
          <p><strong>Article created:</strong>
          <p></p>
          </p>
          <p><strong>Article updated:</strong>
          <p></p>
          </p>
          <br/>
          <input className="btn btn-red"/>
  
          <br/>
          <hr/><br/>
      </article>
      );
    }
  }
  
  // END OF PRODUCTSLIST SUBCOMPONENT
  /*******************************************************************************************/
  
  function ListProducts() {

    //View components
    return (
      <ListProductsClass />
    );
  }
  
  
  export default ListProducts;