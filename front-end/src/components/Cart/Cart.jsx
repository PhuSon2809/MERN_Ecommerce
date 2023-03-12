import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import "./Cart.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Typography from "@material-ui/core/Typography";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Container, Grid, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
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
} from "./CartStyle";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <Container>
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
                  <Typography variant="h5">My Cart</Typography>
                  <Item sx={{ textDecoration: "underline" }}>
                    {cartItems?.length} item
                  </Item>
                </BoxHeader>

                {cartItems &&
                  cartItems.map((item) => (
                    <BoxLine key={item.product}>
                      <CartItemCard item={item} />
                      <BoxQuantity>
                        <BoxInput>
                          <ButtonCus
                            onClick={() =>
                              decreaseQuantity(item.product, item.quantity)
                            }
                          >
                            <RemoveIcon />
                          </ButtonCus>
                          <InputCustom
                            readOnly
                            type="number"
                            value={item.quantity}
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
                      <p className="cartSubtotal">{`${(
                        item.price * item.quantity
                      ).toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}`}</p>
                    </BoxLine>
                  ))}
              </BoxCartList>
            </Grid>
            <Grid item md={3}>
              <div className="cartGrossProfit">
                <div className="cartGrossProfitBox">
                  <Typography>Total</Typography>
                  <Typography>{`${cartItems
                    .reduce((acc, item) => acc + item.quantity * item.price, 0)
                    .toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}`}</Typography>
                </div>
                <div className="checkOutBtn">
                  <ButtonCustom
                    color="#000"
                    width="100%"
                    onClick={checkoutHandler}
                  >
                    Check out
                  </ButtonCustom>
                </div>
              </div>
            </Grid>
          </Grid>
        </BoxCart>
      )}
    </Container>
  );
};

export default Cart;
