import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { IReceived } from '../models/ireceived.model';

@Component({
  selector: 'app-total',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>Total</h2>
      <table class="table table-striped">
        <thead>
          <th scope="col" style="display: none;">ID</th>
          <th scope="col">#</th>
          <th scope="col">Date</th>
          <th scope="col">Invoice</th>
          <th scope="col">Part No.</th>
          <th scope="col">Grade</th>
          <th scope="col">Spec</th>
          <th scope="col">3S-Spec</th>
          <th scope="col">Customer</th>
          <th scope="col">Quantity</th>
          <th scope="col">Status</th>   
          <th scope="col"></th>
        </thead>
        <tbody>
          <tr *ngFor="let row of receivedArr; index as i">
            <td style="display: none;">{{ row.id }}</td>
            <th scope="row">{{ (i + 1) }}</th>
            <td>{{ row.date?.year + '/' +row.date?.month + '/' + row.date?.day }}</td>
            <td>{{ row.invoice }}</td>
            <td>{{ row.partNo }}</td>
            <td>{{ row.grade }}</td>
            <td>{{ row.specification }}</td>
            <td>{{ row._3SSpec }}</td>
            <td>{{ row.customer }}</td>
            <td>{{ row.quantity }}</td>
            <td>{{ row.status }}</td>
            <td><button type="button" class="btn btn-danger" (click)="removeItem(row.id)">Delete</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [
  ]
})
export class TotalComponent implements OnInit {

  receivedArr: Array<IReceived> = []

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.showTable()
  }

  showTable() {
    this.http.get<Array<IReceived>>('http://localhost:3000/receives').subscribe(data => {
      this.receivedArr = data
    })   
    
    console.log(this.receivedArr)
  }

  removeItem(id: number) {
    this.http.delete(`http://localhost:3000/receives/${id}`).subscribe(resp => {
      console.log(resp)

      this.showTable()
    })  
  }

}
