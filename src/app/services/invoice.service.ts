import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  url = 'http://localhost:3000/invoices';

  constructor(private http: HttpClient) { }

  getInvoices() {
    return this.http.get(`${this.url}`);
  }
}
