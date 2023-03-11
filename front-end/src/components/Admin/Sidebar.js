import React from "react";
import "./Sidebar.css";
import logo from "../../images/Logo.png";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import PetsIcon from "@mui/icons-material/Pets";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";

const Sidebar = () => {
  return (
    <ul className="sidebar">
      <Link to="/admin/dashboard">
        <li className="dashboard-item">
          <span className="dashboard-item__icon">
            <DashboardIcon />
          </span>
          Dashboard
        </li>
      </Link>
      <Link to="">
        <li className="dashboard-item">
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ImportExportIcon />}
          >
            <TreeItem nodeId="1" label="Products">
              <Link to="/admin/products">
                <TreeItem nodeId="2" label="List" icon={<PostAddIcon />} />
              </Link>
              <Link to="/admin/product">
                <TreeItem nodeId="3" label="Add new" icon={<AddIcon />} />
              </Link>
            </TreeItem>
          </TreeView>
        </li>
      </Link>
      <Link to="/admin/orders">
        <li className="dashboard-item">
          <span className="dashboard-item__icon">
            <ListAltIcon />
          </span>
          Orders
        </li>
      </Link>
      <Link to="/admin/users">
        <li className="dashboard-item">
          <span className="dashboard-item__icon">
            <PeopleIcon />
          </span>
          Users
        </li>
      </Link>
      {/* <Link to="/admin/reviews">
        <li className="dashboard-item">
          <span className="dashboard-item__icon">
            <RateReviewIcon />
          </span>
          Reviews
        </li>
      </Link> */}
    </ul>
  );
};

export default Sidebar;
