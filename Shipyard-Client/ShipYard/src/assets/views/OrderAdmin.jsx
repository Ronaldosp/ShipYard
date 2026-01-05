import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

function OrderAdmin() {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/ordersadmin", {
      headers: {
            "Content-Type": "application/json",
            access_token: localStorage.access_token
        },
    })
      .then(res => res.json())
      .then(setOrders);
  }, []);


    const handleView = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedOrder(null);
    };


  return (
    <div className="container mt-5">
      <h2 className="mb-4">Paid Orders</h2>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>No</th>
            <th>Order ID</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders
            .filter(order => order.status === "PAID")
            .map((order, i) => (
            <tr key={order.id}>
              <td>{i + 1}</td>
              <td>ORDER-{order.id}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>Rp. {order.totalAmount.toLocaleString("id-ID")}</td>
              <td>
                <span className={`badge ${
                  order.status === "PAID"
                    ? "bg-success"
                    : order.status === "PENDING"
                    ? "bg-warning"
                    : "bg-danger"
                }`}>
                  {order.status}
                </span>
              </td>
              <td>
                <button className="btn btn-sm btn-outline-primary"
                 onClick={() => handleView(order)}
                 >
                  View
                </button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Order Details - ORDER-{selectedOrder?.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedOrder?.Items && selectedOrder.Items.length > 0 ? (
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>No</th>
                            <th>Item</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        {selectedOrder.Items.map((item, i) => (
                            <tr key={item.id}>
                            <td>{i + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>Rp. {item.price.toLocaleString("id-ID")}</td>
                            <td>{item.OrderItem.quantity}</td>
                            <td>Rp. {(item.price * item.OrderItem.quantity).toLocaleString("id-ID")}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    ) : (
                    <p>No items in this order.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                </Modal.Footer>
                </Modal>
    </div>
  );
}


export default OrderAdmin;