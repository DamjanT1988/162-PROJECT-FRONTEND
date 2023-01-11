import React from 'react';
//import component
import ListProducts from '../subcomponents/ListProducts';

/*******************************************************************************************/
// CHILD COMPONENT: SEARCHPRODUCT

class SearchProduct extends React.Component {
    //initiate constructor
    constructor(props) {
        super(props);
        //set initial state
        this.state = {
            search_word: ''
        };

        //bind methods/functions
        this.handleEvent = this.handleEvent.bind(this);
        this.searchProduct = this.searchProduct.bind(this);
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

    async searchProduct(event) {
        //prevent reload
        event.preventDefault();
        
        //store search word
        let input = this.state.search_word;

        //make stored word to lower cases
        input = input.toLowerCase();

        //store list objects identifier
        let x = document.getElementsByClassName('listobject');
        let i;

        //loot through all HTML-objects
        for (i = 0; i < x.length; i++) {
            //hide non-match objects
            if (!x[i].innerHTML.toLowerCase().includes(input)) {
                x[i].style.display = "none";
            }
            //show matched objects
            else {
                x[i].style.display = "item";
            }
        }
    }

    //render and return one form and two buttons
    render() {
        return (
            <div>
                <form >
                    <input
                        id="searchbar"
                        type="text"
                        name="search_word"
                        className="form-control-lg"
                        placeholder="key words"
                        onChange={this.handleEvent}
                        onClick={this.searchProduct} />
                    <br /><br />
                    <input
                        type="submit"
                        className="btn btn-lg"
                        value="Search in list!"
                        onChange={this.handleEvent}
                        onClick={this.searchProduct} />
                    <br /><br />
                </form>
                <form>
                    <input
                        type="submit"
                        className="btn btn-lg"
                        value="Reload list!" />
                    <br /><br />
                </form>
            </div>
        )
    }
}
// END OF CHILD COMPONENT: SEARCHPRODUCT
/*******************************************************************************************/


/*******************************************************************************************/
// CHILD COMPONENT: EDIT

class EditProducts extends React.Component {
    //initiate constructor
    constructor(props) {
        super(props);
        //set initial state
        this.state = {
            _id: '',
            product_title: '',
            ean_number: '',
            product_description: '',
            price: '',
            amount_storage: '',
            expiration_date: ''
        };

        //bind methods/functions
        this.handleEvent = this.handleEvent.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
        this.getProductsById = this.getProductsById.bind(this);
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
    async getProductsById(event) {
        event.preventDefault();

        //store state value
        const id = this.state._id

        //fetch request to API
        const resp = await fetch("http://localhost:3000/products/" + id, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            }
        })

        //store resp. json data
        const data = await resp.json();

        //set local state values from fetch data
        this.setState({
            _id: data._id,
            product_title: data.product_title,
            ean_number: data.ean_number,
            product_description: data.product_description,
            price: data.price,
            amount_storage: data.amount_storage,
            expiration_date: data.expiration_date
        })
    }

    //main method
    async updateProduct(event) {
        //prevent reload
        event.preventDefault();

        //check if empty
        if (
            this.state.product_title.length > 0 &&
            this.state.ean_number.length > 0
        ) {
            //store state values
            let productBody = {
                product_title: this.state.product_title,
                ean_number: this.state.ean_number,
                product_description: this.state.product_description,
                price: this.state.price,
                amount_storage: this.state.amount_storage,
                expiration_date: this.state.expiration_date,
            };

            //store state value id
            const id = this.state._id

            //fetch request the API
            const resp = await fetch("http://localhost:3000/products/" + id, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                },
                credentials: 'same-origin',
                body: JSON.stringify(productBody)
            })

            //clear state values
            this.setState({
                _id: '',
                product_title: '',
                ean_number: '',
                product_description: '',
                price: '',
                amount_storage: '',
                expiration_date: ''
            })

            //print sucess message
            document.getElementById("messageError").innerHTML = ""
            document.getElementById("messageAdd").innerHTML = "Product updated!"
            
            //clear message after 4 seconds
            setTimeout(() => {
                document.getElementById("messageError").innerHTML = ""
                document.getElementById("messageAdd").innerHTML = ""
            }, 4000);
        } else {
            //print error message
            document.getElementById("messageError").innerHTML = "All fields must be filled"
        }
    }

    //render and return two forms and two components
    render() {
        //check if a cookie value exist/logged in user
        if (document.cookie === 'UserToken=' || document.cookie === '') {
            window.location = '/';
        } else {
            return (
                <div>
                    <div className="row">
                        <div className="col-md bg-dark bg-gradient text-white p-4">

                            <h2 className='display-4'>EDIT AN ARTICLE</h2>
                            <p>
                                Search for the article product number for edit: if no result then the article number does not exist. Edit of
                                article number might write over existing article:
                            </p>

                            <form onSubmit={this.getProductsById} id="searchEdit">
                                <input
                                    name="_id"
                                    type="text"
                                    placeholder="article number"
                                    className="form-control-lg"
                                    value={this.state._id}          //prop from parent
                                    onChange={this.handleEvent}     //event listener; call method
                                />
                                <br /><br />
                                <input
                                    type="submit"
                                    value="Get article!"
                                    className="btn btn-lg" />
                                <br /><br />
                            </form>

                            <form onSubmit={this.updateProduct} id="formAdd">
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
                                    value="Update product!"
                                    className="btn btn-lg" />
                            </form>
                            <br />
                            <p id="messageAdd"></p>
                            <p id="messageError"></p>
                        </div>

                        <div className="col-md bg-dark bg-gradient text-white p-4">
                            <h2 className='display-4'>ALL PRODUCTS VIEW</h2>
                            <p>
                                Search a product by any key word (like product name or article number) and view the result below; or view the whole list
                                below without search; reload to search the whole list again:
                            </p>
                            <SearchProduct />
                            <p>
                                Newest product article shown first
                            </p>
                            <ListProducts key={this.state._id} />
                        </div>
                    </div>
                </div>
            )
        }
    }
}

// END OF EDIT COMPONENT
/*******************************************************************************************/


/*******************************************************************************************/
// PARENT COMPONENT: EDITVIEW

class EditView extends React.Component {
    //render and return main components
    render() {
        return (
            <div><h1 className='display-3'>EDIT</h1>
                <EditProducts />
            </div>
        )
    }
}


// END OF STARTVIEW COMPONENT
/*******************************************************************************************/

//initiate the function
function Edit() {

    //return component
    return (
        <EditView />
    );
}


export default Edit;