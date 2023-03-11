import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { Box, Container, Grid, Pagination, Slider, Stack } from "@mui/material";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import { clearErrors, getProduct } from "../../actions/productAction";
import { CategoryData } from "../../assets/data/CategoryData";
import ProductItem from "../../container/ProductItem/ProductItem";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import { BoxCategory, CategoryItem, NameTag } from "./ProductStyle";

const Products = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 3000000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const setCurrentPageNo = (e, page) => {
    setCurrentPage(page);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const { keyword } = useParams();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, rating));
  }, [dispatch, keyword, currentPage, price, category, rating, alert, error]);

  return (
    <Container sx={{ mt: 10, mb: 10 }}>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Products" />
          <Grid container>
            <Grid item md={3}>
              <BoxCategory>
                <NameTag>Categories</NameTag>
                {CategoryData.map((category) => (
                  <CategoryItem
                    key={category.id}
                    className="transition"
                    onClick={() => setCategory(category.name)}
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      width="35px"
                      height="35px"
                    />
                    <Typography>{category.name}</Typography>
                  </CategoryItem>
                ))}
              </BoxCategory>
              <BoxCategory sx={{ mt: 5 }}>
                <NameTag>Price</NameTag>
                <Slider
                  value={price}
                  onChange={priceHandler}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                  min={0}
                  max={3000000}
                  sx={{ color: "#000", width: "85%", mr: "auto", ml: "auto" }}
                />
              </BoxCategory>
            </Grid>
            <Grid item md={9}>
              <Grid container sx={{ pl: 5 }}>
                {products &&
                  products.map((product) => (
                    <Grid key={product._id} item md={4}>
                      <ProductItem product={product} />
                    </Grid>
                  ))}

                <Box
                  sx={{ width: "100%", display: "flex", alignItems: "center" }}
                >
                  <Stack spacing={2} sx={{ mr: "auto", ml: "auto" }}>
                    <Pagination
                      count={Math.ceil(
                        filteredProductsCount
                          ? filteredProductsCount / resultPerPage
                          : productsCount / resultPerPage
                      )}
                      page={currentPage}
                      onChange={setCurrentPageNo}
                      variant="outlined"
                      color="secondary"
                      sx={{ width: "100%" }}
                    />
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Fragment>
      )}
    </Container>
  );
};

export default Products;
