import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {CalendarOptions} from '@fullcalendar/angular';
import * as moment from 'moment';
import {AppointmentsService} from '../services/appointments.service';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AppointmentSummaryComponent} from "../appointment-summary/appointment-summary.component";


@Component({
  selector: 'app-appointments-dashboard',
 // encapsulation: ViewEncapsulation.None,
  templateUrl: './appointments-dashboard.component.html',
  styleUrls: ['./appointments-dashboard.component.scss']
})
export class AppointmentsDashboardComponent implements OnInit {

  data = [];
  appointmentDates = [];
  missAppointments =0;
  upcomingAppointments = 0;
  today = new Date();
  calendarOptions: CalendarOptions;


  constructor(private appointmentService: AppointmentsService,
  private router: Router,
  private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.getAppointments();
  }

  showSummaryDialog(appointmentId) {
    const dialogConfig =  new MatDialogConfig();
    dialogConfig.minWidth = '450px';
    dialogConfig.minHeight = '405px';
    dialogConfig.panelClass = 'dialog-container';
    dialogConfig.data = {appointmentId : appointmentId};
    this.matDialog.open(AppointmentSummaryComponent, dialogConfig);
  }

  navigateToSearch(type: string) {
    if (type === 'upcomingAppointments' && this.upcomingAppointments) {
      const data = this.data.filter((a) => moment(a['appointmentDate']).isSameOrAfter(new Date()));
      this.router.navigate(['/dashboard/appointments/search'], {state: {data}});
      return;
    }
    if (type === 'missedAppointments' && this.missAppointments) {

        const data = this.data.filter((a) => moment(a['appointmentDate']).isBefore(new Date()));
        this.router.navigate(['/dashboard/appointments/search'], {state: {data}});

    }
  }

  async getAppointments() {
    try {
      let appointments = await this.appointmentService.getAppointments('admin');
      console.log(appointments);
      this.data = appointments['body'];
      this.data.forEach((a) => {
        moment(a['appointmentDate']).isAfter(new Date()) ? this.upcomingAppointments = this.upcomingAppointments + 1: this.missAppointments = this.missAppointments +1;
      });
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        showNonCurrentDates: false,
        fixedWeekCount: false,
        customButtons: {
          custom1: {
            text: 'Katie Beckeet',
            click: () => {
              console.log('clicked');
            }
          },
          custom2: {
            text: 'ECF',
            click: () => {
              console.log('clicked');
            }
          }
        },
        events: (() => {

          if(this.data && this.data.length) {

            return this.data.map((a) => ({
              start: new Date(moment(a['appointmentDate'], 'MM/DD/YYYY hh:mm A').toDate()),
              end: new Date(moment(a['appointmentDate'], 'MM/DD/YYYY hh:mm A').toDate()),
              className: a['programCd'] === 'KB' ? 'kb-event' : 'ecf-event',
              title: moment(a['appointmentDate'], 'MM/DD/YYYY hh:mm A').format('hh:mm A'),
              appointmentId: a['appointmentId'] }));
          }else {
            return  [];
          }
        })(),
        eventClick: (info) => {
          this.showSummaryDialog(info.event.extendedProps.appointmentId);
        },
        displayEventTime: false,
        headerToolbar: {
          left: 'title',
          center: '',
          right: 'custom1 custom2'
        },
        buttonText: {
          prev: '< Previous',
          next: 'Next >'
        },
        footerToolbar: {
          left: '',
          center: '',
          right: 'prev next'
        }
      };
    }catch(err) {
      console.log(err);
    }
  }

}
