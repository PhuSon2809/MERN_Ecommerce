import axios from "axios";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
  REMOVE_ALL_CART,
  INCREASE_QUANTITY_CART,
  DECREASE_QUANTITY_CART,
  UPDATE_QUANTITY_CART,
} from "../constants/cartConstant";

// Add to cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.Stock,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const increaseQuantityCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: INCREASE_QUANTITY_CART,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const decreaseQuantityCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: DECREASE_QUANTITY_CART,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const updateQuantityCart =
  (id, newQuantity) => async (dispatch, getState) => {
    dispatch({
      type: UPDATE_QUANTITY_CART,
      payload: { id, newQuantity },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
// Remove from cart
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Remove from cart
export const removeAllFromCart = () => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_ALL_CART,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Save shipping info
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
