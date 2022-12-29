import React from 'react';
import ListProducts from '../subcomponents/ListProducts';

/*******************************************************************************************/
// CHILD COMPONENT: SEARCHPRODUCT

class SearchProduct extends React.Component {
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

    // sök product-funktion
    async searchProduct(event) {

        event.preventDefault();

        console.log(this.state.search_word);

        /*
        //variabler
        let input = document.getElementById('searchbar').value
        //gör text till gemaner
        input = input.toLowerCase();
        let x = document.getElementsByClassName('listobject');
        let i;

        //loopa igenom alla HTML-objekt
        for (i = 0; i < x.length; i++) {
            //göm icke-match
            if (!x[i].innerHTML.toLowerCase().includes(input)) {
                x[i].style.display = "none";
            }
            //visa matchade
            else {
                x[i].style.display = "item";
            }
        }*/
    }

    reloadList() {
        window.location.reload(false);
    }

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
                        className="btn btn-dark"
                        value="Search in list!"
                        onChange={this.handleEvent}
                        onClick={this.searchProduct} />
                </form>
                <br />
                <input
                    className="btn btn-dark"
                    value="Reload list!"
                    onChange={this.handleEvent}
                    onClick={this.reloadList} />
                <br /><br />
            </div>
        )
    }
}
// END OF CHILD COMPONENT: SEARCHPRODUCT
/*******************************************************************************************/


/*******************************************************************************************/
// CHILD COMPONENT: SEARCHARTICLE

class SearchArticle extends React.Component {
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

    async getProductsById(event) {
        event.preventDefault();

        console.log(this.state._id);

        const id = this.state._id
        /*        
        const resp = await fetch("http://localhost:3000/products/" + id, {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json"
                    }
                })
    
                // svar från api, lagra i data
                const data = await resp.json();
    
                // lagra listan
                this.product = data;
            }
        }*/

        this.setState({
            _id: ""
        }
        )
    }

    render() {
        return (
            <form onSubmit={this.getProductsById} id="searchEdit">
                <input
                    name="_id"
                    type="text"
                    placeholder="article number"
                    className="form-control-lg"
                    value={this.state._id}   //prop from parent
                    onChange={this.handleEvent}     //event listener; call method
                />
                <p
                    hidden
                    className="hidden"
                    id="id">
                </p>
                <br />
                <input
                    type="submit"
                    value="Get article!"
                    className="btn btn-dark" />
                <br /><br />
            </form>
        )
    }
}

// END OF CHILD COMPONENT: SEARCHARTICLE
/*******************************************************************************************/


/*******************************************************************************************/
// CHILD COMPONENT: EDIT

class EditProducts extends React.Component {
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
        // kontroll att något fylls i
        if (this.state.product_title.length > 0 && this.state.ean_number > 0) {

            // skapa en JS-objekt att skicka med
            let productBody = {
                product_title: this.state.product_title,
                ean_number: this.state.ean_number,
                product_description: this.state.product_description,
                price: this.state.price,
                amount_storage: this.state.amount_storage,
                expiration_date: this.state.expiration_date,
            };

            console.log(productBody)

            /*
      const resp = await fetch("http://localhost:3000/products/", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json"
      },
      // omvandla JS-objekt till JSON
      body: JSON.stringify(productBody)
      });*/

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

// END OF EDIT COMPONENT
/*******************************************************************************************/


/*******************************************************************************************/
// PARENT COMPONENT: EDITVIEW

class EditView extends React.Component {
    render() {
        //check if a cookie value exist/logged in user
        if (document.cookie === 'UserToken=' || document.cookie === '') {
            window.location = '/';
        } else {
            //render if token has value
            return (
                <div className="row">
                    <div className="col-md bg-dark bg-gradient text-white p-4">

                        <h2>EDIT AN ARTICLE</h2>
                        <p>
                            Search for the article product number for edit: if no result then the article number does not exist. Edit of
                            article number might write over existing article.
                        </p>
                        <SearchArticle />

                        <EditProducts />
                    </div>

                    <div className="col-md bg-dark bg-gradient text-white p-4">
                        <h2>ALL PRODUCTS VIEW</h2>
                        <p>
                            Search a product by any key word (like product name or #1 article number) and view the result below; or view the whole list
                            below without search; reload to search the whole list again:
                        </p>
                        <SearchProduct />
                        <p>
                            Newest product shown first:
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

function Edit() {

    //View components
    return (
        <EditView />
    );
}


export default Edit;