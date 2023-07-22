import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-no-page-found',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container text-center">
      <div class="col-md-12">
        <div>
          <h3>Oops!</h3>
          <h2>404 Not Found</h2>
          <div class="mb-3">
            Sorry, Requested page not found!
          </div>
          <!-- <div class="error-actions">
              <a routerLink="/home" class="btn btn-danger btn-lg">
                  Go Back to Home
              </a>
          </div> -->
        </div>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class NoPageFoundComponent {

}
