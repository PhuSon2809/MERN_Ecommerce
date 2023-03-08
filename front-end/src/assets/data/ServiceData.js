import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';

export const serviceData = [
  {
    id: "1",
    icon: <LocalShippingOutlinedIcon sx={{ fontSize: "60px" }}/>,
    name: "Free shipping",
    content: "Shipping in 5 days",
  },
  {
    id: "2",
    icon: <CreditScoreOutlinedIcon sx={{ fontSize: "60px" }}/>,
    name: "Money back",
    content: "Within 30 days",
  },
  {
    id: "3",
    icon: <HeadsetMicOutlinedIcon sx={{ fontSize: "60px" }}/>,
    name: "Customer support",
    content: "24X7 support",
  },
];
