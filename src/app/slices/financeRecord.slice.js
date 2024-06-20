import { financeRecord } from "../services/financeRecord.service";

function financeRecord_add(data) {
    return financeRecord.add(data);
}

function financeRecord_fetchAll(data) {
    return financeRecord.fetchAll(data);
}

function financeRecord_record_delete(data) {
    return financeRecord.recordDelete(data);
}

export { financeRecord_add, financeRecord_fetchAll, financeRecord_record_delete };