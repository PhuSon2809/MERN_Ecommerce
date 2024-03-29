import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Typography from "@material-ui/core/Typography";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Container, Grid, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
  addItemsToCart,
  decreaseQuantityCart,
  increaseQuantityCart,
  removeAllFromCart,
  removeItemsFromCart,
  updateQuantityCart,
} from "../../actions/cartAction";
import ButtonCustom from "../../container/ButtonCustom/ButtonCustom";
import CartItemCard from "./CartItemCard";
import {
  BoxCart,
  BoxCartList,
  BoxEmpty,
  BoxHeader,
  BoxInput,
  BoxLine,
  BoxQuantity,
  InputCustom,
  ButtonCus,
  Red,
  Item,
  TitleCart,
  ContentFooter,
} from "./CartStyle";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";

const Cart = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const [quantity, setQuantity] = useState("");
  const [editQuantity, setEditQuantity] = useState({
    id: "",
    status: false,
  });

  const increaseQuantity = (id, quantity, stock) => {
    if (stock <= quantity) {
      alert.info(`Only ${stock} products in stock!`);
      return;
    }

    dispatch(increaseQuantityCart(id));
  };

  const decreaseQuantity = (id, stock) => {
    if (stock < 1) {
      alert.info(`Products out of stock!`);
      return;
    }

    dispatch(decreaseQuantityCart(id));
  };

  const handleEditQuantity = (id) => {
    setEditQuantity({
      id,
      status: true,
    });
  };

  const handleBlur = (id, stock) => {
    if (quantity === null || quantity === "" || quantity === "0") {
      setQuantity(1);
      setEditQuantity({
        id,
        status: false,
      });
      return;
    }

    if (quantity > stock) {
      alert.error(`Only ${stock} products in stock!`);
      setQuantity(1);
      return;
    }

    dispatch(updateQuantityCart(id, parseInt(quantity)));
    setEditQuantity({
      id,
      status: false,
    });
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <Container>
      <MetaData title="Carts" />
      {cartItems.length === 0 ? (
        <BoxEmpty>
          <IconButton
            className="transition2"
            sx={{
              background: "#000",
              "&:hover": {
                background: "#000",
              },
            }}
          >
            <RemoveShoppingCartIcon
              sx={{ fontSize: "100px", color: "#ffd90c" }}
            />
          </IconButton>
          <TitleCart variant="h2">No Product in Your Cart</TitleCart>
          <Link to="/products">
            <ButtonCustom color="#000" size="large">
              Shopping Now
            </ButtonCustom>
          </Link>
        </BoxEmpty>
      ) : (
        <BoxCart>
          <Grid container>
            <Grid item md={9} sx={{ pr: 5 }}>
              <BoxCartList>
                <BoxHeader>
                  <TitleCart variant="h5">My Cart</TitleCart>
                  <Item>{cartItems?.length} item</Item>
                </BoxHeader>

                {cartItems &&
                  cartItems.map((item) => (
                    <BoxLine key={item.product}>
                      <CartItemCard item={item} />
                      <BoxQuantity>
                        <BoxInput>
                          <ButtonCus
                            onClick={() =>
                              decreaseQuantity(item.product, item.stock)
                            }
                          >
                            <RemoveIcon />
                          </ButtonCus>
                          <InputCustom
                            type="number"
                            value={
                              editQuantity.status &&
                              editQuantity.id === item.product
                                ? quantity
                                : item.quantity
                            }
                            onChange={(e) => setQuantity(e.target.value)}
                            onFocus={(e) => setQuantity("")}
                            onClick={() => handleEditQuantity(item.product)}
                            onBlur={() => handleBlur(item.product, item.stock)}
                          />
                          <ButtonCus
                            onClick={() =>
                              increaseQuantity(
                                item.product,
                                item.quantity,
                                item.stock
                              )
                            }
                          >
                            <AddIcon />
                          </ButtonCus>
                        </BoxInput>
                        <Red onClick={() => deleteCartItems(item.product)}>
                          Remove
                        </Red>
                      </BoxQuantity>
                      <Typography>{`${(
                        item.price * item.quantity
                      ).toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}`}</Typography>
                    </BoxLine>
                  ))}

                <BoxHeader>
                  <Link to="/products">
                    <ContentFooter>Continue shopping</ContentFooter>
                  </Link>

                  <ContentFooter onClick={() => dispatch(removeAllFromCart())}>
                    Clear cart
                  </ContentFooter>
                </BoxHeader>
              </BoxCartList>
            </Grid>
            <Grid item md={3}>
              <BoxCartList sx={{ mb: 6 }}>
                <BoxHeader>
                  <Typography>Total</Typography>
                  <Typography>{`${cartItems
                    .reduce((acc, item) => acc + item.quantity * item.price, 0)
                    .toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}`}</Typography>
                </BoxHeader>
                <ButtonCustom
                  color="#000"
                  width="100%"
                  onClick={checkoutHandler}
                >
                  Check out
                </ButtonCustom>
              </BoxCartList>
              <img
                src="https://cdn.shopify.com/s/files/1/0549/6851/6852/files/Banner.jpg?v=1647230535"
                alt="PR"
                width="100%"
              />
            </Grid>
          </Grid>
        </BoxCart>
      )}
    </Container>
  );
};

export default Cart;
