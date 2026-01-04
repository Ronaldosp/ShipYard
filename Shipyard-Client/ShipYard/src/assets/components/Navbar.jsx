import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState , useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from "react-bootstrap/Button";
import "../styling/Navbar.scss";

function NavBar(){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cartReducer.cart);
    console.log(cart , "cart");

    const isLoggedIn = !!localStorage.getItem("access_token");

    const token = localStorage.getItem("access_token");
    let role = null;

    if (token) {
    try {
        const decoded = jwtDecode(token);
        role = decoded.role;
        console.log(role ,"role");
        
    } catch (err) {
        console.error("Invalid token");
    }
    }

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return <div>
        <Navbar expand="lg" className="custom-navbar  position-relative">
        <Container>
            <Navbar.Brand>My Shipyard</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="position-absolute start-50 translate-middle-x">
                {role === "Customer" && (
                    <>
                        <NavLink to='/' className="nav-link">Home</NavLink>
                        <NavLink to='/products' className="nav-link" >Products</NavLink>
                        <NavLink to="/products" className="nav-link">
                            Careers
                        </NavLink>
                        <NavLink to="/products" className="nav-link">
                            History
                        </NavLink>

                        <NavLink to="/products" className="nav-link">
                            Services
                        </NavLink>
                        
                        <NavLink to="/orders" className="nav-link">
                            My Orders
                        </NavLink>
                    </>
                )}
                {role === "Admin" && (
                    <>
                        <NavLink to="/categories" className="nav-link">
                            Add Category
                        </NavLink>
                        <NavLink to="/items" className="nav-link">
                            Add Items
                        </NavLink>
                        <NavLink to="/orders" className="nav-link">
                            Orders Status
                        </NavLink>
                    </>
                )}
                </Nav>
            <Nav className="ms-auto">
                {!isLoggedIn && (
                    <>
                        <NavLink to="/login" className="nav-link">Login</NavLink>
                        <NavLink to="/register" className="nav-link">Register</NavLink>
                    </>
                )}

                {isLoggedIn && (
                    <>
                        <div className="d-flex gap-2">
                        <Link to="/cart" className="btn btn-success">
                        Cart ({cart.length})
                        </Link>

                        <Button
                            className="btn btn-primary"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                        </div>
                    </>
                )}
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    </div>
}

export default NavBar;