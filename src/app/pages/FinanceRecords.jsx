import React, { useEffect, useState } from 'react'
import { Table, Button } from 'react-bootstrap'
import secureLocalStorage from 'react-secure-storage'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'

import '../style/App.css'
import Header from '../components/Header'
import AddModal from '../components/AddModal'
import { financeRecord_fetchAll, financeRecord_record_delete } from '../slices/financeRecord.slice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'

const FinanceRecords = () => {
    const [modalShow, setModalShow] = useState(false);
    const [financeData, setFinanceData] = useState({ data: [], balance: 0 });
    const changeModalState = (params) => {
        setModalShow(params);
    }
    function fetchAll() {
        financeRecord_fetchAll({ user_id: secureLocalStorage.getItem('user_id') }).then((response) => {
            if (response.status === 200) {
                setFinanceData({ data: response.data.data, balance: response.data.total_balance });
            }
        }).catch((err) => {
            console.log('err:- ', err);
        })
    };

    useEffect(() => {
        if (secureLocalStorage.getItem('user_id')) {
            fetchAll();
        }
    }, []);

    function deleteEntry(data) {

        Swal.fire({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    // Swal.fire("Poof! Your imaginary file has been deleted!", {
                    //     icon: "success",
                    // });
                    financeRecord_record_delete({ id: data }).then((response) => {
                        if (response.status === 200) {
                            toastMessage('success', 'Data deleted successfully')
                            fetchAll();
                        }
                    }).catch((err) => {
                        console.log('err:- ', err);
                    })
                } else {
                    Swal.fire("Your imaginary file is safe!");
                }
            });


    }
    console.log('financeData:- ', financeData);
    function toastMessage(type, message) {
        toast[type](message, { autoClose: 2000 });
    }

    return (
        <div className='finance-record-main'>
            <ToastContainer />
            <Header />
            <h2 style={{ textAlign: 'center', color: 'whitesmoke' }} className='mt-5'>
                <strong>Welcome back</strong>
            </h2>
            <div className='finance-table'>
                <div className='mb-3 d-flex justify-content-between align-items-center'>
                    <div className='text-white'>
                        Total Balance:  &nbsp;&nbsp;<strong className={`text-${financeData.balance > 0 ? 'white' : 'dark'}`}>{financeData.balance} &#8377;</strong>
                    </div>
                    <div>
                        <Button
                            variant='success'
                            title='Add an entry'
                            style={{ border: '1px solid white' }}
                            onClick={() => changeModalState(true)}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </Button>
                    </div>
                </div>
                {
                    financeData.data.length > 0 ?
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Date</th>
                                    <th>Description</th>
                                    <th>Amount</th>
                                    <th>Type</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    financeData.data.map((itr, index) => {
                                        return (
                                            <tr key={`${itr.description}-${itr.id}`}>
                                                <td>{index + 1}</td>
                                                <td>{moment(itr.record_date).format('MM/DD/YYYY')}</td>
                                                <td>{itr.description}</td>
                                                <td>{itr.amount}</td>
                                                <td>{itr.record_type === 0 ? 'Expense' : 'Income'}</td>
                                                <td>
                                                    <Button>
                                                        <FontAwesomeIcon icon={faPencil} />
                                                    </Button>
                                                    <Button variant='danger' onClick={() => deleteEntry(itr.id)}>
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                        :
                        <div className='text-center text-white fs-5'>No data available</div>
                }
            </div>
            <AddModal toastMessage={toastMessage} show={modalShow} changeModalState={changeModalState} fetchAll={fetchAll} />
        </div>
    )
}

export default FinanceRecords
