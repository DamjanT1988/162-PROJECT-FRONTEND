import React from 'react';
import ListProducts from '../subcomponents/ListProducts';

/*******************************************************************************************/
// CHILD COMPONENT: ADDPRODUCTS

class AddProducts extends React.Component {
  constructor(props) {
    super(props);
    //set initial state
    this.state = {
      product_title: '',
      ean_number: '',
      product_description: '',
      price: '',
      amount_storage: '',
      expiration_date: ''
    };

    //bind methods/functions
    this.handleEvent = this.handleEvent.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //save the input value and update state

  handleEvent(event) {
    /*this.setState({
      product_title: event.target.product_title.value,
      ean_number: event.target.ean_number.value
    });*/
    const target = event.target;
    const value = target.value;
    const name = target.name;
    //update state with new values
    this.setState({
      [name]: value
    });
  }


  handleSubmit(event) {
    alert('Title: ' + this.state.product_title + ' ' + 'Number: ' + this.state.ean_number);
    event.preventDefault();
  }

  async addProduct() {
   
    // kontroll att något fylls i
    if (this.state.product_title.length > 0 && this.state.ean_number > 0) {

      // skapa en JS-objekt att skicka med
      let productBody = {
        product_title: this.state.product_title,
        ean_number: this.state.ean_number,
/*      product_description: this.product_description,
        price: this.price,
        amount_storage: this.amount_storage,
        expiration_date: this.expiration_date,
*/    };

      console.log(productBody)

      /*
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              const token = c.substring(name.length, c.length);
        */

      /*
const resp = await fetch("http://127.0.0.1:8000/api/lager", {
method: "POST",
headers: {
  "Accept": "application/json",
  "Content-type": "application/json"
},
// omvandla JS-objekt till JSON
body: JSON.stringify(productBody)
});*/

      // töm inmatningsfält
      this.state.product_title = "";
      this.state.ean_number = "";
      /*      this.product_description = "";
            this.price = "";
            this.amount_storage = "";
            this.expiration_date = "";
      */
      // ladda om listan vid submit via emit mot förälderkomoponent
      //this.$emit("addedProduct");

      document.getElementById("messageError").innerHTML = ""
      document.getElementById("messageAdd").innerHTML = "Product added!"
    } else {
      //skriv ut felmeddelande..
      document.getElementById("messageError").innerHTML = "Title/EAN number must be filled"
    }
  }

  //onSubmit={this.addProduct}
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label className="form-control-lg">Product title:</label>
          <br />
          <input
            name="product_title"
            type="text"
            className="form-control-lg"
            value={this.state.product_title}
            onChange={this.handleEvent} />
          <br />
          <label className="form-control-lg">EAN number:</label>
          <br />
          <input
            name="ean_number"
            type="text"
            className="form-control-lg"
            value={this.state.ean_number}
            onChange={this.handleEvent}
          />
          <br />
          <label className="form-control-lg">Product description:</label>
          <br />
          <textarea
            type="text"
            placeholder="max 200 words"
            className="form-control-lg"
            rows="3"
            max-rows="6">
          </textarea>
          <br />
          <label className="form-control-lg">Selling price:</label>
          <br />
          <input
            type="number"
            className="form-control-lg" />
          <br />
          <label className="form-control-lg">Amount in storage:</label>
          <br />
          <input
            type="number"
            className="form-control-lg" />
          <br />
          <label className="form-control-lg">Expiration date (earliest):</label>
          <br />
          <input
            type="text"
            placeholder="yyyy-mm-dd"
            className="form-control-lg" />
          <br />
          <label className="form-control-lg">Image description:</label>
          <br />
          <input
            type="text"
            placeholder="key words"
            className="form-control-lg" />
          <br />
          <input
            type="submit"
            value="Add product!"
            className="btn btn-dark" />
        </form>
        <br />
        <p id="messageAdd"></p>
        <p id="messageError"></p>

      </div>

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