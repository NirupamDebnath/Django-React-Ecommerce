import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import Layout from '../core/Layout';
import { setAuthenticattionInfo, isAuth } from './helper';
import Google from './Google';
import Facebook from './Facebook';

const Signin = ({ history }) => {
  const [values, setValues] = useState({
    email: 'root@root.com',
    password: 'root',
    buttonText: 'Submit',
  });

  const { email, password, buttonText } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const informParent = (response) => {
    setAuthenticattionInfo(response, () => {
      history.push('/');
    });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: 'Submitting' });
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_BACKEND_API}/signin/`,
      data: { email, password },
    })
      .then((response) => {
        setAuthenticattionInfo(response, () => {
          setValues({ ...values, name: '', email: '', buttonText: 'Submit' });
          const data = response.data;
          toast.success(`Hey ${response.data.user.name}, wecome back.`);
          // setTimeout(() => {
          history.push('/');
          // }, 3000);
        });
      })
      .catch((error) => {
        // console.log(error);
        setValues({ ...values, buttonText: 'Submit' });
        if (error.response) {
          const data = error.response.data;
          toast.error(String(data[Object.keys(data)[0]]));
        } else {
          toast.error('Can not connect to server. Probably you are offline');
        }
      });
  };

  const signinForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange('email')}
          value={email}
          type="email"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange('password')}
          value={password}
          type="password"
          className="form-control"
        />
      </div>
      <div>
        <button
          className="btn btn-block primary-btn-style"
          onClick={clickSubmit}
        >
          {buttonText}
        </button>
      </div>
    </form>
  );

  return (
    <Layout>
      {/* {JSON.stringify(isAuth())} */}
      {isAuth() ? <Redirect to="/" /> : null}
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        {/* {JSON.stringify({name,email})} */}
        <h1 className="p-3 text-center">Signin</h1>
        {signinForm()}
        <div className="mb-2" />
        <Google informParent={informParent} />
        <Facebook informParent={informParent} />
        <Link
          to="/forgot-password"
          className="text-center d-block contrast-color"
        >
          Forgot Password?
        </Link>
      </div>
    </Layout>
  );
};

export default Signin;
