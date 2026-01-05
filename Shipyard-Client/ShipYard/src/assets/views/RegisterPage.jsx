import {useState} from "react"
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import Button from 'react-bootstrap/Button';
import { register } from "../store/action/actionCreator";
function RegisterPage(){
    const [username , setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password , setPassword] = useState("")
    const [role, setRole] = useState("Customer")
    const [address , setAddress] = useState("")
    const [phoneNumber , setPhoneNumber] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()
    return <>
        <div style={{
        backgroundImage: 'url("https://images2.alphacoders.com/131/thumb-1920-1313270.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <div className="container " style={{maxWidth: '800px',
        width: '100%',
        backgroundColor: 'white',
        padding: '25px 30px',
        borderRadius: '5px',
        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.15)',
        border:'5' }}>
            <h1 className="d-flex justify-content-center text-align-center">Register Form</h1>
            <div className="container" >
         <form onSubmit={(event)=>{
          event.preventDefault()
          const registerData={
            email , password , username , role , address , phoneNumber
          };
          dispatch(register(registerData))
          navigate('/login')

        }}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input 
            className="form-control" 
            type="text"
            value={username}
            onChange={(event)=>{
              const value = event.target.value
              setUsername(value)
            }}
             />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input 
            className="form-control" 
            type="email"
            value={email}
            onChange={(event)=>{
              const value = event.target.value
              setEmail(value)
            }}
             />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input 
            type="password" 
            className="form-control"
            value={password}
            onChange={(event)=>{
              const value = event.target.value
              setPassword(value)
            }}
             />
          </div>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <input 
            className="form-control" 
            type="text"
            value={address}
            onChange={(event)=>{
              const value = event.target.value
              setAddress(value)
            }}
             />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input 
            className="form-control" 
            type="text"
            value={phoneNumber}
            onChange={(event)=>{
              const value = event.target.value
              setPhoneNumber(value)
            }}
             />
          </div>
          
          <div className="d-flex justify-content-center text-align-center">
           <Button  type="submit" className="btn btn-dark">
          Register 
          </Button>
          </div>
        </form>
        </div>
        </div>
        </div>
    </>
}

export default RegisterPage