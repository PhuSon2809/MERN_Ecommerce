import React, { useEffect, useState } from "react";
import BalconyIcon from "@mui/icons-material/Balcony";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PhoneIcon from "@mui/icons-material/Phone";
import PublicIcon from "@mui/icons-material/Public";
import { Box, Breadcrumbs, Container, Grid, Typography } from "@mui/material";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../../actions/cartAction";
import {
  apiGetPublicDistrict,
  apiGetPublicProvinces,
} from "../../services/provinces";
import MetaData from "../layout/MetaData";
import CartItemAcep from "./CartItemAcep";
import {
  BoxCartItems,
  BoxPrice,
  ButtonCustom,
  FormInput,
  IconWrapper,
  InputWrapper,
  StyledBreadcrumb,
  StyledBreadcrumbActive,
  StyledInputBase,
  TitleCart,
} from "./CartStyle";
import SelectAddress from "./SelectAddress";

function formatCurrency(currency) {
  return currency.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
}

const Shipping = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const [address, setAddress] = useState(shippingInfo.address);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [districtName, setDistrictName] = useState(shippingInfo.districtName);
  const [provinceName, setProvinceName] = useState(shippingInfo.provinceName);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    const fetchPublicProvince = async () => {
      const response = await apiGetPublicProvinces();
      if (response.status === 200) {
        setProvinces(response?.data.results);
      }
    };
    fetchPublicProvince();
  }, []);

  useEffect(() => {
    setDistrict(null);
    const fetchPublicDistrict = async () => {
      const response = await apiGetPublicDistrict(province);
      if (response.status === 200) {
        setDistricts(response.data?.results);
      }
    };
    province && fetchPublicDistrict();
    !province ? setReset(true) : setReset(false);
    !province && setDistricts([]);
  }, [province]);

  useEffect(() => {
    setProvinceName(
      province
        ? provinces?.find((item) => item.province_id === province)
            ?.province_name
        : ""
    );
    setDistrictName(
      district
        ? districts?.find((item) => item.district_id === district)
            ?.district_name
        : ""
    );
  }, [province, district]);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Phone Number should be 10 digit");
      return;
    }

    dispatch(
      saveShippingInfo({
        phoneNo,
        address,
        province,
        district,
        districtName,
        provinceName,
      })
    );
    navigate("/order/confirm");
  };

  return (
    <Container sx={{ mt: 10, mb: 10 }}>
      <MetaData title="Information" />
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ mb: 5 }}
      >
        <StyledBreadcrumbActive label="Information" />
        <StyledBreadcrumb label="Confirm order" />
        <StyledBreadcrumb label="Payment" />
      </Breadcrumbs>
      <Grid container>
        <Grid item md={7}>
          <Box sx={{ pr: 5 }}>
            <TitleCart variant="h4" sx={{ mb: 3 }}>
              Shipping address
            </TitleCart>
            <form
              className="shippingForm"
              encType="multipart/form-data"
              onSubmit={shippingSubmit}
            >
              <FormInput fullWidth sx={{ mb: 3 }}>
                <label style={{ fontWeight: "600" }}>Phone Number</label>
                <InputWrapper>
                  <IconWrapper>
                    <PhoneIcon sx={{ color: "#000" }} />
                  </IconWrapper>
                  <StyledInputBase
                    fullWidth
                    placeholder="Phone Number"
                    type="number"
                    required
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                  />
                </InputWrapper>
              </FormInput>

              <FormInput fullWidth sx={{ mb: 3 }}>
                <label style={{ fontWeight: "600" }}>Address</label>
                <InputWrapper>
                  <IconWrapper>
                    <HomeIcon sx={{ color: "#000" }} />
                  </IconWrapper>
                  <StyledInputBase
                    fullWidth
                    placeholder="Your address"
                    type="text"
                    value={address}
                    required
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </InputWrapper>
              </FormInput>

              <SelectAddress
                type="province"
                value={province}
                setValue={setProvince}
                options={provinces}
                label="Province/City"
                icon={<PublicIcon sx={{ color: "#000" }} />}
              />

              {province && (
                <SelectAddress
                  reset={reset}
                  type="district"
                  value={district}
                  setValue={setDistrict}
                  options={districts}
                  label="District"
                  icon={<BalconyIcon sx={{ color: "#000" }} />}
                />
              )}

              <ButtonCustom
                fullWidth
                type="submit"
                disabled={districtName ? false : true}
              >
                Continue
              </ButtonCustom>
            </form>
          </Box>
        </Grid>
        <Grid item md={5}>
          <BoxCartItems>
            {cartItems &&
              cartItems.map((item) => (
                <CartItemAcep key={item.product} cartItem={item} />
              ))}
          </BoxCartItems>
          <BoxPrice>
            <Typography variant="h6">Subtotal:</Typography>
            <Typography>{formatCurrency(subtotal)}</Typography>
          </BoxPrice>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Shipping;
