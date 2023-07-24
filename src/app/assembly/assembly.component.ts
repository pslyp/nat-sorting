import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { IReceive } from '../models/ireceive.model';

@Component({
  selector: 'app-assembly',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  template: `
    <div class="container">
      <div *ngIf="state == 0">
        <table class="table table-striped">
          <thead>
            <th scope="col" style="display: none;">ID</th>
            <th scope="col">#</th>
            <th scope="col">Date Receive</th>
            <th scope="col">Invoice</th>
            <th scope="col">Part No.</th>
            <th scope="col">Grade</th>
            <th scope="col">Spec</th>
            <th scope="col">3S-Spec</th>
            <th scope="col">Customer</th>
            <th scope="col">Quantity</th>
          </thead>
          <tbody>
            <tr *ngFor="let receive of receivedArr; index as i">
              <td style="display: none;">{{ receive.id }}</td>
              <th scope="row">{{ (i + 1) }}</th>
              <td>{{ receive.date?.year + '/' + receive.date?.month + '/' + receive.date?.day }}</td>
              <td>{{ receive.invoice }}</td>
              <td>{{ receive.partNo }}</td>
              <td>{{ receive.grade }}</td>
              <td>{{ receive.specification }}</td>
              <td>{{ receive._3SSpec }}</td>
              <td>{{ receive.customer }}</td>
              <td>{{ receive.quantity }}</td>
              <td><button type="button" class="btn btn-primary" (click)="onSelect(receive)">Select</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div *ngIf="state == 1">
        <span>{{ receive | json }}</span>
        <form [formGroup]="issueForm">
          <div class="form-group">
            <label>Invoice</label>
            <input type="text" class="form-control" formControlName="invoice" />
          </div>
        </form>
        <table>
          <thead>
            <th *ngFor="let col of displayedColumns">{{ col }}</th>            
          </thead>
          <tbody>
            <tr>
              <td *ngFor=""><input type="text" class="form-control" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class AssemblyComponent implements OnInit {
  displayedColumns: string[] = ["#", "Order No.", "Lot No.", "Note", "C/No.", "Q'ty", "Label Date"]
  
  state: number = 1
  receive: IReceive | undefined
  receivedArr: Array<IReceive> = []

  issueForm = new FormGroup({
    orderNo: new FormControl('', { nonNullable: true }),
    lotNo: new FormControl('', { nonNullable: true }),
    note: new FormControl(''),
    CNo: new FormControl(''),
    quantity: new FormControl(''),
    labelDate: new FormControl('')
  })

  constructor(private http: HttpClient) {
    
  }

  ngOnInit(): void {
    this.http.get<Array<IReceive>>('http://localhost:3000/receives?status=DISPATCH').subscribe(data => {
      this.receivedArr = data
    })
  }

  onSelect(receive: IReceive): void {
    this.state = 1
    this.receive = receive
  }

}
