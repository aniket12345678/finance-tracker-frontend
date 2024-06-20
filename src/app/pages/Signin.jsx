import React, { useState } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import secureLocalStorage from "react-secure-storage";

import '../style/auth/auth.css'
import { auth_signin } from '../slices/auth.slice'
import banner from '../assets/removebg-preview.png'
import Tilt from 'react-parallax-tilt';

const Signin = () => {
    const navigate = useNavigate();
    const [loggedInMessage, setLoggedInMessage] = useState('');
    const initialFields = {
        email: '',
        password: '',
    };

    const validateFields = yup.object().shape({
        email: yup.string().email('not a valid email').required('Enter email'),
        password: yup.string().required('Enter password'),
    });

    const { values, handleChange, handleSubmit, errors } = useFormik({
        initialValues: initialFields,
        validationSchema: validateFields,
        onSubmit: (values) => {
            auth_signin(values).then((response) => {
                if (response.status === 200) {
                    setLoggedInMessage(response.data.message);
                    if (response.data.status === 200) {
                        secureLocalStorage.setItem('user_id', response.data.user_data);
                        setTimeout(() => {
                            navigate('/finance-records')
                        }, 2000);
                    }
                }
            }).catch((err) => {
                console.log('err:- ', err);
            });
        }
    });

    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100">
                    <Tilt glareEnable={true} glareColor='purple' glareMaxOpacity={0.5} glareBorderRadius='150px'>
                        <div className="login100-pic js-tilt" >
                            <img src={banner} alt="IMG" />
                        </div>
                    </Tilt>
                    <Form className="login100-form validate-form" onSubmit={handleSubmit}>
                        <span className="login100-form-title">
                            Sign in
                        </span>
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
                        {loggedInMessage && <div>{loggedInMessage}</div>}
                        <div className="container-login100-form-btn">
                            <Button className="login100-form-btn" type='submit'>
                                Sign in
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
                            <Link to={'/signup'}>
                                Create your Account
                                <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true" />
                            </Link>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Signin
