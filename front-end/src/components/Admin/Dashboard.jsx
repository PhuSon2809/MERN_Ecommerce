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
import MetaData from "../layout/MetaData";
import Welcome from "./Welcome/Welcome";
import Tag from "./Tag/Tag";
ChartJS.register(...registerables);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

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
  }, [dispatch]);

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(209, 206, 17)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ["#ff0000", "#0d6efd"],
        hoverBackgroundColor: ["#f73e3e", "#3e86f3"],
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
              <p style={{marginBottom: '40px', marginTop: '20px'}}>Stock chart</p>
              <Doughnut data={doughnutState} />
            </div>

            <div className="lineChart">
            <p>Amount Chart</p>
              <Line data={lineState} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
