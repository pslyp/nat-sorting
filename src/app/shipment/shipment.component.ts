import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shipment',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>Shipment</h2>
      <br />
      <table class="table">
        <thead>
          <tr>
            <th colspan="13" class="text-center">Summary Shipment</th>
          </tr>
          <tr>
            <th>Invoice</th>
            <th>Part No.</th>
            <th>Spec</th>
            <th>Customer</th>
            <th>Ship Qty. (PCS.)</th>
            <th>Total Receive</th>
            <th>B/L</th>
            <th>Console</th>
            <th>Pick Up</th>
            <th colspan="2" class="text-center">ETD</th>
            <th colspan="2" class="text-center">ETA</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>GW00013 (REF. ABG-08151)</td>
            <td>R-830X10ZZB1BSD57MTMN</td>
            <td>P13LY121</td>
            <td>EBM-PAP</td>
            <td class="text-end">140000</td>
            <td class="text-end">140000</td>
            <td class="text-end">0</td>
            <td>26-Jun-23</td>
            <td>27-Jun-23</td>
            <td>27-Jun-23</td>
            <td>21.10 PM</td>
            <td>27-Jun-23</td>
            <td>23.30 PM</td>         
          </tr>        
          <div>
            Total
          </div>
        </tbody>
      </table>
    </div>
  `,
  styles: [
  ]
})
export class ShipmentComponent {

}

interface Shipment {
  invoice?: string
  partNo?: string
  specification?: string
  customer: string
  shippingQuantity: number

}
