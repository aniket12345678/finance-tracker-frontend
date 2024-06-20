import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Modal, Button, Form, Col, Row, Dropdown } from 'react-bootstrap'
import * as yup from "yup";
import moment from 'moment'
import { financeRecord_add } from '../slices/financeRecord.slice';
import secureLocalStorage from "react-secure-storage";

const AddModal = ({ show, changeModalState, fetchAll, toastMessage }) => {
    const allTypes = [{ type: 'Expense', value: 0 }, { type: 'Income', value: 1 }];
    const validateFields = yup.object().shape({
        description: yup.string().required('Description is required'),
        amount: yup.number().positive('Amount cannot be negative').required('Amount is required'),
        record_date: yup.string().required('Date is required'),
        record_type: yup.number().required('Type is required'),
    });

    const {
        values,
        errors,
        resetForm,
        handleChange,
        handleSubmit,
        setFieldValue
    } = useFormik({
        initialValues: {
            amount: '',
            description: '',
            record_date: moment().format('YYYY-MM-DD'),
            record_type: ''
        },
        validationSchema: validateFields,
        onSubmit: (values) => {
            values.user_id = secureLocalStorage.getItem('user_id');
            financeRecord_add(values).then((response) => {
                if (response.status === 200) {
                    toastMessage('success', 'Data added successfully')
                    hideModal();
                    fetchAll();
                }
                console.log('response:- ', response);
            }).catch((err) => {
                console.log('err:- ', err);
            })
        }
    });

    const [financeType, setFinanceType] = useState({});

    const changeFinanceType = (data) => {
        setFieldValue('record_type', data.value);
        setFinanceType(data);
    }

    const hideModal = () => {
        resetForm();
        changeModalState(false);
    }

    return (
        <Modal
            show={show}
            onHide={() => hideModal()}
            backdrop="static"
            keyboard={false}
        >
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Finance Record</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" className='mb-3' controlId="validationCustom01">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="ex: Home Loan"
                                name='description'
                                value={values.description}
                                onChange={handleChange}
                            />
                            {
                                errors.description &&
                                <div className='text-danger' style={{ fontSize: '12px' }}>
                                    {errors.description}
                                </div>
                            }
                        </Form.Group>
                        <Form.Group as={Col} md="6" className='mb-3' controlId="validationCustom01">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type='date'
                                name='record_date'
                                onChange={handleChange}
                                value={values.record_date}
                            />
                            {
                                errors.record_date &&
                                <div className='text-danger' style={{ fontSize: '12px' }}>
                                    {errors.record_date}
                                </div>
                            }
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} md="6" className='mb-3' controlId="validationCustom02">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder="e.x: 5000"
                                name='amount'
                                value={values.amount}
                                onChange={handleChange}
                                min={1}
                            />
                            {
                                errors.amount &&
                                <div className='text-danger' style={{ fontSize: '12px' }}>
                                    {errors.amount}
                                </div>
                            }
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustomUsername">
                            <Form.Label>Type</Form.Label>
                            <Dropdown>
                                <Dropdown.Toggle
                                    variant="light"
                                    className='w-100 border-black'
                                    id="dropdown-basic"
                                >
                                    {Object.keys(financeType).length > 0 ? financeType.type : 'Select type'}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        allTypes.map(({ type, value }) => {
                                            return (
                                                <Dropdown.Item
                                                    key={`${type}-${value}`}
                                                    onClick={() => changeFinanceType({ type, value })}
                                                >
                                                    {type}
                                                </Dropdown.Item>
                                            )
                                        })
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                            {
                                errors.record_type &&
                                <div className='text-danger' style={{ fontSize: '12px' }}>
                                    {errors.record_type}
                                </div>
                            }
                        </Form.Group>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type='submit'>Save</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddModal
