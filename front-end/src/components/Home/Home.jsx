import StarIcon from "@mui/icons-material/Star";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Typography
} from "@mui/material";
import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { clearErrors, getProductRandom } from "../../actions/productAction";
import { CategoryData } from "../../assets/data/CategoryData";
import { serviceData } from "../../assets/data/ServiceData";
import ButtonCustom from "../../container/ButtonCustom/ButtonCustom";
import CategoryItem from "../../container/CategoryItem/CategoryItem";
import ProductItem from "../../container/ProductItem/ProductItem";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import Carousel from "./Carousel/Carousel";
import {
  BoxContent,
  BoxPr,
  BoxService,
  BoxUser,
  ContentUser,
  DateTime,
  NameUser,
  Title
} from "./HomeStyle";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, productsRandom } = useSelector(
    (state) => state.productsRandom
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductRandom());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Electronic Lyte" />
          <Container>
            <Carousel />
            <Grid container sx={{ mb: 4 }}>
              <Grid item md={3}>
                <BoxPr>
                  <img
                    src="https://cdn.shopify.com/s/files/1/0549/6851/6852/files/Banner.jpg?v=1647230535"
                    alt="PR"
                  />

                  <Title>CUSTOMER LOVE</Title>

                  <BoxUser>
                    <img
                      alt="user"
                      src="https://cdn.shopify.com/s/files/1/0549/6851/6852/files/3_75x75_crop_center.jpg?v=1632567537"
                      width="100px"
                      height="100px"
                      style={{ borderRadius: "99px" }}
                    />

                    <NameUser>Tony Stark</NameUser>
                    <Box sx={{ color: "#ffd90c" }}>
                      <StarIcon fontSize="small" />
                      <StarIcon fontSize="small" />
                      <StarIcon fontSize="small" />
                      <StarIcon fontSize="small" />
                      <StarIcon fontSize="small" />
                    </Box>
                    <ContentUser>
                      Make a type specimen book. It has survived not only five
                      leap, but also the centuries into elt was make a. Make a
                      type specimen book.
                    </ContentUser>
                    <DateTime>Sept 15, 2022</DateTime>
                  </BoxUser>

                  <img
                    src="https://cdn.shopify.com/s/files/1/0549/6851/6852/files/Banner-1.jpg?v=1647230535"
                    alt="PR"
                  />
                </BoxPr>
              </Grid>
              <Grid item md={9} sx={{ pl: 3 }}>
                <Box>
                  <Title>SHOP CATEGORIES</Title>
                  <Swiper
                    slidesPerView={5}
                    spaceBetween={30}
                    autoplay={{
                      delay: 5000,
                      disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    className="mySwiper"
                    style={{
                      marginTop: "20px",
                      marginBottom: "20px",
                      height: "200px",
                    }}
                  >
                    {CategoryData.map((category) => (
                      <SwiperSlide key={category.id}>
                        <CategoryItem category={category} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Box>
                <Box>
                  <Title>OWN PRODUCTS</Title>
                  <Grid container sx={{ mt: 5 }}>
                    {productsRandom &&
                      productsRandom.map((product) => (
                        <Grid item md={4} key={product._id}>
                          <ProductItem product={product} />
                        </Grid>
                      ))}
                  </Grid>
                </Box>
                <Link to="/products">
                  <ButtonCustom color="#000" width="100%">
                    See More
                  </ButtonCustom>
                </Link>

                <Box sx={{ mt: 5 }}>
                  <Grid container>
                    {serviceData.map((service) => (
                      <Grid key={service.id} item md={4}>
                        <BoxService>
                          <IconButton sx={{ color: "#ffd90c" }}>
                            {service.icon}
                          </IconButton>
                          <BoxContent>
                            <Typography
                              sx={{ fontWeight: "500", letterSpacing: "1px" }}
                            >
                              {service.name}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                color: "#a6a6a7",
                                letterSpacing: "1px",
                              }}
                            >
                              {service.content}
                            </Typography>
                          </BoxContent>
                        </BoxService>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
