import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import {
  BoxContact,
  BoxMenu,
  FooterCus,
  MenuItemFooter,
  BoxLogo,
} from "./FooterStyle";
import { NavLink } from "react-router-dom";

const pages = [
  { id: "1", title: "Home", link: "/" },
  {
    id: "3",
    title: "Product",
    link: "/products",
  },
  {
    id: "4",
    title: "Contact",
    link: "/contact",
  },
];

function Footer() {
  return (
    <FooterCus>
      <BoxLogo>
        <BoltIcon
          sx={{ fontSize: "50px !important", color: "#ffd90c !important" }}
        />
        <Typography
          variant="h4"
          noWrap
          component="a"
          href="/"
          sx={{
            color: "#fff",
            fontWeight: "800 !important",
            letterSpacing: "4px !important",
            "&:hover": {
              color: "#fff",
            },
          }}
        >
          Electronic Lyte
        </Typography>
      </BoxLogo>
      <BoxMenu
        sx={{
          display: { xs: "none", md: "flex" },
        }}
      >
        {pages.map((page) => (
          <NavLink key={page.id} to={page.link}>
            <MenuItemFooter>{page.title}</MenuItemFooter>
          </NavLink>
        ))}
      </BoxMenu>
      <BoxContact>
        <Typography>
          <IconButton sx={{ color: "#ffd90c" }}>
            <LocalPhoneIcon sx={{ fontSize: "30px" }} />
          </IconButton>
          0914360736
        </Typography>
        <Typography>
          <IconButton sx={{ color: "#ffd90c" }}>
            <EmailIcon sx={{ fontSize: "30px" }} />
          </IconButton>
          ElectronicLyte@gmail.com
        </Typography>
      </BoxContact>
      <Box>
        <IconButton sx={{ color: "#fff", mr: 1, ml: 1 }}>
          <FacebookIcon sx={{ fontSize: "30px" }} />
        </IconButton>
        <IconButton sx={{ color: "#fff", mr: 1, ml: 1 }}>
          <InstagramIcon sx={{ fontSize: "30px" }} />
        </IconButton>
        <IconButton sx={{ color: "#fff", mr: 1, ml: 1 }}>
          <LinkedInIcon sx={{ fontSize: "30px" }} />
        </IconButton>
        <IconButton sx={{ color: "#fff", mr: 1, ml: 1 }}>
          <TwitterIcon sx={{ fontSize: "30px" }} />
        </IconButton>
      </Box>
    </FooterCus>
  );
}

export default Footer;
