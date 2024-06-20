import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from '../pages/Signup'
import Signin from '../pages/Signin'
import FinanceRecords from '../pages/FinanceRecords'

const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Signin />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/finance-records' element={<FinanceRecords />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routing
