import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { trigger, transition, useAnimation } from '@angular/animations';
import { rotateCubeToLeft, rotateCubeToRight } from 'ngx-router-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('rotateCubeToLeft', [transition('home => favorites', useAnimation(rotateCubeToLeft))]),
    trigger('rotateCubeToRight', [transition('favorites => home', useAnimation(rotateCubeToRight))])
  ]
})
export class AppComponent {
  title = 'weather';
  getState(outlet: RouterOutlet) {
    return outlet.activatedRouteData.state;
  }
}
