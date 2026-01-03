import { NavLink, Outlet } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Welcome from "../components/Welcome.jsx";
//import Collaborator from "../components/Collaborators.jsx";
import AboutUs from "../components/AboutUs.jsx";
import Footer from "../components/Footer.jsx";
import Products from "../components/Products.jsx";
//import CategoryCards from "../components/CategoryCard.jsx";


function HomePage(){

    return (
        <div style={{
          backgroundImage: 'url("")',
          backgroundSize: "cover",
          // backgroundColor: '#20B2AA',
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
        <Welcome/>
        <Products/>
        <AboutUs/>
        <Footer/>
        </div>
      );
}

export default HomePage