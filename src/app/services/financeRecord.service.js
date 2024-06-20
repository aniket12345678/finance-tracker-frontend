import { frontEndUrl } from "../config/Api";

const add = (data) => {
    return frontEndUrl.post('/finance/add', data);
};

const fetchAll = (data) => {
    return frontEndUrl.post('/finance/fetch/all', data);
};

const recordDelete = (data) => {
    return frontEndUrl.post('/finance/record/delete', data);
};

const financeRecord = {
    add,
    fetchAll,
    recordDelete
};

export { financeRecord };