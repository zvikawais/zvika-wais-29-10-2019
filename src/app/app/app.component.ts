import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { trigger, transition, useAnimation } from '@angular/animations';
import { rotateCubeToLeft, rotateCubeToRight } from 'ngx-router-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('rotateCubeToLeft', [transition('home => favorites', useAnimation(rotateCubeToLeft))]),
    trigger('rotateCubeToRight', [transition('favorites => home', useAnimation(rotateCubeToRight))])
  ],
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  get containerClassList(): DOMTokenList {
    return document.getElementsByTagName('body')[0].classList;
  }

  constructor() { }

  getState(outlet: RouterOutlet) {
    return outlet.activatedRouteData.state;
  }

  toggleTheme(theme) {
    if (this.containerClassList.contains(theme)) {
      this.containerClassList.remove(theme);
    } else {
      this.containerClassList.add(theme);
    }
  }
}


