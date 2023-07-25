import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { NgbModule, NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

import { IReceived } from '../models/ireceived.model';

@Component({
  selector: 'app-assembly',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,NgbModule],
  template: `
    <div class="container">
      <h2>Assembly</h2>
      <br />
      <div *ngIf="isSelect == false">
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
              <!-- <td style="display: none;">{{ receive.id }}</td> -->
              <th scope="row">{{ (i + 1) }}</th>
              <td>{{ receive.date?.year + '/' + receive.date?.month + '/' + receive.date?.day }}</td>
              <td>{{ receive.invoice }}</td>
              <td>{{ receive.partNo }}</td>
              <td>{{ receive.grade }}</td>
              <td>{{ receive.specification }}</td>
              <td>{{ receive._3SSpec }}</td>
              <td>{{ receive.customer }}</td>
              <td>{{ receive.quantity }}</td>
              <td><button class="btn" (click)="selectRow(receive)">Select</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div *ngIf="isSelect">
        <span>{{ receive | json }}</span>

        <form [formGroup]="issueForm">
          <div class="row">
            <div class="form-group col-4">
              <label>Invoice (NAT)</label>
              <input type="text" class="form-control" formControlName="invoice" />
            </div>
            <div class="form-group col-4">
              <label>Order No.</label>
              <input type="text" class="form-control" formControlName="orderNo" />
            </div>
            <div class="form-group col-4">
              <label>Lot No.</label>
              <input type="text" class="form-control" formControlName="lotNo" />
            </div>
          </div>
          <div class="row">
            <div class="form-group col-4">
              <label>C/No.</label>
              <input type="text" class="form-control" formControlName="CNo" />
            </div>
            <div class="form-group col-4">
              <label>Q'ty</label>
              <input type="text" class="form-control" formControlName="quantity" />
            </div>
            <div class="form-group col-4">
              <label>Label Date</label>
              <div class="input-group">
                <input 
                  id="labelDate" 
                  class="form-control" 
                  placeholder="yyyy-mm-dd"
                  name="dp"           
                  ngbDatepicker
                  #labelDate="ngbDatepicker"
                  formControlName="labelDate" />         
                <button type="button" class="btn btn-outline-secondary bi bi-calendar3" (click)="labelDate.toggle()"></button>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="form-group col-4">
              <label>Note</label>
              <input type="text" class="form-control" formControlName="note" />
            </div>
            <div class="form-group col-4">
              <label for="date">Send to Assy</label>
              <div class="input-group">
                <div class="input-group-text">
                  <input type="checkbox" value="" (change)="onAssyDateCheck($event)" />
                </div>
                <input                               
                  id="assyDate" 
                  class="form-control" 
                  placeholder="yyyy-mm-dd"
                  name="dp" 
                  [(ngModel)]="currDate"                            
                  ngbDatepicker
                  #assyDate="ngbDatepicker"
                  formControlName="assyDate" />         
                <button type="button" class="btn btn-outline-secondary bi bi-calendar3" (click)="assyDate.toggle()"></button>
              </div>
            </div>
          </div>
        </form>
        <!-- <table>
          <thead>
            <th *ngFor="let col of tableColumns">{{ col }}</th>            
          </thead>
          <tbody>
            <tr>
              <td *ngFor="let col of tableColumns">
                <input type="text" class="form-control" />
              </td>
            </tr>
          </tbody>
        </table> -->
      </div>
    </div>
  `,
  styles: [
  ]
})
export class AssemblyComponent implements OnInit {  
  isSelect: boolean = false
  currDate?: NgbDateStruct 
  receive: IReceived | undefined
  receivedArr: Array<IReceived> = []

  issueForm = new FormGroup({
    invoice: new FormControl(''),
    orderNo: new FormControl('', { nonNullable: true }),
    lotNo: new FormControl('', { nonNullable: true }),
    note: new FormControl('', { nonNullable: true }),
    CNo: new FormControl('', { nonNullable: true }),
    quantity: new FormControl('', { nonNullable: true }),
    labelDate: new FormControl('', { nonNullable: true }),
    assyDate: new FormControl('', { nonNullable: true })
  })

  constructor(private http: HttpClient, private calendar: NgbCalendar) {
    
  }

  ngOnInit(): void {
    this.http.get<Array<IReceived>>('http://localhost:3000/receives?status=DISPATCH').subscribe(data => {
      this.receivedArr = data
    })
  }

  selectRow(receive: IReceived): void {
    this.isSelect = true
    this.receive = receive

    this.currDate = this.calendar.getToday()
    this.issueForm.controls.assyDate.disable()
  }

  onAssyDateCheck(e: Event): void {
    console.log(e)
    if(this.issueForm.controls.assyDate.disabled) {
      this.issueForm.controls.assyDate.enable()
    }
    else {
      this.issueForm.controls.assyDate.disable()
    }
  }

}
