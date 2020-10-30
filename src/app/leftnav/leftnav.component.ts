import { Component, OnInit } from '@angular/core';
import {User} from '../core/models/user';
import { AuthenticationService } from '../core/authentication/authentication.service';
import {Router, NavigationEnd} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-leftnav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.scss']
})
export class LeftnavComponent implements OnInit {

  isSideNavToggled = true;
  perlsSideNavContentWidth = 280;
  isLoginPage = true;
  currentUrl: string;
  pageHeader = 'Home';
  isMainDropDownToggled = true;
  isLtssFunctionsDropDownToggled = true;
  isAdminDropDownToggled = true;
  isHighlighted = false;
  currentUser: User;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl = event.url;
      if (this.currentUrl === '/') {
        this.currentUrl = '/login';
      }
      this.setPageHeader();
      window.scrollTo(0, 0);
    });
    this.setPageHeader();
  }

  toggleSideNav() {
    this.isSideNavToggled = !this.isSideNavToggled;
    console.log(this.isSideNavToggled);
    if (!this.isSideNavToggled){
      this.perlsSideNavContentWidth = 60;
    }
    else {
      this.perlsSideNavContentWidth = 280;
    }
  }

  setPageHeader() {
    this.isHighlighted = false;
    if (this.currentUrl !== '/login' && this.currentUser == null){
      this.pageHeader = '';
    }
    if (this.currentUser != null) {
      if (this.currentUrl === '/dashboard/auditHistory'){
        this.pageHeader = 'Audit Search';
        this.isHighlighted = true;
      }
      if (this.currentUrl === '/dashboard/auditDetails'){
        this.pageHeader = 'Audit Details';
        this.isHighlighted = true;
      }
      if (this.currentUrl === '/dashboard/userDetails'){
        this.pageHeader = 'Home';
        this.isHighlighted = true;
      }
      if (this.currentUrl === '/dashboard/inbox'){
        this.pageHeader = 'Inbox';
        this.isHighlighted = true;
      }
      if (this.currentUrl === '/dashboard/referral' || this.currentUrl === '/dashboard/referral/referralDashboard'){
        this.pageHeader = 'Referral';
        this.isHighlighted = true;
      }
      if (this.currentUrl === '/dashboard/referral/referralIntakeActions'){
        this.pageHeader = 'Referral / Intake Actions';
        this.isHighlighted = true;
      }
      if (this.currentUrl === '/dashboard/referral/referralIntakeOutcome'){
        this.pageHeader = 'Referral / Intake Actions / Intake Outcome';
        this.isHighlighted = true;
      }
      if (this.currentUrl === '/dashboard/appointments'){
        this.pageHeader = 'Appointments';
        this.isHighlighted = true;
      }
      if (this.currentUrl === '/dashboard/documents'){
        this.pageHeader = 'Documents';
        this.isHighlighted = true;
      }
      if (this.currentUrl === '/dashboard/notices'){
        this.pageHeader = 'Notices';
        this.isHighlighted = true;
      }
      if (this.currentUrl === '/dashboard/transitions'){
        this.pageHeader = 'Transitions';
        this.isHighlighted = true;
      }
      if (this.currentUrl === '/dashboard/changeManagement'){
        this.pageHeader = 'Change Management';
        this.isHighlighted = true;
      }
      if (this.currentUrl === '/dashboard/referralListManagement'){
        this.pageHeader = 'Referral List Management';
        this.isHighlighted = true;
      }
      if (this.currentUrl === '/dashboard/waitingListManagement'){
        this.pageHeader = 'Waiting List Management';
        this.isHighlighted = true;
      }
      if (this.currentUrl === '/dashboard/adjudicationSearch'){
        this.pageHeader = 'Adjudication';
        this.isHighlighted = true;
      }
      if (this.currentUrl === '/dashboard/enrollment'){
        this.pageHeader = 'Enrollment';
        this.isHighlighted = true;
      }
      if (this.currentUrl === '/dashboard/appeals'){
        this.pageHeader = 'Appeals';
        this.isHighlighted = true;
      }
      if (this.currentUrl === '/dashboard/reports'){
        this.pageHeader = 'Reports';
        this.isHighlighted = true;
      }
      if (this.currentUrl === '/dashboard/slotManagement'){
        this.pageHeader = 'Slot Management';
        this.isHighlighted = true;
      }
      if (this.currentUrl === '/dashboard/manageUserProfiles'){
        this.pageHeader = 'Manage User Profiles';
        this.isHighlighted = true;
      }
      if (this.currentUrl === '/dashboard/manageUserRoles'){
        this.pageHeader = 'Manage User Roles';
        this.isHighlighted = true;
      }
      if (this.currentUrl === '/dashboard/mapBusinessFunctions'){
        this.pageHeader = 'Map Business Functions';
        this.isHighlighted = true;
      }
      if (this.currentUrl === '/dashboard/mapTaskQueues'){
        this.pageHeader = 'Map Task Queues';
        this.isHighlighted = true;
      }
      if (this.currentUrl === '/dashboard/workLoadManagement'){
        this.pageHeader = 'Workload Management';
        this.isHighlighted = true;
      }
      if (this.currentUrl === '/dashboard/qualifiedAssessors'){
        this.pageHeader = 'Qualified Assessors';
        this.isHighlighted = true;
      }
      if (this.currentUrl === '/dashboard/personReconciliation'){
        this.pageHeader = 'Person Reconciliation';
        this.isHighlighted = true;
      }
      if (this.currentUrl === '/dashboard/pae' || this.currentUrl === '/dashboard/pae/paeDashboard'){
        this.pageHeader = 'PAE';
        this.isHighlighted = true;
      }
    }
  }

  toggleDropDown(dropDown) {
    if (dropDown === 'main') {
      this.isMainDropDownToggled = !this.isMainDropDownToggled;
    }
    if (dropDown === 'ltssFunctions') {
      this.isLtssFunctionsDropDownToggled = !this.isLtssFunctionsDropDownToggled;
    }
    if (dropDown === 'admin') {
      this.isAdminDropDownToggled = !this.isAdminDropDownToggled;
    }
  }
}
