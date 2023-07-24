import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http'
import { IReceive } from '../models/ireceive.model';

@Component({
  selector: 'app-sorting',
  standalone: true,
  imports: [CommonModule, NgbModule],
  template: `
    <div class="container">
      <h2>Assembly Sorting</h2>
      <form>  
        <div class="row">
          <div class="form-group col-4">
            <label>From Date</label>
            <div class="input-group">
              <input 
                id="date" 
                class="form-control" 
                placeholder="yyyy-mm-dd"
                name="dp"
                ngbDatepicker
                #dateFrom="ngbDatepicker" />         
              <button type="button" class="btn btn-outline-secondary bi bi-calendar3" (click)="dateFrom.toggle()"></button>
            </div>
          </div>
          <div class="form-group col-4">
            <label>To Date</label>
            <div class="input-group">
              <input 
                id="date" 
                class="form-control" 
                placeholder="yyyy-mm-dd"
                name="dp"
                ngbDatepicker
                #dateTo="ngbDatepicker" />         
              <button type="button" class="btn btn-outline-secondary bi bi-calendar3" (click)="dateTo.toggle()"></button>
            </div>
          </div>
        </div>
      </form>
      <br />
      <button type="button" class="btn btn-primary">Search</button>
      <br />
      <br />
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
          <tr *ngFor="let rec of received; index as i">
            <th scope="row">{{ rec.id }}</th>
            <td>{{ rec.date }}</td>
            <td>{{ rec.invoice }}</td>
            <td>{{ rec.partNo }}</td>
            <td>{{ rec.grade }}</td>
            <td>{{ rec.specification }}</td>
            <td>{{ rec._3SSpec }}</td>
            <td>{{ rec.customer }}</td>
            <td>{{ rec.quantity }}</td>
            <td>{{ rec.priority }}</td>
            <td>{{ rec.remark }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [
  ]
})
export class SortingComponent implements OnInit {

  received: Array<IReceive> = []

  constructor(private http: HttpClient) {
    
  }

  ngOnInit(): void {
    this.http.get<Array<IReceive>>(`http://localhost:3000/receives?status=SORTING`).subscribe(data => {
      this.received = data
      // this.received.sort
    })     
  }

}
