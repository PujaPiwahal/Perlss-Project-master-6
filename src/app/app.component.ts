import { SessionTimeoutPopupComponent } from './session-timeout-popup/session-timeout-popup.component';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthenticationService } from './core/authentication/authentication.service';
import { User } from './core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { HttpClient } from '@angular/common/http';
import { SET_IDLE_TIMEOUT, SET_TIMEOUT_WARNING} from '../app/_shared/constants/application.constants';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  idleState = 'Not started.';
  timedOut = false;
  title = 'PERLSS';
  currentUser: User;
  currentUrl: string;
  isLoginPage = true;
  lastPing?: Date = null;
  called = false;
  matDialogRef: any;

  constructor(private http: HttpClient,
              private idle: Idle,
              private keepalive: Keepalive,
              private router: Router,
              private authenticationService: AuthenticationService,
              private dialog: MatDialog) {  }
  ngOnInit() {
    this.idle.setIdle(SET_IDLE_TIMEOUT);
    this.idle.setTimeout(SET_TIMEOUT_WARNING);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.authenticationService.currentUser.subscribe(userLoggedIn => {
      if (userLoggedIn) {
        this.idle.watch();
        this.called = false;
        this.timedOut = false;
      } else {
        this.idle.stop();
      }
    });
    this.idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle.';
      console.log(this.matDialogRef.getState());
      console.log(this.idleState);
      this.called = false;
      this.reset();
    });

    this.idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      console.log(this.idleState);
      this.matDialogRef.close();
      this.authenticationService.logout();
    });

    this.idle.onIdleStart.subscribe(() => {
      this.idleState = 'You\'ve gone idle!';
      console.log(this.idleState);

    });

    this.idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'You will time out in ' + countdown + ' seconds!';
      console.log(this.idleState);
      if ( !this.called )
      {
        this.matDialogRef = this.dialog.open(SessionTimeoutPopupComponent, {
          width: '550px',
          height: 'auto',
          data: { numbers: countdown }
        });
      }
      if (this.matDialogRef && this.matDialogRef.componentInstance) {
        this.matDialogRef.componentInstance.data = {numbers: countdown};
        console.log(countdown);
      }
      this.matDialogRef.afterClosed().subscribe(isLogOut => {
        if ( isLogOut ) {
          this.authenticationService.logout();
        }
      });
      this.called = true;
    });

    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl = event.url;
      if (this.currentUrl === '/') {
        this.currentUrl = '/login';
      }
      this.checkRoute();
    });
      }
  checkRoute() {
    if (this.currentUrl === '/login' || this.currentUser == null){
      this.isLoginPage = true;
    }
    else if (this.currentUser != null && this.currentUrl !== '/login'){
      this.isLoginPage = false;
    }
  }

  reset() {
    this.idle.watch();
    this.timedOut = false;
  }
}

