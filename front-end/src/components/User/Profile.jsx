import React, { Fragment, useEffect } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import {
  BoxAction,
  BoxAvatar,
  BoxInfor,
  BoxLeft,
  ItemAction,
} from "./userStyle";

const options = [
  {
    icon: <BorderColorIcon sx={{ color: "#ffd90c" }} />,
    name: "Edit profile",
    to: "",
  },
  {
    icon: <ChangeCircleIcon sx={{ color: "#ffd90c" }} />,
    name: "Change password",
    to: "/password/update",
  },
  {
    icon: <FormatListBulletedIcon sx={{ color: "#ffd90c" }} />,
    name: "My Orders",
    to: "/orders",
  },
];

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <MetaData title={`User Profile`} />
          <Grid container sx={{ mt: 10, mb: 10 }}>
            <Grid item md={2}>
              <BoxLeft>
                <BoxAvatar>
                  <img
                    src={user.avatar?.url ? user.avatar.url : ""}
                    alt={user.name}
                    width="50px"
                  />
                  <Box>
                    <Typography sx={{ fontSize: "17px", fontWeight: "600" }}>
                      {user.name}
                    </Typography>
                    <Typography sx={{ fontSize: "15px", color: "#aeaeae" }}>
                      About profile
                    </Typography>
                  </Box>
                </BoxAvatar>
                <BoxAction>
                  {options.map((option, index) => (
                    <Link
                      className="transition"
                      key={index}
                      to={option.to}
                      width="100%"
                    >
                      <ItemAction className="transition" textAlign="center">
                        {option.icon}
                        {option.name}
                      </ItemAction>
                    </Link>
                  ))}
                </BoxAction>
              </BoxLeft>
            </Grid>
            <Grid item md={10}>
              <BoxInfor>
                <Grid container>
                  <Grid item md={5}>
                    <Box width="100%">
                      <img
                        src={user.avatar?.url ? user.avatar.url : ""}
                        alt={user.name}
                        width="50%"
                      />
                    </Box>
                  </Grid>
                  <Grid item md={7}>
                    <div>
                      <div>
                        <h4>Full Name</h4>
                        <p>{user.name}</p>
                      </div>
                      <div>
                        <h4>Email</h4>
                        <p>{user.email}</p>
                      </div>
                      <div>
                        <h4>Joined On</h4>
                        <p>{String(user.createdAt).substring(0, 10)}</p>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </BoxInfor>
            </Grid>
          </Grid>
        </Container>
      )}
    </Fragment>
  );
};

export default Profile;
