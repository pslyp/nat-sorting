import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-total',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>Total</h2>
      <table class="table table-striped">
        <thead>
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
        </thead>
        <tbody>
          <tr *ngFor="let row of data; index as i">
            <th scope="row">{{ row.id }}</th>
            <td>{{ row.date }}</td>
            <td>{{ row.invoice }}</td>
            <td>{{ row.partNo }}</td>
            <td>{{ row.grade }}</td>
            <td>{{ row.specification }}</td>
            <td>{{ row._3SSpec }}</td>
            <td>{{ row.customer }}</td>
            <td>{{ row.quantity }}</td>
            <td>{{ row.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [
  ]
})
export class TotalComponent implements OnInit {

  data: Array<any>

  constructor(private http: HttpClient) {
    this.data = []
  }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/receives').subscribe(data => {
      this.data = data
    })   
    
    console.log(this.data.length)
  }

}
