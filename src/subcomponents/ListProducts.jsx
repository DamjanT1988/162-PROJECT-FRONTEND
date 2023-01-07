import React from 'react';

/*******************************************************************************************/
// CHILD SUBCOMPONENT: PRODUCTITEM

class ProductItem extends React.Component {
    //initiate constructor
    constructor(props) {
        super(props);
        const product = this.props.product;
        //initate an empty array state
        this.state = {
            amount: product.amount_storage
        };

        //bind methods
        this.increaseUp = this.increaseUp.bind(this);
        this.decreaseDown = this.decreaseDown.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
    }

    //method for deletation
    async deleteProduct(e) {

        //store target value id
        var id = e.target.id

        //fetch request API
        const resp = await fetch("http://localhost:3000/products/" + id, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": 'http://localhost:8080'
            },
            mode: 'cors',
        });

        //print message success
        document.getElementById("deletedMessage").innerHTML = "Article deleted!"

        //reload page for header to appear, wait 1 seconds
        setTimeout(() => { window.location.reload(false) }, 1000);
    }

    //method for increase storage
    increaseUp(e) {
        this.setState({
            amount: ++e.target.name
        })
        //pass data to parent
        this.props.onIncrease(e.target.id, this.state.amount);
        //increase target number by 1
        document.getElementById("storage").innerHTML = this.state.amount

    }

    //method for decrease storage
    decreaseDown(e) {
        this.setState({
            amount: --e.target.name
        })
        //pass data to parent
        this.props.onDecrease(e.target.id, this.state.amount);
        //decrease target number by 1
        document.getElementById("storage").innerHTML = this.state.amount

    }

    //render and return a list of all products from props data
    render() {
        const product = this.props.product;
        return (
            <article className="listobject">
                <h3 id="h3title"></h3>
                <br />
                <strong>Product title:</strong>
                <p className="list">{product.product_title}</p>
                <strong>Article number:</strong>
                <p>{product._id}</p>
                <strong>EAN number:</strong>
                <p>{product.ean_number}</p>
                <strong>Product description:</strong>
                <p>{product.product_description}</p>
                <strong>Selling price:</strong>
                <p>{product.price} kr</p>
                <strong>Amount in storage:</strong>
                <p id="storage">{product.amount_storage}</p>
                <input
                    type="submit"
                    value="+1 storage"
                    id={product._id}
                    name={product.amount_storage}
                    className="btn btn-light-green lager"
                    onClick={this.increaseUp} />
                <input
                    type="button"
                    value="-1 storage"
                    id={product._id}
                    name={product.amount_storage}
                    className="btn btn-light-red lager"
                    onClick={this.decreaseDown} />
                <br /><br />
                <strong>Expiration date:</strong>
                <p>{product.expiration_date}</p>
                <strong>Article created:</strong>
                <p>{product.createdAt}</p>
                <strong>Article updated:</strong>
                <p>{product.updatedAt}</p>
                <strong>Update version:</strong>
                <p>{product.__v}</p>
                <br />
                <input
                    type="button"
                    value="DELETE!"
                    className="btn btn-red"
                    id={product._id}
                    onClick={this.deleteProduct} />
                <p id="deletedMessage"></p>
            </article>
        );
    }
}
// END OF PRODUCTITEM SUBCOMPONENT
/*******************************************************************************************/

/*******************************************************************************************/
// PARENT SUBCOMPONENT: PRODUCTSLIST

class ListProducts extends React.Component {
    //initiate constructor
    constructor(props) {
        super(props);
        //initate an empty array state
        this.state = {
            data: []
        };

        //bind methods/functions
        this.increase = this.increase.bind(this);
        this.decrease = this.decrease.bind(this);
    }

    //mount on load
    componentDidMount() {
        //fetch request
        fetch("http://localhost:3000/products/", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": 'http://localhost:8080'
            },
            mode: 'cors'
        })
            //manage response data
            .then((response) => response.json())
            .then((data) => {
                //store data to local state data
                this.setState({
                    data: data
                })
            })
    }

    //method to increase storage in database
    async increase(id, amount) {
        //increase amount by 1
        const amountComp = ++amount;

        //save for body
        let productBody = {
            _id: id,
            amount_storage: amountComp
        };

        //fetch request for API
        const resp = await fetch("http://localhost:3000/products/" + id, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
            },
            credentials: 'same-origin',
            body: JSON.stringify(productBody)
        })
    }

    //method to decrease storage in database
    async decrease(id, amount) {
        //decrease amount by 1
        const amountComp = --amount;

        //save for body
        let productBody = {
            _id: id,
            amount_storage: amountComp
        };

        //fetch request
        const resp = await fetch("http://localhost:3000/products/" + id, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
            },
            credentials: 'same-origin',
            body: JSON.stringify(productBody)
        })
    }

    //render and return a list and a components
    render() {
        //save empty array
        const list = [];

        //forEach loop for object array from local state
        this.state.data.forEach((product) => {
            //push list to variable
            list.push(
                //send/recieve props data to child component
                <ProductItem
                    product={product}
                    key={product._id}
                    onIncrease={this.increase}
                    onDecrease={this.decrease}
                />

            )
        })

        //reverse order of list
        list.reverse();

        return (
            <div>{list}</div>
        );
    }
}

// END OF PRODUCTSLIST SUBCOMPONENT
/*******************************************************************************************/

//decklare main function
function List() {

    //return view component
    return (
        <ListProducts />
    );
}


export default List;