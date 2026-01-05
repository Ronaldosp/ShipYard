import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/action/actionCreator";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogin=()=>{
    const loginData = {
      email,
      password
    }
    dispatch(login(loginData))
    .then(()=>{
      navigate('/')
    })
    
  }

  return (
    <>
    <div className="LoginPage-Component" style={{
        backgroundImage: 'url("https://images8.alphacoders.com/631/thumb-1920-631372.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}> 
    <div className="container" style={{
        maxWidth: '400px',
        width: '100%',
        backgroundColor: 'white',
        padding: '25px 30px',
        borderRadius: '5px',
        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.15)',
      }}>
      <h1 className="d-flex justify-content-center text-align-center">Login</h1>
      <div className="container ">
      <form 
        onSubmit={(event) => {
          event.preventDefault();
          dispatch(handleLogin())
        }}
        
      >
        <div className="email-group mb-3">
          <label className="form-label">Email</label>
          <input
            className="form-control"
            type="email"
            value={email}
            onChange={(event) => {
              const value = event.target.value;
              setEmail(value);
            }}
          />
        </div>
        <div className="password-group mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(event) => {
              const value = event.target.value;
              setPassword(value);
            }}
          />
        </div>
        <div className="button-group d-flex justify-content-center pt-4 pb-2">
          <Button className="w-50" type="submit" variant="success">
            Login
          </Button>
        </div>

        <div className="text-center mt-2">
          <span className="text-muted">Don’t have an account? </span>
          <NavLink to="/register" className="text-primary fw-semibold">
            Register
          </NavLink>
        </div>

        <div className="text-center mt-2">
          <NavLink to="/" className="text-muted text-decoration-none">
            ← Back to Home
          </NavLink>
        </div>
      </form>
      </div>
      </div>
      </div>
    </>
  );
}

export default LoginPage;
