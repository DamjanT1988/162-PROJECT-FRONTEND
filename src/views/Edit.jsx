import React from 'react';

/*******************************************************************************************/
// CHILD COMPONENT: PRODUCTS

class Products extends React.Component {
    render() {
        return (
            <div></div>
        );
    }
}

// END OF PRODUCTS COMPONENT
/*******************************************************************************************/


/*******************************************************************************************/
// CHILD COMPONENT: EDIT

class EditProducts extends React.Component {

    render() {
        return (
            <div></div>
        );
    }
}

// END OF EDIT COMPONENT
/*******************************************************************************************/


/*******************************************************************************************/
// PARENT COMPONENT: EDITVIEW

class EditView extends React.Component {
    /*className="row"*/
    render() {
        return (
            <div>
                <div className="col-md bg-dark bg-gradient text-white p-4">

                    <h2>EDIT PRODUCT</h2>
                    <p>

                    </p>
                    <EditProducts />
                </div>

                <div className="col-md bg-dark bg-gradient text-white p-4">
                    <h2>PRODUCT LIST</h2>
                    <p>

                    </p>
                    <Products />
                </div>
            </div>

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