import React, { useState } from 'react'
import { useFormik } from 'formik'
import { Form, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import Tilt from 'react-parallax-tilt';

import { auth_signup } from '../slices/auth.slice'
import banner from '../assets/removebg-preview.png'
import Swal from 'sweetalert2'

const Signup = () => {
  const navigate = useNavigate();
  const [signupMessage, setSignupMessage] = useState('');
  const initialFields = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
  }

  const validateFields = yup.object().shape({
    first_name: yup.string().required('Enter first name'),
    last_name: yup.string().required('Enter last name'),
    email: yup.string().email('not a valid email').required('Enter email'),
    password: yup.string().required('Enter password'),
    confirm_password: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
  });

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: initialFields,
    validationSchema: validateFields,
    onSubmit: (values) => {
      values.user_role = 1;
      auth_signup(values).then((response) => {
        if (response.status === 200) {
          setSignupMessage(response.data.message);
          if (response.data.status === 200) {
            Swal.fire({
              title: 'Success!',
              text: 'User has been created successfully',
              icon: 'success',
              timer: 2000,
            })
            setTimeout(() => {
              navigate('/');
            }, 2000);
          }
        }
      }).catch((err) => {
        console.log('err:- ', err);
      })
    }
  });

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100" style={{ alignItems: 'center' }}>
          <Tilt glareEnable={true} glareColor='purple' glareMaxOpacity={0.5} glareBorderRadius='150px'>
            <div className="login100-pic js-tilt" >
              <img src={banner} alt="IMG" />
            </div>
          </Tilt>
          <Form className="login100-form validate-form" onSubmit={handleSubmit}>
            <span className="login100-form-title">
              Sign up
            </span>
            <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
              <input
                style={{ width: '50% !important' }}
                autoComplete={'false'}
                className="input100"
                value={values.first_name}
                onChange={handleChange}
                type="text"
                name="first_name"
                placeholder="First Name"
              />
              <span className="focus-input100" />
              <span className="symbol-input100">
                <i className="fa fa-envelope" aria-hidden="true" />
              </span>
              {errors.first_name && <div className='text-danger' style={{ fontSize: '12px' }}>{errors.first_name}</div>}
            </div>
            <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
              <input
                className="input100"
                value={values.last_name}
                onChange={handleChange}
                type="text"
                name="last_name"
                placeholder="Last Name"
              />
              <span className="focus-input100" />
              <span className="symbol-input100">
                <i className="fa fa-envelope" aria-hidden="true" />
              </span>
              {errors.last_name && <div className='text-danger' style={{ fontSize: '12px' }}>{errors.last_name}</div>}
            </div>
            <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
              <input
                className="input100"
                value={values.email}
                onChange={handleChange}
                type="text"
                name="email"
                placeholder="Email"
              />
              <span className="focus-input100" />
              <span className="symbol-input100">
                <i className="fa fa-envelope" aria-hidden="true" />
              </span>
              {errors.email && <div className='text-danger' style={{ fontSize: '12px' }}>{errors.email}</div>}
            </div>
            <div className="wrap-input100 validate-input" data-validate="Password is required">
              <input
                className="input100"
                value={values.password}
                onChange={handleChange}
                type="password"
                name="password"
                placeholder="Password"
              />
              <span className="focus-input100" />
              <span className="symbol-input100">
                <i className="fa fa-lock" aria-hidden="true" />
              </span>
              {errors.password && <div className='text-danger' style={{ fontSize: '12px' }}>{errors.password}</div>}
            </div>
            <div className="wrap-input100 validate-input" data-validate="Password is required">
              <input
                className="input100"
                type="password"
                value={values.confirm_password}
                onChange={handleChange}
                name="confirm_password"
                placeholder="Confirm Password"
              />
              <span className="focus-input100" />
              <span className="symbol-input100">
                <i className="fa fa-lock" aria-hidden="true" />
              </span>
              {errors.confirm_password && <div className='text-danger' style={{ fontSize: '12px' }}>{errors.confirm_password}</div>}
            </div>
            {signupMessage && <div>{signupMessage}</div>}
            <div className="container-login100-form-btn">
              <Button className="login100-form-btn" type='submit'>
                Signup
              </Button>
            </div>
            {/* <div className="text-center p-t-12">
              <span className="txt1">
                Forgot
              </span>
              <a className="txt2" href="#">
                Username / Password?
              </a>
            </div> */}
            <div className="text-center p-t-136">
              <Link to={'/'}>
                Already have an account
                <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true" />
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Signup
