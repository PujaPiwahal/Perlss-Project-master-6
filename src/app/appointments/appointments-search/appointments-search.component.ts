import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {Form, FormBuilder, FormControl, FormGroup,Validators,FormsModule, ReactiveFormsModule} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatPaginator} from '@angular/material/paginator';
//import * as AppointmentDetail from '../../../assets/data/appointment-search.json';
import {AppointmentsService} from '../services/appointments.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CancelAppointmentComponent } from "../cancel-appointment/cancel-appointment.component";

@Component({
  selector: 'app-appointments-search',
  templateUrl: './appointments-search.component.html',
  styleUrls: ['./appointments-search.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class AppointmentsSearchComponent implements OnInit, AfterViewInit {

  myForm: FormGroup;
  searchForm: FormGroup;
  displayedColumns: string[] = ['name','ssn', 'referralId','paeId','appointmentType', 'appointmentStatus','appointmentDate'];
  dataSource: MatTableDataSource<any>;
  expandedElement;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  data = [];

  constructor(private fb: FormBuilder,
              private appointmentService: AppointmentsService,
              private matDialog: MatDialog) { }

  ngOnInit() {
    const currentYear = new Date().getFullYear();
    this.myForm = this.fb.group({
      searchText:[''],
      contactMethod: [''],
      status: [''],
      type: [''],
      refId: [''],
      paeId: ['']
    });
    if(window.history.state && window.history.state['data']) {
      this.data = window.history.state['data'];
    }
  }

    ngAfterViewInit() {
      if(this.data && this.data.length) {
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
      }
     //this.dataSource.paginator = this.paginator;
    }

    showCancelDialog(appointmentId) {
      const dialogConfig =  new MatDialogConfig();
      dialogConfig.minHeight = '405px';
      dialogConfig.panelClass = 'dialog-container';
      dialogConfig.data = {appointmentId : appointmentId};
      this.matDialog.open(CancelAppointmentComponent, dialogConfig);
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    async executeSearch() {
    try {
      let data = await this.appointmentService.searchAppointment(this.myForm.value);
      if(data['status'] === 200) {
        this.data = data['body'];
        this.dataSource = new MatTableDataSource(data['body']);
        //console.log(this.dataSource);
        this.dataSource.paginator = this.paginator;
      }
    }catch (err) {
      console.log(err);
    }
    }

}
