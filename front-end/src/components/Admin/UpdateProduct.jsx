import React, { Fragment, useEffect, useState } from "react";
import "./NewProduct.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  updateProduct,
} from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate, useParams } from "react-router-dom";
import { CategoryData } from "../../assets/data/CategoryData";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { id } = useParams();

  const { error, product } = useSelector((state) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
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
    if (product && product._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.Stock);
      setOldImages(product.images);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, navigate, product, id, error, alert, isUpdated, updateError]);

  const updateProductSubmitHandler = (e) => {
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
    dispatch(updateProduct(id, myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesReview([]);
    setOldImages([]);

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
      <MetaData title="Update Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            encType="multipart/form-data"
            className="update-product-form"
            onSubmit={updateProductSubmitHandler}
          >
            <h1 className="title">Update Product</h1>

            <div className="update-product-control">
              <span className="update-product-label col-sm-3">Name</span>
              <input
                type="text"
                placeholder="Product Name"
                required
                className="form-control col-sm-9"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="update-product-control">
              <span className="update-product-label col-sm-3">Price</span>
              <input
                type="number"
                placeholder="Price"
                required
                className="form-control col-sm-9"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
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
                value={category}
                className="form-control col-sm-9"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
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
                value={Stock}
              />
            </div>

            <div
              id="createProductFormFile"
              className="update-product-control-file"
            >
              <input
                type="file"
                name="avatar"
                // className="form-control"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>

            <div className="product-update-img-container">
              <p style={{marginLeft: "20px", marginRight: "60px", marginTop: "40px"}}>Image</p>

              <div id="createProductFormImage" className="product-update-img">
                {oldImages &&
                  oldImages.map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      alt="Old Product Preview"
                    />
                  ))}
              </div> 

              <div id="createProductFormImage" className={`${imagesPreview? "product-update-img" : ""}`}>
                {imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt="Product Preview" />
                ))}
              </div>
            </div>

            <div className="update-btn">
            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Update
            </Button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
