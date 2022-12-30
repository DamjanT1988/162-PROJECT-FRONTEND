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
  }

  //save the input value and update state
  handleEvent(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    //update state with new values
    this.setState({
      [name]: value
    });
  }

  async addProduct(event) {
    event.preventDefault();


    if (this.state.product_title.length > 0 && this.state.ean_number.length > 0) {

      let productBody = {
        product_title: this.state.product_title,
        ean_number: this.state.ean_number,
        product_description: this.state.product_description,
        price: this.state.price,
        amount_storage: this.state.amount_storage,
        expiration_date: this.state.expiration_date,
      };


      const resp = await fetch("http://localhost:3000/products/", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": 'http://localhost:8080'
        },
        mode: 'cors',
        body: JSON.stringify(productBody)
      });


      document.getElementById("messageError").innerHTML = ""
      document.getElementById("messageAdd").innerHTML = "Product added!"
    } else {

      document.getElementById("messageError").innerHTML = "Title/EAN number must be filled"
    }

    this.setState({
      product_title: "",
      ean_number: "",
      product_description: "",
      price: "",
      amount_storage: "",
      expiration_date: ""
    })

    //reload page for header to appear, wait 2 seconds
    setTimeout(() => { window.location.reload(false) }, 2000);
  }


  render() {
    return (
      <div>
        <form onSubmit={this.addProduct} id="formAdd">
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
            name="product_description"
            type="text"
            placeholder="max 200 words"
            className="form-control-lg"
            rows="3"
            max-rows="6"
            value={this.state.product_description}
            onChange={this.handleEvent}>
          </textarea>
          <br />
          <label className="form-control-lg">Selling price:</label>
          <br />
          <input
            name="price"
            type="number"
            className="form-control-lg"
            value={this.state.price}
            onChange={this.handleEvent}
          />
          <br />
          <label className="form-control-lg">Amount in storage:</label>
          <br />
          <input
            name="amount_storage"
            type="number"
            className="form-control-lg"
            value={this.state.amount_storage}
            onChange={this.handleEvent} />
          <br />
          <label className="form-control-lg">Expiration date (earliest):</label>
          <br />
          <input
            name="expiration_date"
            type="text"
            placeholder="yyyy-mm-dd"
            className="form-control-lg"
            value={this.state.expiration_date}
            onChange={this.handleEvent} />
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
              Add a new product article below; title and EAN number must be filled:
            </p>
            <AddProducts />
          </div>

          <div className="col-md bg-dark bg-gradient text-white p-4">
            <h2>PRODUCT LIST</h2>
            <p>
              The five latest new products are shown; newest first:
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