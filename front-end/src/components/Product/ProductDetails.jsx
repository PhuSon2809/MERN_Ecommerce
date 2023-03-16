import React, { Fragment, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useParams } from "react-router-dom";
import { addItemsToCart } from "../../actions/cartAction";
import {
  clearErrors,
  getProductDetails,
  getProductRandom,
  newReview,
} from "../../actions/productAction";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import {
  BoxCommnet,
  BoxContent,
  BoxInput,
  BoxQuantity,
  BoxRating,
  ButtonCustom,
  Green,
  InputComment,
  InputCustom,
  Stock,
  Tag,
  Title,
} from "./ProductStyle";
import ReviewCard from "./ReviewCard";
import AnotherProduct from "./AnotherProduct";

const ProductDetails = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { product, error, loading } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const { error: productRandomErr } = useSelector(
    (state) => state.productsRandom
  );

  const options = {
    size: "large",
    readOnly: true,
    value: product.rating,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added To Cart");
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(productRandomErr);
      dispatch(clearErrors());
    }
    dispatch(getProductRandom());
  }, [dispatch, productRandomErr, alert]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, reviewError, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Container sx={{ mt: 10, mb: 10 }}>
          <MetaData title={`${product.name}`} />
          <Grid container>
            <Grid item md={6} sx={{ pr: 5 }}>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </Grid>
            <Grid item md={6}>
              <BoxContent>
                <BoxRating>
                  <Rating {...options} />
                  <Typography>({product.numOfReviews} Reviews)</Typography>
                </BoxRating>

                <Typography variant="h3">{product.name}</Typography>
                <Typography variant="h5">{`${
                  product.price
                    ? product.price.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })
                    : ""
                }`}</Typography>

                <Green sx={{ color: "#198754" }}>
                  Hurry up! only <Tag>{product.Stock}</Tag> products left in
                  stock!
                </Green>

                <Typography sx={{ display: "flex", gap: "10px" }}>
                  Availability:
                  {product.Stock < 1 ? (
                    <Stock
                      sx={{ color: product.Stock < 1 ? "red" : "#198754" }}
                    >
                      Out of stock
                      <CloseIcon fontSize="small" />
                    </Stock>
                  ) : (
                    <Stock
                      sx={{ color: product.Stock < 1 ? "red" : "#198754" }}
                    >
                      In stock
                      <CheckOutlinedIcon fontSize="small" />
                    </Stock>
                  )}
                </Typography>

                <Box>
                  <Typography variant="h6" sx={{ fontWeight: "600" }}>
                    Description:
                  </Typography>
                  <Typography
                    sx={{ textAlign: "justify", letterSpacing: "1.5px" }}
                  >
                    {product.description}
                  </Typography>
                </Box>

                {product.Stock < 1 ? (
                  <></>
                ) : (
                  <BoxQuantity>
                    <Typography variant="h6" sx={{ fontWeight: "600" }}>
                      Quantity:
                    </Typography>
                    <BoxInput>
                      <IconButton
                        onClick={decreaseQuantity}
                        sx={{
                          color: "#000",
                          background: "#ffd90c",
                          "&:hover": {
                            background: "#ffd90c",
                          },
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <InputCustom readOnly type="number" value={quantity} />
                      <IconButton
                        onClick={increaseQuantity}
                        sx={{
                          color: "#000",
                          background: "#ffd90c",
                          "&:hover": {
                            background: "#ffd90c",
                          },
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </BoxInput>
                  </BoxQuantity>
                )}

                {product.Stock < 1 ? (
                  <Button fullWidth color="error" variant="contained">
                    Hết Hàng
                  </Button>
                ) : (
                  <ButtonCustom
                    size="large"
                    fullWidth
                    disabled={product.stock < 1 ? true : false}
                    onClick={addToCartHandler}
                    startIcon={<AddShoppingCartIcon />}
                  >
                    Add to Cart
                  </ButtonCustom>
                )}
              </BoxContent>
            </Grid>
          </Grid>

          <Box>
            <Title variant="h5" className="reviewsHeading">
              REVIEWS
            </Title>
            <BoxCommnet>
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />
              <InputComment
                label="Your Comment"
                multiline
                fullWidth
                minRows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <ButtonCustom onClick={reviewSubmitHandler}>
                Send comment
              </ButtonCustom>
            </BoxCommnet>
          </Box>

          <Grid container>
            {product.reviews && product.reviews[0] ? (
              <Grid item md={6}>
                {product.reviews &&
                  product.reviews.map((review) => (
                    <ReviewCard key={review._id} review={review} />
                  ))}
              </Grid>
            ) : (
              <Typography variant="h6">No Reviews Yet</Typography>
            )}
          </Grid>

          <AnotherProduct />
        </Container>
      )}
    </Fragment>
  );
};

export default ProductDetails;
