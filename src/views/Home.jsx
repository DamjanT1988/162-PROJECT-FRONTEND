import React from 'react';

/*******************************************************************************************/
// CHILD COMPONENT: REGISTER

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameUser: '',
            emailUser: '',
            passwordUser: '',
            keyUser: ''
        };

        //bind methods/functions
        this.handleInputChange = this.handleInputChange.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }

    //save the input value and update state
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        //update state
        this.setState({
            [name]: value
        });
    }

    //register a new user
    async registerUser(event) {
        //prevent reload
        event.preventDefault();

        //check if input
        
        if (this.state.emailUser.length > 0 || this.state.emailUser !== undefined) {
        document.getElementById("responseLoginFail").innerHTML = "";
        document.getElementById("responseLoginSuccess").innerHTML = "";

        //send request to API 
        const resp = await fetch("http://localhost:3000/keys/", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": 'http://localhost:8080'
            },
            mode: 'cors'
        });

        var data = await resp.json();

        //check if input key macthes with first database key
        if (data[0].key == this.state.keyUser) {        

        //create a JS object
        let userBody = {
            name: this.state.nameUser,
            email: this.state.emailUser,
            password: this.state.passwordUser
        };

        //send request to API 
        const resp = await fetch("http://localhost:3000/users/", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": 'http://localhost:8080'
            },
            mode: 'cors',
            //convert JS object to JSON object
            body: JSON.stringify(userBody)
        });


        //store response
        const data = await resp.json();
        const msg = data.message;

        if (msg == undefined) {
            // print message
            document.getElementById("responseLoginFail2").innerHTML = "Registration fail!";
        } else {
            document.getElementById("responseLoginSuccess2").innerHTML = "Registration success! Please log in..";

        }

        //clear form
        //document.getElementById("nameUser").value = "";
        //document.getElementById("emailUser").value = "";
        //document.getElementById("passwordUser").value = "";
        //document.getElementById("keyUser").value = "";
    }
        }}

    render() {
        return (
            <form onSubmit={this.registerUser}>
                <label>
                    Your full name:
                    <br />
                    <input
                        name="nameUser"
                        id="nameUser"
                        type="text"
                        value={this.state.nameUser}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Your email:
                    <br />
                    <input
                        name="emailUser"
                        id="emailUser"
                        type="text"
                        value={this.state.emailUser}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Your password:
                    <br />
                    <input
                        name="passwordUser"
                        id="passwordUser"
                        type="password"
                        value={this.state.passwordUser}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Enter security key:
                    <br />
                    <input
                        name="keyUser"
                        id="keyUser"
                        type="password"
                        value={this.state.keyUser}
                        onChange={this.handleInputChange} />
                </label>
                <br /><br />
                <input
                    type="submit"
                    value="Register!"
                    className="btn btn btn-lg" />

                <p id="responseLoginFail2"></p>
                <p id="responseLoginSuccess2"></p>
            </form>
        );
    }
}

// END OF REGISTER COMPONENT
/*******************************************************************************************/


/*******************************************************************************************/
// CHILD COMPONENT: LOGIN

class Login extends React.Component {
    constructor(props) {
        super(props);
        //set initial state
        this.state = {
            emailUser: '',
            passwordUser: ''
        };

        //bind methods/functions
        this.handleInputChange = this.handleInputChange.bind(this);
        this.loginUser = this.loginUser.bind(this);
    }

    //save the input value and update state
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        //update state with new values
        this.setState({
            [name]: value
        });
    }

    //log in the user
    async loginUser(event) {
        //prevent reload
        event.preventDefault();
        //check if input
        if (this.state.emailUser.length !== 0 && this.state.emailUser !== 0) {
            document.getElementById("responseLoginFail").innerHTML = "";
            document.getElementById("responseLoginSuccess").innerHTML = "";

            //create a JS object
            let userBody = {
                email: this.state.emailUser,
                password: this.state.passwordUser
            };

            //send request to API 
            const resp = await fetch("http://localhost:3000/users/login/", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Access-Control-Allow-Origin": 'http://localhost:8080'
                },
                mode: 'cors',
                //convert JS object to JSON object
                body: JSON.stringify(userBody)
            });


            //store response
            const data = await resp.json();

            //save cookie
            document.cookie = "UserToken=" + data.token;

            //check login
            if (data.token == undefined) {
                //no value
                document.cookie = "UserToken=";
            } else {
                //add value
                document.cookie = "UserToken=" + data.token;
            }

            if (data.message == "Login approved!") {
                // print message
                document.getElementById("responseLoginSuccess").innerHTML = "Login success! Logging in..";
            } else {
                document.getElementById("responseLoginFail").innerHTML = "Login fail";
            }

            //reload page for header to appear, wait 2 seconds
            setTimeout(() => { window.location.reload(false) }, 2000);
        } else {
            document.getElementById("responseLoginFail").innerHTML = "Empty fields!";
        }
    }

    render() {
        return (
            <form onSubmit={this.loginUser}>
                <label>
                    Your email:
                    <br />
                    <input
                        name="emailUser"
                        id="emailUser"
                        type="text"
                        value={this.state.emailUser}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Your password:
                    <br />
                    <input
                        name="passwordUser"
                        id="passwordUser"
                        type="password"
                        value={this.state.passwordUser}
                        onChange={this.handleInputChange} />
                </label>
                <br /><br />
                <input
                    type="submit"
                    value="Log in!"
                    className="btn btn-lg" />

                <p id="responseLoginFail"></p>
                <p id="responseLoginSuccess"></p>
            </form>
        );
    }
}

// END OF LOGIN COMPONENT
/*******************************************************************************************/


/*******************************************************************************************/
// PARENT COMPONENT: STARTVIEW

class StartView extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md bg-dark bg-gradient text-white p-4">
                    <h2 className='display-4'>LOG IN</h2>
                    <p>
                        Log in below, then navigate through the buttons in top.
                    </p>
                    <Login />
                </div>

                <div className="col-md bg-dark bg-gradient text-white p-4">
                    <h2 className='display-4'>REGISTER</h2>
                    <p>
                        Register below. Navigate above. The key is used by the employer.
                    </p>
                    <Register />
                </div>
            </div>

        )
    }
}

// END OF STARTVIEW COMPONENT
/*******************************************************************************************/

function Home() {

    //View components
    return (
        <div><h1 className='display-3'>START</h1>
        <StartView />
        </div>
    );
}


export default Home;