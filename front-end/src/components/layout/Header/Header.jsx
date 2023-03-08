import React, { useState } from "react";
import BoltIcon from "@mui/icons-material/Bolt";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  BoxAction,
  BoxLogo,
  BoxMenu,
  ItemAction,
  MenuItemCustom,
  Search,
  SearchIconWrapper,
  StyledInputBase,
  ToolbarBox,
} from "./HeaderStyle";
import ButtonCustom from "../../../container/ButtonCustom/ButtonCustom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";

const pages = [
  { title: "Home", link: "/" },
  {
    title: "Category",
    link: "/categories",
  },
  {
    title: "Product",
    link: "/products",
  },
  {
    title: "Contact",
    link: "/contact",
  },
];

function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElSearch, setAnchorElSearch] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenSearch = (event) => {
    setAnchorElSearch(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleCloseSearch = () => {
    setAnchorElSearch(null);
  };

  const options = [
    {
      icon: <ListAltIcon sx={{ color: "#ffd90c" }} />,
      name: "Orders",
      func: null,
      to: "/orders",
    },
    {
      icon: <AccountCircleIcon sx={{ color: "#ffd90c" }} />,
      name: "Profile",
      func: null,
      to: "/account",
    },
    {
      icon: <LogoutIcon sx={{ color: "#ffd90c" }} />,
      name: "Logout",
      func: logoutUser,
      to: "",
    },
  ];

  if (user?.role === "admin") {
    options.unshift({
      icon: <DashboardIcon sx={{ color: "#ffd90c" }} />,
      name: "Dashboard",
      func: null,
      to: "/admin/dashboard",
    });
  }

  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully!");
  }

  return (
    <AppBar position="static" sx={{ background: "#fff" }}>
      <Container maxWidth="xl">
        <ToolbarBox disableGutters>
          <BoxLogo sx={{ display: { xs: "none", md: "flex" } }}>
            <BoltIcon sx={{ fontSize: "50px", color: "#ffd90c" }} />
            <Typography
              variant="h4"
              noWrap
              component="a"
              href="/"
              sx={{
                color: "#000",
                fontWeight: 800,
                letterSpacing: "4px",
              }}
            >
              Elyte
            </Typography>
          </BoxLogo>

          <Search sx={{ display: { xs: "none", md: "flex" } }}>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: "#000" }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ background: "#000" }}
            >
              <MenuIcon sx={{ color: "#ffd90c" }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <BoxLogo sx={{ display: { xs: "flex", md: "none" } }}>
            <BoltIcon sx={{ fontSize: "50px", color: "#ffd90c" }} />
            <Typography
              variant="h4"
              noWrap
              component="a"
              href="/"
              sx={{
                color: "#000",
                fontWeight: 800,
                letterSpacing: "4px",
              }}
            >
              Elyte
            </Typography>
          </BoxLogo>

          <BoxAction>
            <IconButton
              onClick={handleOpenSearch}
              sx={{ display: { xs: "flex", md: "none" } }}
            >
              <SearchIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElSearch}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElSearch)}
              onClose={handleCloseSearch}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem sx={{ p: 0 }}>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon sx={{ color: "#000" }} />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
              </MenuItem>
            </Menu>
            <IconButton onClick={() => navigate("/cart")}>
              <Badge badgeContent={cartItems.length} color="info">
                <LocalMallOutlinedIcon />
              </Badge>
            </IconButton>
            {!isAuthenticated ? (
              <ButtonCustom color="#000">
                <Link to="/login" sx={{ color: "#000" }}>
                  Login
                </Link>
              </ButtonCustom>
            ) : (
              <>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {options.map((option, index) => (
                    <MenuItem key={index} onClick={handleCloseUserMenu}>
                      <Link to={option.to} onClick={option.func}>
                        <ItemAction textAlign="center">
                          {option.icon}
                          {option.name}
                        </ItemAction>
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </BoxAction>
        </ToolbarBox>
      </Container>
      <BoxMenu
        sx={{
          display: { xs: "none", md: "flex" },
        }}
      >
        {pages.map((page, index) => (
          <NavLink key={index} to={page.link}>
            <MenuItemCustom className="transition">{page.title}</MenuItemCustom>
          </NavLink>
        ))}
      </BoxMenu>
    </AppBar>
  );
}

export default Header;