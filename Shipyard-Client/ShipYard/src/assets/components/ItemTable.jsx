import Button from 'react-bootstrap/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { deleteItem } from '../store/action/actionCreator';



function ItemTable({el , index}) {
  const dispatch = useDispatch()
  const handleDelete=(event)=>{
    event.preventDefault()
    const id = el.id
    dispatch(deleteItem(id))
    Swal.fire("Category Successfully Deleted");
  }

  return (
      <tbody>
        <tr>
          <td>{index}</td>
          <td>{el.name}</td>
          <td>{el.description}</td>
          <td ><img src={el.thumbnail} style={{ height: 150 , width: 200 , objectFit: 'cover' }}/></td>
          <td>{el.Category.name}</td>
          <td>{el.price}</td>
          <td>{el.stock}</td>
          <td >
            <div style={{ display: "flex" , gap: 2 }} >
           <Button onClick={handleDelete} variant="danger">Delete</Button>
            </div>
          </td>
        </tr>
      </tbody>
  );
}

export default ItemTable;