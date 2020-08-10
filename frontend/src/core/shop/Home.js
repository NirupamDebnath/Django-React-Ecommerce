import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { connect } from 'react-redux';

import {
  isAuth,
  getCookie,
  signout,
  updateUserInfo,
  getLocalStorage,
} from '../../auth/helper';
import { addProductToCart } from '../../actions';

const Home = ({ history, cart, addProductToCart }) => {
  const [values, setValues] = useState({
    categories: [],
  });
  const [productsData, setProductsData] = useState(null);

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, []);

  const { categories } = values;

  const getButtonName = (id) => {
    if (id in cart) {
      return 'Remove from cart';
    }
    return 'Add to Cart';
  };

  const loadCategories = () => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_BACKEND_ECOMMERCE}/categories/`,
    })
      .then((response) => {
        const categories = _.cloneDeep(response.data.results);
        setValues({ ...values, categories });
      })
      .catch((error) => {
        if (error.response) {
          const data = error.response.data;
        } else {
          toast.error('Can not connect to server. Probably you are offline');
        }
      });
  };

  const loadProducts = () => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_BACKEND_ECOMMERCE}/products/`,
    })
      .then((response) => {
        const productsData = _.cloneDeep(response.data);
        setProductsData(productsData);
      })
      .catch((error) => {
        if (error.response) {
          const data = error.response.data;
        } else {
          toast.error('Can not connect to server. Probably you are offline');
        }
      });
  };

  const populateCategories = () => {
    return categories.map((category) => (
      <li className="nav-item" key={category.id}>
        <a className="nav-link" href="#">
          {category.title}
        </a>
      </li>
    ));
  };
  const populateProducts = () => {
    if (productsData) {
      return (
        <div className="row wow fadeIn">
          {productsData.results.map((product) => (
            <div className="col-lg-3 col-md-6 mb-4" key={product.id}>
              <div className="card">
                <div className="view overlay">
                  <img src={product.image} className="card-img-top" alt="" />
                  <a>
                    <div className="mask rgba-white-slight"></div>
                  </a>
                </div>

                <div className="card-body text-center">
                  {/* <a href="" class="grey-text">
                    <h5>Shirt</h5>
                  </a> */}
                  <h5>
                    <strong>
                      <Link to="#" className="dark-grey-text">
                        {product.title}
                        {/* <span class="badge badge-pill danger-color">NEW</span> */}
                      </Link>
                    </strong>
                  </h5>

                  <h4 className="font-weight-bold blue-text">
                    <strong>Rs. {product.price}</strong>
                  </h4>
                  <button
                    onClick={() => {
                      addProductToCart(product);
                    }}
                  >
                    {getButtonName(product.id)}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div>
      <ToastContainer />
      <nav className="navbar navbar-expand-lg filter-navbar mt-3 mb-5">
        <span className="navbar-brand">Categories:</span>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#basicExampleNav"
          aria-controls="basicExampleNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="basicExampleNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                All
                <span className="sr-only">(current)</span>
              </a>
            </li>
            {populateCategories()}
          </ul>

          <form className="form-inline">
            <div className="md-form my-0">
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="Search"
                aria-label="Search"
              />
            </div>
          </form>
        </div>
      </nav>
      {/* Products section */}
      <section className="text-center mb-4">{populateProducts()}</section>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { cart: state.cart };
};

export default connect(mapStateToProps, { addProductToCart })(Home);
