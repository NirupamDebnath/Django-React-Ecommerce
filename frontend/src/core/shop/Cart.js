import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {
  incrementProductCountInCart,
  decrementProductCountInCart,
  removeProductFromCart,
} from '../../actions';
import Layout from '../Layout';

const cart = ({
  cart,
  incrementProductCountInCart,
  decrementProductCountInCart,
  removeProductFromCart,
}) => {
  const populateProducts = () => {
    return Object.entries(cart).map(([id, product]) => {
      // console.log('called for each');
      // return <h1>Hello</h1>;

      return (
        <div className="row mb-4" key={id}>
          <div className="col-md-5 col-lg-3 col-xl-3">
            <div className="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
              <img
                className="img-fluid w-100"
                src={product.image}
                alt="Sample"
              />
            </div>
          </div>
          <div className="col-md-7 col-lg-9 col-xl-9">
            <div>
              <div className="d-flex justify-content-between">
                <div>
                  <h5>{product.title}</h5>
                </div>
                <div>
                  <div className="def-number-input number-input safari_only mb-0 w-100">
                    <button
                      onClick={() => decrementProductCountInCart(product)}
                    >
                      <i className="fa fa-minus" aria-hidden="true"></i>
                    </button>
                    <input
                      className="quantity"
                      min="0"
                      name="quantity"
                      readOnly
                      value={product.countInCart}
                      type="number"
                    />
                    <button
                      onClick={() => incrementProductCountInCart(product)}
                    >
                      <i className="fa fa-plus" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p
                    href="#"
                    type="button"
                    className="card-link-secondary small text-uppercase mr-3 remove-item"
                    onClick={() => removeProductFromCart(product)}
                  >
                    <i className="fas fa-trash-alt mr-1"></i> Remove item{' '}
                  </p>
                </div>
                <p className="mb-0">
                  <span>
                    <strong id="summary">Rs. {product.price}</strong>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <Layout>
      <h1 className="p-3 text-center">Cart</h1>
      {/* <!--Section: Block Content--> */}
      {/* <!--Section: Block Content--> */}
      <section>
        {/* <!--Grid row--> */}
        <div className="row">
          {/* <!--Grid column--> */}
          <div className="col-lg-8">
            {/* <!-- Card --> */}
            <div className="mb-3">
              <div className="pt-4 wish-list">
                <h5 className="mb-4">
                  Cart (<span>2</span> items)
                </h5>
                {populateProducts()}
              </div>
              <hr className="mb-4" />
              <p className="text-primary mb-0">
                <i className="fas fa-info-circle mr-1"></i> Do not delay the
                purchase, adding items to your cart does not mean booking them.
              </p>
            </div>
            {/* <!-- Card --> */}

            {/* <!-- Card --> */}
            {/* <div class="mb-3">
              <div class="pt-4">
                <h5 class="mb-4">Expected shipping delivery</h5>

                <p class="mb-0"> Thu., 12.03. - Mon., 16.03.</p>
              </div>
            </div> */}
            {/* <!-- Card --> */}
          </div>
          {/* <!--Grid column--> */}

          {/* <!--Grid column--> */}
          <div className="col-lg-4">
            {/* <!-- Card --> */}
            <div className="mb-3">
              <div className="pt-4">
                <h5 className="mb-3">The total amount of</h5>

                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Temporary amount
                    <span>$25.98</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Shipping
                    <span>Gratis</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>The total amount of</strong>
                      <strong>
                        <p className="mb-0">(including VAT)</p>
                      </strong>
                    </div>
                    <span>
                      <strong>$53.98</strong>
                    </span>
                  </li>
                </ul>

                <button type="button" className="btn btn-primary btn-block">
                  go to checkout
                </button>
              </div>
            </div>
            {/* <!-- Card --> */}

            {/* <!-- Card --> */}
            <div className="mb-3">
              <div className="pt-4">
                <a
                  className="dark-grey-text d-flex justify-content-between"
                  data-toggle="collapse"
                  href="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  Add a discount code (optional)
                  <span>
                    <i className="fas fa-chevron-down pt-1"></i>
                  </span>
                </a>

                <div className="collapse" id="collapseExample">
                  <div className="mt-3">
                    <div className="md-form md-outline mb-0">
                      <input
                        type="text"
                        id="discount-code"
                        className="form-control font-weight-light"
                        placeholder="Enter discount code"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Card --> */}
          </div>
          {/* <!--Grid column--> */}
        </div>
        {/* <!-- Grid row --> */}
      </section>
      {/* <!--Section: Block Content--> */}
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return { cart: state.cart };
};

export default connect(mapStateToProps, {
  incrementProductCountInCart,
  decrementProductCountInCart,
  removeProductFromCart,
})(cart);
