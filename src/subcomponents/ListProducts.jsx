import React from 'react';

/*******************************************************************************************/
// CHILD SUBCOMPONENT: PRODUCTITEM

class ProductItem extends React.Component {
    constructor(props) {
        super(props);

        this.increaseUp = this.increaseUp.bind(this);
        this.decreaseDown = this.decreaseDown.bind(this);
    }

    increaseUp(e) {

        this.props.onIncrease(e.target.id, e.target.name);

    }

    decreaseDown(e) {

        this.props.onDecrease(e.target.id, e.target.name);
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
                <p>{product.amount_storage}</p>

                <input
                    type="button"
                    value="+1 storage"
                    id={product._id}
                    name={product.amount_storage}
                    className="btn btn-light-red lager"
                    onClick={this.increaseUp}
                />
                <input
                    type="button"
                    value="-1 storage"
                    id={product._id}
                    name={product.amount_storage}
                    className="btn btn-light-green lager"
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
                    type="submit"
                    value="DELETE!"
                    className="btn btn-red" />
            </article>
        );
    }
}
// END OF PRODUCTITEM SUBCOMPONENT
/*******************************************************************************************/

/*******************************************************************************************/
// PARENT SUBCOMPONENT: PRODUCTSLIST

class ListProductsClass extends React.Component {
    constructor(props) {
        super(props);

        /*
        const resp = fetch("http://localhost:3000/products/", {
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
            },
            credentials: 'same-origin',

        })
    
        console.log(resp)
        //const data = resp.json();
    */

        var data = [
            {
                _id: "63a9b40210fff3368650e15f",
                product_title: "I",
                ean_number: "Projing",
                product_description: "A",
                amount_storage: 1,
                price: 44,
                expiration_date: "2",
                createdAt: "2022-12-26T14:47:30.038Z",
                updatedAt: "2022-12-26T14:47:30.038Z",
                __v: 0
            },
            {
                _id: "3368650e15f",
                product_title: "Iööö",
                ean_number: "Projingöööööö",
                product_description: "kkA",
                amount_storage: 5,
                price: 477,
                expiration_date: "88",
                createdAt: "2022-12-26T14:47:30.038Z",
                updatedAt: "2022-12-26T14:47:30.038Z",
                __v: 0
            }
        ]

        this.state = {
            data: data,
        };

        //bind methods/functions
        this.increase = this.increase.bind(this);
        this.decrease = this.decrease.bind(this);
    }

    async increase(id, amount) {

        //this.product.amount_storage++;

        const amountComp = amount + 1;

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


    // funktion för att öka/minska lager
    async decrease(id, amount) {

        //this.product.amount_storage++;

        const amountComp = amount - 1;

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
        }
        )

        return (
            <div>{list}</div>
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