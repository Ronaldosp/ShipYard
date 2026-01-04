import { useState , useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom"
import Button from "react-bootstrap/Button";
import { fetchCategory , createItem } from "../store/action/actionCreator";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function AddItems(props){
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const dataCategories = useSelector((state)=>{
      return state.categoryReducer.categories
    })

    const [name , setName] = useState("")
    const [description , setDescription] = useState("")
    const [thumbnail , setThumbnail] = useState("")
    const [category_id, setCategoryId] = useState(null)
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)

    useEffect(()=>{
      dispatch(fetchCategory())
    },[dispatch])

    return <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton style={{paddingLeft: 25}}>
        <Modal.Title id="contained-modal-title-vcenter" >
            <h2>Add New Item</h2>
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="container " style={{width:400 , padding: 25, border:5 }}>
        <div className="container" >
         <form onSubmit={(event)=>{
          event.preventDefault()
          const itemData={
            name , description , thumbnail , category_id , price , stock
          };
          dispatch(createItem(itemData))
          navigate('/')

        }}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input 
            className="form-control" 
            type="text"
            value={name}
            onChange={(event)=>{
              const value = event.target.value
              setName(value)
            }}
             />
          </div>
          <div className="mb-3">
            <label className="form-label">Model Name</label>
            <input 
            className="form-control" 
            type="text"
            value={description}
            onChange={(event)=>{
              const value = event.target.value
              setDescription(value)
            }}
             />
          </div>
          <label className="form-label">Category</label>
          <Form.Select aria-label="Default select example" 
            value={category_id}
            onChange={(event) => {
              const value = event.target.value;
              setCategoryId(Number(value));
            }}
          >
            <option value='' ></option>
            {
              dataCategories.map((el)=>{
                return <option key={el.id} value={el.id}>{el.name}</option>
              })
            }
          </Form.Select>
          <div className="mb-3">
            <label className="form-label">Thumbnail Image URL</label>

            <input
                type="text"
                className="form-control"
                placeholder="https://example.com/car.jpg"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
            />

            {thumbnail && (
                <img
                src={thumbnail}
                alt="Preview"
                onError={(e) => (e.target.style.display = "none")}
                style={{
                    marginTop: "10px",
                    width: "100%",
                    maxHeight: "250px",
                    objectFit: "cover",
                    borderRadius: "8px"
                }}
                />
            )}
            </div>
          <div className="mb-3">
            <label className="form-label">Price</label>
            <input 
            type="text" 
            className="form-control"
            value={price}
            onChange={(event)=>{
              const value = event.target.value
              setPrice(Number(value))
            }}
             />
          </div>
          <div className="mb-3">
            <label className="form-label">Stock</label>
            <input 
            type="text" 
            className="form-control"
            value={stock}
            onChange={(event)=>{
              const value = event.target.value
              setStock(Number(value))
            }}
             />
          </div>
          <div className="d-flex justify-content-center text-align-center">
           <Button  type="submit" className="btn btn-primary">
            Confirm 
          </Button>
          </div>
        </form>
        </div>
        </div>
        </Modal.Body>
        <Modal.Footer>
            {/* <Button onClick={props.onHide}>Close</Button> */}
        </Modal.Footer>
        </Modal>
    
}