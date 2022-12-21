import React from "react";
import {Outlet} from "react-router-dom";
import Header from "../viewcomponents/Header";
import Footer from "../viewcomponents/Footer";
import '../style/main.css';
import '../style/bootstrap.min.css';

const ViewLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default ViewLayout;