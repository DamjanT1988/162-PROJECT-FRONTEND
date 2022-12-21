import React from "react";
import {Outlet} from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import '../style/main.css';
import '../style/bootstrap.min.css'

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