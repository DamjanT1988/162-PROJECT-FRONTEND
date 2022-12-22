import React from 'react';
import { BrowserRouter, Route/*useNavigate, withRouter, useHistory, Redirect*/ } from "react-router-dom";

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
    render() {
        //check if a cookie value exist/logged in user
        if (document.cookie === 'UserToken=' || document.cookie === '') {
            window.location = '/';
        }

        return (
            <div className="row">
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
/*
export function HomeSection() {
    const history = useHistory();
history.push('login');
} */

function Edit() {

    //View components
    return (
        <EditView />
    );
}


export default Edit;