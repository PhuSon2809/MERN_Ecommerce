import { Rating } from "@material-ui/lab";
import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { BoxContentRe, BoxReview } from "./ProductStyle";

const ReviewCard = ({ review }) => {
  const { user } = useSelector((state) => state.user);
  const options = {
    readOnly: true,
    value: review.rating,
    precision: 0.5,
  };

  return (
    <BoxReview className="reviewCard">
      <img
        src={user?.avatar?.url}
        alt={user?.name}
        width="90px"
        height="80px"
        style={{ borderRadius: "99px", border: "1px solid #ffd90c" }}
      />
      <Box sx={{ width: "100%" }}>
        <Typography variant="h6">{review.name}</Typography>
        <BoxContentRe>
          <Rating {...options} />
          <Typography>{review.comment}</Typography>
        </BoxContentRe>
      </Box>
    </BoxReview>
  );
};

export default ReviewCard;
