import React, { Fragment, useEffect, useState } from "react";
import "./NewProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate } from "react-router-dom";
import { CategoryData } from "../../assets/data/CategoryData";

const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesReview] = useState([]);

  const categories = [
    "Food",
    "Treat",
    "Toy",
    "Collar",
    "Leash",
    "Cage",
    "Muzzle",
    "Backpack",
  ];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, alert, navigate, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesReview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesReview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="update-product-form"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1 className="title">Add new product</h1>

            <div className="update-product-control">
              <span className="update-product-label col-sm-3">Name</span>
              <input
                type="text"
                placeholder="Product Name"
                className="form-control col-sm-9"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="update-product-control">
              <span className="update-product-label col-sm-3">Price</span>
              <input
                type="number"
                placeholder="Price"
                className="form-control col-sm-9"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="update-product-control">
              <span className="update-product-label col-sm-3">Description</span>

              <textarea
                placeholder="Product Description"
                value={description}
                className="form-control col-sm-9"
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div className="update-product-control">
              <span className="update-product-label col-sm-3">Category</span>
              <select
                className="form-control col-sm-9"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Category</option>
                {CategoryData.map((cate) => (
                  <option key={cate.id} value={cate.name}>
                    {cate.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="update-product-control">
              <span className="update-product-label col-sm-3">Stock</span>
              <input
                type="number"
                className="form-control col-sm-9"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div
              id="createProductFormFile"
              className="update-product-control-file"
            >
              <input
                type="file"
                name="avatar"
                accept="image/*"
                className="form-control"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage" className="product-update-img">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <div className="update-btn">
              <Button
                id="createProductBtn"
                type="submit"
                disabled={loading ? true : false}
              >
                Create
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
