import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { NgbModule, NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http'

import { IReceived } from '../models/ireceived.model';

@Component({
  selector: 'app-received-page',
  standalone: true,
  imports: [CommonModule, NgbModule, ReactiveFormsModule],
  template: ` 
    <div class="container">
      <h2>Received</h2>
      <form [formGroup]="receiveForm" (submit)="addRow()">
        <div class="row">
          <div class="form-group col-4">
            <label for="date">Date</label>
            <div class="input-group">
              <input 
                id="date" 
                class="form-control" 
                placeholder="yyyy-mm-dd"
                name="dp"
                [(ngModel)]="model"
                ngbDatepicker
                #d="ngbDatepicker"
                formControlName="date" />         
              <button type="button" class="btn btn-outline-secondary bi bi-calendar3" (click)="d.toggle()"></button>
            </div>
          </div>
          <div class="form-group col-4">
            <label>Invoice</label>
            <input type="text" class="form-control" formControlName="invoice" />
            <div *ngIf="receiveForm.controls.invoice.errors?.['required']">
              Invoice is required.
            </div>        
          </div>        
          <div class="form-group col-4">
            <label for="partNo">Part No</label>
            <input id="partNo" type="text" class="form-control" formControlName="partNo" />
          </div>
        </div>
        <div class="row">
          <div class="form-group col-4">
            <label for="grade">Grade</label>
            <input id="grade" type="text" class="form-control" formControlName="grade" />
          </div>
          <div class="form-group col-4">
            <label for="specification">Spec</label>
            <input id="specification" type="text" class="form-control" formControlName="specification" />
          </div>
          <div class="form-group col-4">
            <label for="_3SSpec">3S-Spec</label>
            <input id="_3SSpec" type="text" class="form-control" formControlName="_3SSpec" />
          </div>
          <div class="form-group col-4">
            <label for="customer">Customer</label>
            <input id="customer" type="text" class="form-control" formControlName="customer" />
          </div>
          <div class="form-group col-4">
            <label for="quantity">Qty.</label>
            <input id="quantity" type="text" class="form-control" formControlName="quantity" />
          </div>
          <div class="form-group col-4">
            <label for="priority">Priority</label>
            <input id="priority" type="text" class="form-control" formControlName="priority" />
          </div>
          <div class="form-group col-4">
            <label for="remark">Remark</label>
            <input id="remark" type="text" class="form-control" formControlName="remark" />
          </div>
          <div class="form-group col-4" style="display: none;">
            <label for="status">Status</label>
            <input id="status" type="text" class="form-control" formControlName="status" />
          </div>
        </div>
        <br />
        <button type="submit" class="btn btn-primary">Add</button>
        <span>{{ receiveForm.valid | json }}</span>
      </form>
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
          <th scope="col">Priority</th>
          <th scope="col">Remark</th>
          <!-- <th scope="col">Status</th> -->
          <th scope="col">Revise</th>
          <th scope="col">Remove</th>
        </thead>
        <tbody>
          <tr *ngFor="let received of receivedArr; index as i">
            <th scope="row">{{ (i + 1) }}</th>
            <td>{{ received.date?.year + '/' + received.date?.month?.toString()?.padStart(2, '0') + '/' + received.date?.day }}</td>
            <td>{{ received.invoice }}</td>
            <td>{{ received.partNo }}</td>
            <td>{{ received.grade }}</td>
            <td>{{ received.specification }}</td>
            <td>{{ received._3SSpec }}</td>
            <td>{{ received.customer }}</td>
            <td>{{ received.quantity }}</td>
            <td>{{ received.priority }}</td>
            <td>{{ received.remark }}</td>
            <!-- <td>{{ received.status }}</td> -->
            <td><button type="button" class="btn btn-warning">Revise</button></td>
            <td><button type="button" class="btn btn-danger" (click)="removeRow(i)">Remove</button></td>
          </tr>
        </tbody>
      </table>
      <div class="float-end total">Total<span class="ms-2 me-2">{{ totalQuantity }}</span>pcs</div>
      <br />
      <button type="button" class="btn btn-primary" (click)="addDatabase()">Save</button>
      <button type="button" class="btn btn-primary" (click)="clearAllLocalData()">Clear</button>
    </div>    
  `,
  styles: [`
    .total {
      margin-right: 20rem;
    }
  `]
})
export class ReceivedComponent implements OnInit {
  
  receiveForm = new FormGroup({
    date: new FormControl('', { nonNullable: true }),
    invoice: new FormControl('', { nonNullable: true }),
    partNo: new FormControl('', { nonNullable: true }), 
    grade: new FormControl('', { nonNullable: true }), 
    specification: new FormControl('', { nonNullable: true }),
    _3SSpec: new FormControl('', { nonNullable: true }), 
    customer: new FormControl('', { nonNullable: true }), 
    quantity: new FormControl(0, { nonNullable: true }), 
    priority: new FormControl('', { nonNullable: true }), 
    remark: new FormControl('', { nonNullable: true }),
    status: new FormControl('receive', { nonNullable: true }), 
  })

  model?: NgbDateStruct
  receivedArr: Array<IReceived> = []
  totalQuantity: number = 0

  constructor(private http: HttpClient, private calendar: NgbCalendar) {
   
  }

  ngOnInit(): void {
    this.model = this.calendar.getToday()
    let _localDB = this.getLocalData('received-table')

    // console.log(_localDB.date.day)

    if(_localDB != null) {
      this.receivedArr = _localDB
    }
    this.sumQuantity(this.receivedArr)
  }

  addRow() {
    // console.log(this.receiveForm.value)
    this.receivedArr.push(this.receiveForm.value as IReceived)
    
    console.log(this.receivedArr)

    this.sumQuantity(this.receivedArr)
    this.addLocalData('received-table', this.receivedArr)
  }

  removeRow(index: number) {
    delete this.receivedArr[index] 

    this.receivedArr = this.receivedArr.filter(row => row != null || undefined)
    if(this.receivedArr.length > 0) {
      this.addLocalData('received-table', this.receivedArr)
    }
    else {
      localStorage.removeItem('received-table')
    }
    // console.log(this.receivedArr)

    this.sumQuantity(this.receivedArr)
  }

  sumQuantity(recArr: Array<IReceived>) {
    this.totalQuantity = 0
    recArr.forEach((rec: IReceived) => {
      if(Number(rec.quantity) > 0) {
        this.totalQuantity += Number(rec.quantity)
      }
    })
    // console.log(this.totalQuantity)
  }

  addLocalData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data))
  }

  getLocalData(key: string): any {
    let _localDB = localStorage.getItem(key)
    if(_localDB != null) {
      return JSON.parse(_localDB)
    }
    return null
  }

  clearAllLocalData(): void {
    localStorage.clear()
  }

  addDatabase() {
    this.receivedArr.forEach(receive => {
      this.http.post<IReceived>('http://localhost:3000/receives', receive).subscribe(resp => {
        console.log(resp)
      })
    })
  }

}
