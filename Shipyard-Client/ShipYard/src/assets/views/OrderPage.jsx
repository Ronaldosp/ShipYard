import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/orders", {
      headers: {
            "Content-Type": "application/json",
            access_token: localStorage.access_token
        },
    })
      .then(res => res.json())
      .then(setOrders);
  }, []);

  const handlePay = async (order) => {
    try {
        console.log(order);
        
      // Prepare items array from order
      if (!order.Items || order.Items.length === 0) {
        alert("This order has no items to pay for.");
        return;
    }
      const items = order.Items.map(i => ({
        item_id: i.id,
        quantity: i.OrderItem.quantity
      }));
      

      if (items.length === 0) {
        alert("Order has no items");
        return;
      }

      // Call backend to get Midtrans Snap token
      const response = await fetch("http://localhost:3000/midtransToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token
        },
        body: JSON.stringify({ items })
      });

      const data = await response.json();
      console.log("MIDTRANS DATA:", data);

      if (!data.token) {
        throw new Error("Snap token not received");
      }

      // Open Midtrans payment popup
      window.snap.pay(data.token, {
        onSuccess: async function (result) {
          // Optionally mark order as PAID locally
          await fetch(`http://localhost:3000/orders/${order.id}/paid`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              access_token: localStorage.access_token
            }
          });

          alert("Payment successful!");
          // Refresh orders
          setOrders(prev => prev.map(o => o.id === order.id ? { ...o, status: "PAID" } : o));
        },
        onPending: function (result) {
          alert("Payment pending");
        },
        onError: function (result) {
          alert("Payment failed");
        }
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
    };

    const handleCancel = async (order) => {
    try {
        const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
        if (!confirmCancel) return;

        const response = await fetch(`http://localhost:3000/orders/${order.id}/cancel`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            access_token: localStorage.access_token
        }
        });

        if (!response.ok) throw new Error("Failed to cancel order");

        alert("Order cancelled successfully!");
        
        // Update the status locally
        setOrders(prev => prev.map(o => o.id === order.id ? { ...o, status: "CANCELLED" } : o));

    } catch (err) {
        console.error(err);
        alert(err.message);
    }
    };

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
      <h2 className="mb-4">My Orders</h2>

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
          {orders.map((order, i) => (
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
                
                {order.status === "PENDING" && (
                    <>
                    <button
                        className="btn btn-sm btn-success ms-2"
                        onClick={() => handlePay(order)}
                    >
                        Pay
                    </button>

                    <button
                        className="btn btn-sm btn-danger ms-2"
                        onClick={() => handleCancel(order)}
                    >
                        Cancel
                    </button>
                    </>
                )}
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


export default OrdersPage;