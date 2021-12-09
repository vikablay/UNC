import {Component} from '@angular/core';

@Component({
  selector: 'my-app',
  // templateUrl: './app.component.html',
  template: `
    <div>
      <h1>Маршрутизация в Angular</h1>
      <router-outlet></router-outlet>
    </div>`,
  // styleUrls: ['./app.component.css']
})
export class AppComponent {

}
