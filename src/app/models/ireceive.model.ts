import { IDate } from './idate.model';

export interface IReceive {
    id: number
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
