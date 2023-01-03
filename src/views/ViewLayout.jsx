import React from "react";
//import router methods for React
import { Outlet } from "react-router-dom";
//import header and footer components
import Header from "../viewcomponents/Header";
import Footer from "../viewcomponents/Footer";
//import style files
import '../style/main.css';
import '../style/bootstrap.min.css';

//save function of layout
const ViewLayout = () => {
    //return layout structure
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

//export variable 
export default ViewLayout;