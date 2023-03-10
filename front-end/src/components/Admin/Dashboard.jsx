import React, { Fragment, useEffect } from "react";
import Sidebar from "./Sidebar";
import "./Dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { Chart } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction";
import { getAllUsers } from "../../actions/userAction";
import { getAdminPet } from "../../actions/petAction";
import MetaData from "../layout/MetaData";
import Welcome from "./Welcome/Welcome";
import Tag from "./Tag/Tag";
ChartJS.register(...registerables);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);
  const { pets } = useSelector((state) => state.pets);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
    dispatch(getAdminPet());
  }, [dispatch]);

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <Fragment>
      <MetaData title="Dashboard Admin" />
      <div className="dashboard">
        <Sidebar />
        <div className="dashboardContainer">
          <Welcome />
          <div className="dashboardSummary">
            <div className="dashboardSummaryBox2">
              <Link to="/admin/products">
                <Tag label={"Product"} color={'primary'} value={products && products.length} />
              </Link>
              <Link to="/admin/orders">
                <Tag label={"Orders"} color={'warning'} value={orders && orders.length} />
              </Link>
              <Link to="/admin/users">
                <Tag label={"Users"} color={'info'} value={users && users.length} />
              </Link>
              <a>
              <Tag label={'Total Amount'} color={'danger'} value={totalAmount}/>
              </a>
            </div>
          </div>

          <div className="dashboard-chart">
            <div className="doughnutChart">
              <p style={{marginBottom: '60px', marginTop: '20px'}}>Chart something</p>
              <Doughnut data={doughnutState} />
            </div>

            <div className="lineChart">
            <p>Chart something</p>
              <Line data={lineState} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
