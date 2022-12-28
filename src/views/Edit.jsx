import React from 'react';
import ListProducts from '../subcomponents/ListProducts';

/*******************************************************************************************/
// CHILD COMPONENT: EDIT

class EditProducts extends React.Component {

    render() {
        return (
            <form>
                <input 
                    id="searchbar" 
                    type="text" 
                    name="search" 
                    className="form-control-lg" 
                    placeholder="key word" />
                <br /><br />
                <input 
                    type="submit"   
                    className="btn btn-dark" 
                    value="Search in list!" />
                <br />
                <input 
                    type="submit"
                    value="Reload list!"
                    className="btn btn-dark" />
                <br />
            </form>
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

                        <h2>EDIT PRODUCT</h2>
                        <p>

                        </p>
                        <EditProducts />
                    </div>

                    <div className="col-md bg-dark bg-gradient text-white p-4">
                        <h2>PRODUCT LIST</h2>
                        <p>

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