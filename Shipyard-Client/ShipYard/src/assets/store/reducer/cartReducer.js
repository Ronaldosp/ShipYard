const initialState = {
  cart: []
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {

    case "cart/add": {
      const existing = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (existing) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, qty: item.qty + 1 }
              : item
          )
        };
      }

      return {
        ...state,
        cart: [...state.cart, { ...action.payload, qty: 1 }]
      };
    }

    case "cart/increase":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      };

    case "cart/decrease":
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === action.payload
              ? { ...item, qty: item.qty - 1 }
              : item
          )
          .filter((item) => item.qty > 0)
      };

    case "cart/remove":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload)
      };

    case "cart/clear":
      return {
        ...state,
        cart: []
      };

    default:
      return state;
  }
}
