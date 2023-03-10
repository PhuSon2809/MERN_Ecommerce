import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./CartItemCard.css";

const CartItemCard = ({ item }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="image" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`${item.price.toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        })}`}</span>
      </div>
    </div>
  );
};

export default CartItemCard;
