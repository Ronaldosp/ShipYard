import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart
} from "../store/action/actionCreator.js";

function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cartReducer.cart);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  if (!cart.length) {
    return (
      <div className="container mt-5 text-center">
        <h3>Your cart is empty</h3>
      </div>
    );
  }

    const handleCheckout = async () => {
    try {
        const items = cart.map((item) => ({
        item_id: item.id,
        quantity: item.qty
        }));

        const response = await fetch("http://localhost:3000/midtransToken", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            access_token: localStorage.access_token
        },
        body: JSON.stringify({ items })
        });

        const { token, orderId } = await response.json();

        if (!token) {
        throw new Error("Snap token not received");
        }

        window.snap.pay(token, {
            onSuccess: async function (result) {
                await fetch(`http://localhost:3000/orders/${orderId}/paid`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    access_token: localStorage.access_token
                }
                });

                alert("Payment successful!");
                //navigate("/orders");
            },

            onPending: function (result) {
                alert("Payment pending");
            },

            onError: function (result) {
                alert("Payment failed");
            }
        });


    } catch (error) {
        console.error(error);
        alert(error.message);
    }
    };


  return (
    <div className="container mt-5">
      <h2 className="mb-4">Shopping Cart</h2>

      <table className="table table-bordered align-middle">
        <thead className="table-dark">
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th width="160">Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {cart.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>Rp. {item.price.toLocaleString("id-ID")}</td>

              <td className="text-center">
                <button
                  className="btn btn-sm btn-outline-secondary me-2"
                  onClick={() => dispatch(decreaseQty(item.id))}
                >
                  −
                </button>

                <strong>{item.qty}</strong>

                <button
                  className="btn btn-sm btn-outline-secondary ms-2"
                  onClick={() => dispatch(increaseQty(item.id))}
                >
                  +
                </button>
              </td>

              <td>
                Rp. {(item.price * item.qty).toLocaleString("id-ID")}
              </td>

              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* TOTAL + CHECKOUT */}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <h4>
          Total: Rp. {totalPrice.toLocaleString("id-ID")}
        </h4>

        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-danger"
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </button>

          <button
            className="btn btn-primary"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
