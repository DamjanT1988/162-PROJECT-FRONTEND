import React from 'react';

/*******************************************************************************************/
// CHILD SUBCOMPONENT: PRODUCTITEM

class ProductItem extends React.Component {
    constructor(props) {
        super(props);

        this.increaseUp = this.increaseUp.bind(this);
        this.decreaseDown = this.decreaseDown.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
    }

    async deleteProduct(e) {

        var id = e.target.id

        const resp = await fetch("http://localhost:3000/products/" + id, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": 'http://localhost:8080'
            },
            mode: 'cors',
        });

        document.getElementById("deletedMessage").innerHTML = "Article deleted!"

        //reload page for header to appear, wait 1 seconds
        setTimeout(() => { window.location.reload(false) }, 1000);
    }


    increaseUp(e) {

        this.props.onIncrease(e.target.id, e.target.name);
        document.getElementById("storage").innerHTML = ++e.target.name
    }

    decreaseDown(e) {

        this.props.onDecrease(e.target.id, e.target.name);
        document.getElementById("storage").innerHTML = --e.target.name
    }

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
                    onClick={this.increaseUp}
                />
                <input
                    type="button"
                    value="-1 storage"
                    id={product._id}
                    name={product.amount_storage}
                    className="btn btn-light-red lager"
                    onClick={this.decreaseDown}
                />
                <br />
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
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };

        //bind methods/functions
        this.increase = this.increase.bind(this);
        this.decrease = this.decrease.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:3000/products/", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": 'http://localhost:8080'
            },
            mode: 'cors'
        })

            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    data: data
                })
            })
    }


    async increase(id, amount) {
        const amountComp = ++amount;

        let productBody = {
            _id: id,
            amount_storage: amountComp
        };

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

    async decrease(id, amount) {
        const amountComp = --amount;

        let productBody = {
            _id: id,
            amount_storage: amountComp
        };

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

    render() {
        const list = [];

        this.state.data.forEach((product) => {
            list.push(
                <ProductItem
                    product={product}
                    key={product._id}
                    onIncrease={this.increase}
                    onDecrease={this.decrease}
                />

            )
        })

        list.reverse();

        return (
            <div>{list}</div>
        );
    }
}

// END OF PRODUCTSLIST SUBCOMPONENT
/*******************************************************************************************/

function List() {

    //View components
    return (
        <ListProducts />
    );
}


export default List;