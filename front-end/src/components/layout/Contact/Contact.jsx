import React from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box, Container, Grid, IconButton, Typography } from "@mui/material";
import ButtonCustom from "../../../container/ButtonCustom/ButtonCustom";
import MetaData from "../MetaData";
import {
  BoxContactItem,
  BoxTitle,
  InputCustom,
  TitlePage
} from "./ContactStyle";

const Contact = () => {
  return (
    <Container sx={{ mt: 10, mb: 10 }}>
      <MetaData title="Contact" />
      <BoxTitle>
        <TitlePage variant="h3">GET IN TOUCH</TitlePage>
        <Typography sx={{ color: "#000" }}>
          If you’ve got great products your making or looking to work with us
          then drop us a line
        </Typography>
      </BoxTitle>

      <Grid container sx={{ mt: 5, mb: 10 }}>
        <Grid item md={4}>
          <BoxContactItem>
            <IconButton
              className="transition2"
              sx={{
                background: "#000",
                "&:hover": {
                  background: "#000",
                },
              }}
            >
              <LocationOnIcon sx={{ fontSize: "45px", color: "#ffd90c" }} />
            </IconButton>
            <Typography>
              Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành
              phố Hồ Chí Minh 700000
            </Typography>
          </BoxContactItem>
        </Grid>
        <Grid item md={4}>
          <BoxContactItem>
            <IconButton
              className="transition2"
              sx={{
                background: "#000",
                "&:hover": {
                  background: "#000",
                },
              }}
            >
              <LocalPhoneIcon sx={{ fontSize: "45px", color: "#ffd90c" }} />
            </IconButton>
            <Typography>(+33) 1 23 45 67 89</Typography>
          </BoxContactItem>
        </Grid>
        <Grid item md={4}>
          <BoxContactItem>
            <IconButton
              className="transition2"
              sx={{
                background: "#000",
                "&:hover": {
                  background: "#000",
                },
              }}
            >
              <LocationOnIcon sx={{ fontSize: "45px", color: "#ffd90c" }} />
            </IconButton>
            <Box>
              <Typography sx={{ mb: 1 }}>support@lyte.com</Typography>
              <Typography>electronic@lyte.com</Typography>
            </Box>
          </BoxContactItem>
        </Grid>
      </Grid>

      <Box sx={{ mb: 8 }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.6099414916575!2d106.8076943149421!3d10.841132860960094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgVFAuIEhDTQ!5e0!3m2!1svi!2s!4v1655576097587!5m2!1svi!2s"
          width="100%"
          height="450"
          styles={{ border: "0" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Box>

      <BoxTitle>
        <TitlePage variant="h3">DROP US MESSAGE</TitlePage>
        <Typography sx={{ color: "#000" }}>
          If you’ve got great products your making or looking to work with us
          then drop us a line
        </Typography>
      </BoxTitle>

      <form>
        <Grid container>
          <Grid item md={6} sx={{pr: 2}}>
            <Typography>Name</Typography>
            <InputCustom placeholder="Name"/>
          </Grid>
          <Grid item md={6} sx={{pl: 2}}>
            <Typography>Email</Typography>
            <InputCustom placeholder="Email" />
          </Grid>
        </Grid>
        <Box sx={{ mt: 3 }}>
          <Typography>Phone number</Typography>
          <InputCustom placeholder="Phone number" />
        </Box>
        <Box sx={{ mt: 3, mb: 3 }}>
          <Typography>Message</Typography>
          <InputCustom multiline minRows={5} placeholder="Message" />
        </Box>
        <ButtonCustom width="100%" color="#000" type="submit">
          Send Message
        </ButtonCustom>
      </form>
    </Container>
  );
};

export default Contact;
