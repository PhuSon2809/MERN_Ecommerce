import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Pagination from "react-js-pagination";
import Typography from "@material-ui/core/Typography";
import { Container, Grid, Pagination, Slider, Stack } from "@mui/material";
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
  console.log(currentPage);
  const [price, setPrice] = useState([0, 3000000]);
  const priceRanges = [
    { label: "Less than 10,000", value: [0, 10000] },
    { label: "10,000 - 50,000", value: [10000, 50000] },
    { label: "50,000 - 100,000", value: [50000, 100000] },
    { label: "100,000 - 500,000", value: [100000, 500000] },
    { label: "500,000 - 1,000,000", value: [500000, 1000000] },
    { label: "More than 1,000,000", value: [1000000, 3000000] },
  ];
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

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  // const handlePageChange = (e, page) => {
  //   setFilters((prevFilters) => ({
  //     ...prevFilters,
  //     pageIndex: page,
  //   }));
  // };

  const handleChangePrice = (e) => {
    const value = e.target.value;
    const [minPrice, maxPrice] = value.split(",").map(Number);
    let newPriceRange = [];
    if (e.target.checked) {
      newPriceRange = [minPrice, maxPrice];
    } else {
      newPriceRange = [0, 3000000];
    }
    setPrice(newPriceRange);
  };

  let count = filteredProductsCount;

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

                <Stack spacing={2} sx={{ mr: "auto", ml: "auto" }}>
                  <Pagination
                    count={Math.ceil(productsCount / resultPerPage)}
                    page={currentPage}
                    onChange={setCurrentPageNo}
                    variant="outlined"
                    color="secondary"
                  />
                </Stack>
              </Grid>
            </Grid>
          </Grid>

          {/* {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )} */}
        </Fragment>
      )}
    </Container>
  );
};

export default Products;
