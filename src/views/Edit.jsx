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
        this.reloadNow = this.reloadNow.bind(this);
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

    reloadNow(e) {
        this.props.reload;
    }

    // sök product-funktion
    async searchProduct(event) {

        event.preventDefault();

        let input = document.getElementById('searchbar').value

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
        }
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
                        className="btn btn-lg"
                        value="Search in list!"
                        onChange={this.handleEvent}
                        onClick={this.searchProduct} />
                    <br /><br />
                    <input
                        type="submit"
                        className="btn btn-lg"
                        value="Reload list!"
                        onChange={this.handleEvent}
                        onClick={this.reloadNow} />
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

    reloadList() {
        this.setState({
            id: ""
        })
    }

    async updateProduct(event) {
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

            const id = this.state._id

            const resp = await fetch("http://localhost:3000/products/" + id, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                },
                credentials: 'same-origin',
                body: JSON.stringify(productBody)
            })

            document.getElementById("messageError").innerHTML = ""
            document.getElementById("messageAdd").innerHTML = "Product updated!"
        } else {

            document.getElementById("messageError").innerHTML = "Title/EAN number must be filled"
        }

        this.setState({
            id: ""
        })
    }

    async getProductsById(event) {
        event.preventDefault();

        console.log(this.state._id);

        const id = this.state._id

        const resp = await fetch("http://localhost:3000/products/" + id, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            }
        })

        const data = await resp.json();

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

    render() {
        //check if a cookie value exist/logged in user
        if (document.cookie === 'UserToken=' || document.cookie === '') {
            window.location = '/';
        } else {
            return (
                <div>
                    <div className="row">
                        <div className="col-md bg-dark bg-gradient text-white p-4">

                            <h2>EDIT AN ARTICLE</h2>
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
                                <p
                                    hidden
                                    className="hidden"
                                    id="id">
                                </p>
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
                            <h2>ALL PRODUCTS VIEW</h2>
                            <p>
                                Search a product by any key word (like product name or #1 article number) and view the result below; or view the whole list
                                below without search; reload to search the whole list again:
                            </p>
                            <SearchProduct key={this.state.id} reload={this.reloadList} />
                            <p>
                                Newest product shown first:
                            </p>
                            <ListProducts key={this.state.id} />
                        </div>
                    </div>
                </div>
            );
        }
    }
}

// END OF EDIT COMPONENT
/*******************************************************************************************/


/*******************************************************************************************/
// PARENT COMPONENT: EDITVIEW

class EditView extends React.Component {
    render() {
        return (
            <EditProducts />
        )
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