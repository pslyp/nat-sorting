import { IDate } from './idate.model';

export interface IReceived {
    date?: IDate
    invoice?: string
    partNo?: string
    grade?: string
    specification?: string
    _3SSpec?: string
    customer?: string
    quantity?: number
    priority?: string
    remark?: string
    status?: string
}
