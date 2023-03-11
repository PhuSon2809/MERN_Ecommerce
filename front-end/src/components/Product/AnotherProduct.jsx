import React from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Title } from "./ProductStyle";
import ProductItem from "../../container/ProductItem/ProductItem";
import { Autoplay } from "swiper";

function AnotherProduct() {
  const { productsRandom } = useSelector((state) => state.productsRandom);

  return (
    <Box sx={{mt: 5}}>
      <Title variant="h5">ANOTHER PRODUCTS</Title>
      <Swiper
        slidesPerView={4}
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
          height: "fit-content",
        }}
      >
        {productsRandom &&
          productsRandom.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductItem product={product} />
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  );
}

export default AnotherProduct;
