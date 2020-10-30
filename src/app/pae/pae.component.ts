import { Component, OnInit } from '@angular/core';
import { User } from '../core';
import { Router, NavigationEnd, NavigationStart, NavigationError } from '@angular/router';
import { AuthenticationService } from '../core/authentication/authentication.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-pae',
  templateUrl: './pae.component.html',
  styleUrls: ['./pae.component.scss']
})
export class PaeComponent implements OnInit {
  enabledDiagnosisSummary = true;
  isSideNavToggled = true;
  perlsSideNavContentWidth = 280;
  isLoginPage = true;
  currentUrl: string;
  pageHeader = 'Welcome';
  isPersonDetailsDropDownToggled = false;
  isProgramRequestDropDownToggled = false;
  isDiagnosisDropDownToggled = false;
  isAdminDropDownToggled = true;
  currentUser: User;
  currentMenuItem = null;
  currentMenuParent = null;
  nullValue = null;
  pageError = null;
  pairs = null;
  showRequired = false;
  menuData: any;


  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('selectedMenu')) {
      console.log("inside")
      this.enabledDiagnosisSummary = false;
    }

    this.menuData = [
      { text: "Welcome", id: "welcome", showRequired: true },
      {
        text: "Person Details", id: "personDetails", children: [
          { text: "Applicant Information", id: "applicantInformation", showRequired: true },
          { text: "Contact Information", id: "contactInformation", showRequired: true },
          { text: "Living Arrangement", id: "livingArrangement", showRequired: true },
          { text: "Appointment", id: "appointment", showRequired: true }
        ]
      }, {
        text: "Program Request", id: "programRequest", children: [
          { text: "Select Program", id: "selectProgram" },
        ]
      }, {
        text: "Diagnosis", id: "diagnosis", children: [
          { text: "Diagnosis Summary", id: "diagnosisSummary", disabled: this.enabledDiagnosisSummary },
          { text: "Medical Diagnosis", id: "medicalDiagnosis", disabled: true },
        ]
      }, {
        text: "Functional Assessment", id: "functionalAssessment", children: [
          { text: "Functional Assessment Summary", id: "functionalAssessment" },
          { text: "Activities of Daily Living\u00a0-\u00a0Part\u00a01", id: "capabilitiesNeedsPartOne", disabled: true, showRequired: true },
          {
            text: "Activities of Daily Living\u00a0-\u00a0Part\u00a02", id: "capabilitiesNeedsPartTwo",
            disabled: true, pairsWith: ['activitiesPartTwo'], hidden: true, showRequired: true
          },
          {
            text: "Activities of Daily Living\u00a0-\u00a0Part\u00a02", id: "activitiesPartTwo", disabled: true,
            pairsWith: ['capabilitiesNeedsPartTwo'], showRequired: true
          },
          { text: 'ActivitiesPartOne', id: 'activitiesDailyLivingPartOne' },
        ]
      },
      { text: "Skills Assessment", id: "skillsAssessment", children: [] },
      { text: "Behavioral Support", id: "behavioralSupport", children: [] },
      {
        text: "Prioritization Details", id: "priortizationDetails", children: [
          { text: "Nutrition / Feeding", id: "nutritionFeeding" },
          { text: "Intensive Interventions", id: "intensiveInterventions" }
        ]
      },
      {
        text: "Safety Determination", id: "safetyDetermination", children: [
          { text: "Fall History", id: "fallHistory" }
        ]
      },
      { text: "Cost Neutrality", id: "costNeutrality", children: [] },
      { text: "Supporting Documentation", id: "supportingDocumentation", children: [] },
      { text: "Submit", id: "submit" }
    ];

    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl = event.url;
      if (this.currentUrl === '/') {
        this.currentUrl = '/login';
      }
      this.pageError = null;
      this.setPageHeader();
      window.scrollTo(0, 0);
    });
    this.router.events.pipe(
      filter(event => event instanceof NavigationError)
    ).subscribe((event: NavigationError) => {
      this.currentUrl = event.url;
      if (this.currentUrl === '/') {
        this.currentUrl = '/login';
      }
      this.pageError = "Could not find route to " + event.url;
      this.setPageHeader();
      window.scrollTo(0, 0);
    });

    this.setActive();
  }

  toggleSideNav() {
    this.isSideNavToggled = !this.isSideNavToggled;
    console.log(this.isSideNavToggled);
    if (!this.isSideNavToggled) {
      this.perlsSideNavContentWidth = 60;
    }
    else {
      this.perlsSideNavContentWidth = 280;
    }
  }

  backtoPaeHome() {
    this.router.navigate(['/dashboard/pae/paeDashboard']);
  }
  setPageHeader() {

    if (this.currentUrl !== '/login' && this.currentUser == null) {
      this.pageHeader = '';
      this.showRequired = false;
      this.currentUrl = "/dashboard/pae";
    } else {
      if (this.currentUser != null) {
        var urlId = "";
        if (this.currentUrl) {
          var url = this.currentUrl;
          urlId = this.currentUrl.split("/").pop();
          this.getCurrentMenuItem(urlId);
        } else {
          this.currentMenuParent = this.menuData[0];
          this.pageHeader = this.currentMenuParent.text;
        }
      }
    }
    this.setActive();
  }

  setActive(clean?: boolean) {
    if (!this.currentUrl) {
      this.currentUrl = "/dashboard/pae";
    }

    if (this.pairs == null) {
      this.pairs = {};
      for (var i = 0; i < this.menuData.length; i++) {
        var menuItem = this.menuData[i];
        if (menuItem.children) {
          for (var j = 0; j < menuItem.children.length; j++) {
            var subMenuItem = menuItem.children[j];
            if (subMenuItem.pairsWith) {
              this.pairs[subMenuItem.id] = subMenuItem;
            }
          }
        }
      }
    }

    for (var i = 0; i < this.menuData.length; i++) {
      var menuItem = this.menuData[i];
      menuItem.active = typeof menuItem.children == "undefined" && this.currentUrl.indexOf(menuItem.id) < 0;
      console.log(menuItem.id + " active: " + menuItem.active);
      if (clean) {
        menuItem.selected = menuItem.id === this.currentMenuParent?.id
      }
      if (menuItem.children) {
        for (var j = 0; j < menuItem.children.length; j++) {
          var subMenuItem = menuItem.children[j];
          if (this.currentUrl.indexOf(subMenuItem.id) > -1) {
            if (subMenuItem.disabled) {
              subMenuItem.disabled = false;
            }
            if (subMenuItem.pairsWith) {
              subMenuItem.pairsWith.forEach((element: string) => { this.pairs[element].hidden = true; });
              subMenuItem.hidden = false;
            }
          }
          if (clean) {
            subMenuItem.selected = subMenuItem.id === this.currentMenuItem?.id;
          }
          subMenuItem.active = this.currentUrl.indexOf(subMenuItem.id) < 0;
          console.log(subMenuItem.id + " active: " + subMenuItem.active);
        }
      }
    }
  }

  getCurrentMenuItem(id: string) {
    var found = null;
    var foundParent = null;
    var newUrl = '/dashboard/pae' + (id.length > 0 ? "/" + id : "");

    for (var i = 0; i < this.menuData.length && foundParent == null; i++) {
      if (this.menuData[i].id === id) {
        foundParent = this.menuData[i];
      } else if (this.menuData[i].children) {
        for (var j = 0; j < this.menuData[i].children.length && found == null; j++) {
          if (this.menuData[i].children[j].id === id) {
            found = this.menuData[i].children[j];
            foundParent = this.menuData[i];
          }
        }
      }
    }

    if (found) {

      if (newUrl !== this.currentUrl) {
        this.currentUrl = newUrl;
        console.log(newUrl);
      } else {

        if (foundParent) {
          if (this.currentMenuParent) {
            this.currentMenuParent.selected = false;
            console.log("selected parent:" + this.currentMenuParent.id);
          }
          foundParent.selected = true;
          this.currentMenuParent = foundParent;

          if (found?.id !== this.currentMenuItem?.id) {
            if (this.currentMenuItem) {
              this.currentMenuItem.selected = false;
              console.log("unselected previous menu item: " + this.currentMenuItem.id);
            }
            this.currentMenuItem = found;
            this.currentMenuItem.selected = true;
            console.log("selected currentMenuItem: " + this.currentMenuItem.id);
          }
        }
        this.pageHeader = this.currentMenuItem.text;
        this.showRequired = this.currentMenuItem.showRequired;
        console.log("set page header");
      }

    } else {

      if (this.currentMenuParent) {
        this.currentMenuParent.selected = false;
      }
      if (foundParent) {
        this.currentMenuParent = foundParent;
        if (!foundParent.children) {
          this.pageHeader = this.currentMenuParent.text;
          this.showRequired = this.currentMenuParent.showRequired;
        }
      }

    }
    this.setActive(true);
  }

  toggle(id: string) {

    if (this.currentMenuParent?.id == id) {
      this.currentMenuParent.selected = !this.currentMenuParent.selected;
      this.setActive();
    } else {
      if (this.currentMenuItem?.id !== id) {
        this.getCurrentMenuItem(id);
      }
    }
  }
}
