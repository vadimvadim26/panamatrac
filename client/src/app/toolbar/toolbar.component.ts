import { Component} from '@angular/core';
import {
  Router, NavigationStart, NavigationEnd,
  NavigationCancel, NavigationError, Event
} from '@angular/router';
import {AuthService} from "../shared/services/auth.service";
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent{
  user: any
  showLoadingIndicator = true;


  constructor(private auth: AuthService,
              private _router: Router) {

    this._router.events.subscribe((routerEvent: Event) => {


      if (routerEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true;
      }


      if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationError ||
        routerEvent instanceof NavigationCancel) {
        this.showLoadingIndicator = false;
      }

    });

    let userstring = localStorage.getItem('user')
    if (typeof userstring === "string") {
      this.user = JSON.parse(userstring)
    }


  }

  logout(){
    /*event.EventTarget()*/
    this.auth.logout()
    this._router.navigate(['/login'])
  }



}
