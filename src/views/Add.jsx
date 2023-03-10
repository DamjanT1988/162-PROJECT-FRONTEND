import React from 'react';
//import component
import ListProducts from '../subcomponents/ListProducts';

/*******************************************************************************************/
// CHILD COMPONENT: ADDPRODUCTS

class AddProducts extends React.Component {
  //initiate constructor
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

  //main method
  async addProduct(event) {
    //prevent reload
    event.preventDefault();

    //check if all fields are filled
    if (
      this.state.product_title.length > 0 &&
      this.state.ean_number.length > 0 &&
      this.state.product_description.length > 0 &&
      this.state.price.length > 0 &&
      this.state.amount_storage.length > 0 &&
      this.state.expiration_date.length > 0
    ) {

      //save variables as body for fetch
      let productBody = {
        product_title: this.state.product_title,
        ean_number: this.state.ean_number,
        product_description: this.state.product_description,
        price: this.state.price,
        amount_storage: this.state.amount_storage,
        expiration_date: this.state.expiration_date,
      };

      //fetch API data
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

      //clear message and add message
      document.getElementById("messageError").innerHTML = ""
      document.getElementById("messageAdd").innerHTML = "Product added!"

      //clear form
      this.setState({
        id: "",
        product_title: "",
        ean_number: "",
        product_description: "",
        price: "",
        amount_storage: "",
        expiration_date: ""
      })

      //clear message after 4 seconds
      setTimeout(() => {
        document.getElementById("messageError").innerHTML = ""
        document.getElementById("messageAdd").innerHTML = ""
      }, 4000);

    } else {
      //write message
      document.getElementById("messageError").innerHTML = "All fields must be filled"
    }
  }

  //render and return one form and one component; check cookie
  render() {
    //check if a cookie value exist/logged in user
    if (document.cookie === 'UserToken=' || document.cookie === '') {
      window.location = '/';
    } else {
      //render if token has value
      //return one form and one list components
      return (
        <div>

          <div className="row">
            <div className="col-md bg-dark bg-gradient text-white p-4">

              <h2 className='display-4'>ADD PRODUCT</h2>
              <p>
                Add a new product article below; title and EAN number must be filled:
              </p>

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
                <br /><br />
                <input
                  type="submit"
                  value="Add product!"
                  className="btn btn-lg" />
              </form>
              <br />
              <p id="messageAdd"></p>
              <p id="messageError"></p>
            </div>

            <div className="col-md bg-dark bg-gradient text-white p-4">
              <h2 className='display-4'>PRODUCT LIST</h2>
              <p>
                The latest new products are shown first:
              </p>
              <ListProducts key={this.state.id} />
            </div>
          </div>
        </div>
      )
    }
  }
}


// END OF LOGIN COMPONENT
/*******************************************************************************************/


/*******************************************************************************************/
// PARENT COMPONENT: STARTVIEW

//declare class component
class AddView extends React.Component {
  //render and return one components
  render() {
    return (
      <div><h1 className='display-3'>ADD</h1>
        <AddProducts />
      </div>
    )
  }
}


// END OF STARTVIEW COMPONENT
/*******************************************************************************************/

//declare main function
function Add() {

  //return view components
  return (
    <AddView />
  );
}


export default Add;