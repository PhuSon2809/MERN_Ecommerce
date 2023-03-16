import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  REMOVE_ALL_CART,
  SAVE_SHIPPING_INFO,
  INCREASE_QUANTITY_CART,
  DECREASE_QUANTITY_CART,
  UPDATE_QUANTITY_CART,
} from "../constants/cartConstant";

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );
      console.log(isItemExist);

      if (isItemExist) {
        item.quantity = isItemExist.quantity + parseInt(item.quantity);
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExist.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case UPDATE_QUANTITY_CART:
      const itemUpdateQuantity = state.cartItems.find(
        (i) => i.product === action.payload.id
      );
      itemUpdateQuantity.quantity = action.payload.newQuantity;
      return {
        ...state,
        cartItems: state.cartItems.map((i) =>
          i.product === action.payload.id ? itemUpdateQuantity : i
        ),
      };
    case INCREASE_QUANTITY_CART:
      const itemIncreaseQuantity = state.cartItems.find(
        (i) => i.product === action.payload
      );
      itemIncreaseQuantity.quantity += 1;
      return {
        ...state,
        cartItems: state.cartItems.map((i) =>
          i.product === action.payload ? itemIncreaseQuantity : i
        ),
      };
    case DECREASE_QUANTITY_CART:
      const itemDecreaseQuantity = state.cartItems.find(
        (i) => i.product === action.payload
      );
      itemDecreaseQuantity.quantity -= 1;
      return {
        ...state,
        cartItems: state.cartItems.map((i) =>
          i.product === action.payload ? itemDecreaseQuantity : i
        ),
      };
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };

    case REMOVE_ALL_CART:
      return {
        ...state,
        cartItems: [],
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    default:
      return state;
  }
};
