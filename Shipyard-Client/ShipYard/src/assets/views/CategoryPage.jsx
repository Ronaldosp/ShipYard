import { NavLink, Outlet } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AddCategory from "./AddCategory";
import { createCategory, fetchCategory } from "../store/action/actionCreator.js";
import CategoryTable from "../components/CategoryTable";

function CategoryPage(){
    const data = useSelector((state)=>{
        return state.categoryReducer.categories
    })

    const dispatch = useDispatch()
    
    useEffect(()=>{
       dispatch(fetchCategory())
    },[dispatch])

    const [modalShow, setModalShow] = useState(false);

    return (
        <div style={{
          backgroundImage: 'url("")',
          backgroundSize: "cover",
          // backgroundColor: '#20B2AA',
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <div className="container " style={{
            maxWidth: '1000px',
            width: '100%',
            backgroundColor: 'white',
            padding: '25px 30px',
            borderRadius: '5px',
            boxShadow: '0 5px 10px rgba(0, 0, 0, 0.15)'}}>
          <h1 className="d-flex justify-content-center text-align-center" style={{fontFamily:'Times New Roman' , fontStyle:'italic'}}>Category List</h1>
          <div className="d-flex justify-content-center text-align-center">
            <Button variant="outline-primary" onClick={() => setModalShow(true)}>
              Add New Category
            </Button>
          </div>
          <AddCategory show={modalShow} onHide={() => setModalShow(false)} />
          <div className="container">
            {/* BaseCard */}
            <div className=" row container d-flex grid gap-3 mt-4 row mx-auto ">
              <Table striped bordered hover>
                <thead >
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Thumbnail</th>
                  </tr>
                </thead>
                {(
                  data.map((el , index) => {
                    return <CategoryTable el={el} index={index+1} key={el.id} />;
                  })
                )}
              </Table>
            </div>
          </div>
          </div>
        </div>
      );
}

export default CategoryPage;