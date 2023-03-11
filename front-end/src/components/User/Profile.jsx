import React, { Fragment, useEffect } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import { useModal } from "../../hooks/useModal";
import {
  BoxAction,
  BoxAvatar,
  BoxInfor,
  BoxInforDetail,
  BoxLeft,
  ItemAction,
  ItemInfor,
  Title,
} from "./userStyle";
import ModalUpdateProfile from "./ModalUpdateProfile";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstant";
import { clearErrors, loadUser } from "../../actions/userAction";
import { useAlert } from "react-alert";

const options = [
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
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toogleOpen, isOpen } = useModal();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const { error, isUpdated, loading: upadteLoading } = useSelector((state) => state.profile);


  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully!");
      dispatch(loadUser());
      // navigate("/account");
   
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, navigate, user, isUpdated]);

  return (
    <Fragment>
      {upadteLoading && loading ? (
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
                  <ItemAction
                    onClick={toogleOpen}
                    className="transition"
                    textAlign="center"
                  >
                    <BorderColorIcon sx={{ color: "#ffd90c" }} />
                    Edit profile
                  </ItemAction>
                  {options.map((option, index) => (
                    <Link key={index} to={option.to} width="100%">
                      <ItemAction className="transition" textAlign="center">
                        {option.icon}
                        {option.name}
                      </ItemAction>
                    </Link>
                  ))}

                  {isOpen && (
                    <ModalUpdateProfile
                      toogleOpen={toogleOpen}
                      isOpen={isOpen}
                    />
                  )}
                </BoxAction>
              </BoxLeft>
            </Grid>
            <Grid item md={10}>
              <BoxInfor>
                <Grid container>
                  <Grid item md={5}>
                    <Box
                      width="100%"
                      height="100%"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={user.avatar?.url ? user.avatar.url : ""}
                        alt={user.name}
                        width="50%"
                      />
                    </Box>
                  </Grid>
                  <Grid item md={7}>
                    <BoxInforDetail>
                      <ItemInfor>
                        <Title>Name:</Title>
                        <Typography>{user.name}</Typography>
                      </ItemInfor>
                      <ItemInfor>
                        <Title>Email:</Title>
                        <Typography>{user.email}</Typography>
                      </ItemInfor>
                      <ItemInfor>
                        <Title>Address:</Title>
                        <Typography>
                          {user.address ? user.address : "..."}
                        </Typography>
                      </ItemInfor>
                      <ItemInfor>
                        <Title>Phone:</Title>
                        <Typography>
                          {user.phone ? user.phone : "..."}
                        </Typography>
                      </ItemInfor>
                    </BoxInforDetail>
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
