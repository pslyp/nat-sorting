import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { NgbModule, NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http'

import { IReceived } from '../models/ireceived.model';

@Component({
  selector: 'app-receive-page',
  standalone: true,
  imports: [CommonModule, NgbModule, ReactiveFormsModule],
  template: ` 
    <div class="container">
      <h2>Received</h2>
      <button *ngIf="isShowAllReceived" class="btn btn-primary float-end" (click)="addReceive()">Add</button>
      <div *ngIf="isShowAllReceived">
        <br /><br />
        <table class="table table-striped">
          <thead>
            <!-- <th scope="col" style="display: none;">ID</th> -->
            <th scope="col">#</th>
            <th scope="col">Date Receive</th>
            <th scope="col">Invoice</th>
            <th scope="col">Part No.</th>
            <th scope="col">Grade</th>
            <th scope="col">Spec</th>
            <th scope="col">3S</th>
            <th scope="col">Customer</th>
            <th scope="col">Qty</th>
            <th scope="col">Priority</th>
            <th scope="col">Remark</th>
            <th scope="col">Status</th>   
          </thead>
          <!-- <tbody>
            <tr>
              <td scope="col" colspan="10" style="text-align: center;">No data</td>
            </tr>
          </tbody> -->
          <tbody>
            <tr *ngFor="let received of receivedArr; index as i">
              <!-- <td style="display: none;">{{ received.id }}</td> -->
              <th scope="row">{{ (i + 1) }}</th>
              <td>{{ received.date?.year + '/' + received.date?.month + '/' + received.date?.day }}</td>
              <td>{{ received.invoice }}</td>
              <td>{{ received.partNo }}</td>
              <td>{{ received.grade }}</td>
              <td>{{ received.specification }}</td>
              <td>{{ received._3SSpec }}</td>
              <td>{{ received.customer }}</td>
              <td>{{ received.quantity }}</td>
              <td>{{ received.priority }}</td>
              <td>{{ received.remark }}</td>
              <td>{{ received.status }}</td>
            </tr>
          </tbody>
        </table>
        <hr>
        <div class="float-end total">Total<span class="ms-2 me-2">{{ totalQuantity }}</span>pcs</div>
      </div>
      <div *ngIf="isShowAllReceived == false">
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
        </form>
        <br />
        <br />
        <div *ngIf="newReceiveArr.length > 0">
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
              <th scope="col">Revise</th>
              <th scope="col">Remove</th>
            </thead>
            <tbody>
              <tr *ngFor="let nr of newReceiveArr; index as i">
                <th scope="row">{{ (i + 1) }}</th>
                <td>{{ nr.date?.year + '/' + nr.date?.month?.toString()?.padStart(2, '0') + '/' + nr.date?.day }}</td>
                <td>{{ nr.invoice }}</td>
                <td>{{ nr.partNo }}</td>
                <td>{{ nr.grade }}</td>
                <td>{{ nr.specification }}</td>
                <td>{{ nr._3SSpec }}</td>
                <td>{{ nr.customer }}</td>
                <td>{{ nr.quantity }}</td>
                <td>{{ nr.priority }}</td>
                <td>{{ nr.remark }}</td>
                <td><button type="button" class="btn btn-warning">Revise</button></td>
                <td><button type="button" class="btn btn-danger" (click)="removeRow(i)">Remove</button></td>
              </tr>
            </tbody>
          </table>
          <div class="float-end total">Total<span class="ms-2 me-2">{{ newTotalQuantity }}</span>pcs</div>
          <br />
          <button type="button" class="btn btn-primary" (click)="addDatabase()">Save</button>
          <!-- <button type="button" class="btn btn-primary" (click)="clearAllLocalData()">Clear</button> -->
        </div> 
      </div>   
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
    status: new FormControl('DISPATCH', { nonNullable: true }), 
  })

  isShowAllReceived: boolean = true
  isNewReceive: boolean = false

  model?: NgbDateStruct
  receivedArr: Array<IReceived> = []
  newReceiveArr: Array<IReceived> = []
  totalQuantity: number = 0  
  newTotalQuantity: number = 0

  constructor(private http: HttpClient, private calendar: NgbCalendar) {
   
  }

  ngOnInit(): void {
    this.getAllReceived()

    this.model = this.calendar.getToday()

    // let _localDB = this.getLocalData('received-table')

    // // console.log(_localDB.date.day)

    // if(_localDB != null) {
    //   this.receivedArr = _localDB
    // }
    // this.sumQuantity(this.receivedArr)

  }

  getAllReceived() {
    this.http.get<Array<IReceived>>(`http://localhost:3000/receives`).subscribe(data => {
      this.receivedArr = data
      this.totalQuantity = this.getTotalQuantity(this.receivedArr)
    })
  }

  getTotalQuantity(receiveds: Array<IReceived>): number {
    let _total: number = 0
    receiveds.forEach((r: IReceived) => {
      if(Number(r.quantity) > 0) {
        _total += Number(r.quantity)
      }
    })
    return _total
  }

  addReceive() {
    this.isShowAllReceived = false
  }

  addRow() {    
    this.newReceiveArr.push(this.receiveForm.value as IReceived)
    this.newTotalQuantity = this.getTotalQuantity(this.newReceiveArr)
    // this.receiveForm.reset()
    
    console.log(this.newReceiveArr)

    // this.addLocalData('received-table', this.receivedArr)
  } 

  removeRow(index: number) {
    delete this.newReceiveArr[index]

    // Reset Array
    let _temp: Array<IReceived> = []
    this.newReceiveArr.forEach((r: IReceived) => {
      if(r != null || undefined) {
        _temp.push(r)
      }
    })
    this.newReceiveArr = _temp

    console.log(this.newReceiveArr)
  }

  addDatabase() {
    this.newReceiveArr.forEach(receive => {
      this.http.post<IReceived>('http://localhost:3000/receives', receive).subscribe(resp => {
        console.log(resp)
      })
    })
  }

}
