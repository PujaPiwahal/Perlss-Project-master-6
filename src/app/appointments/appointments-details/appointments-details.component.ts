import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {Form, FormBuilder, FormControl, FormGroup,Validators,FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { AppointmentAddUpdate } from 'src/app/_shared/model/AppointmentAddUpdate';
import * as customValidation from '../../_shared/constants/validation.constants';
import { MatRadioChange, MatRadioButton  } from '@angular/material/radio';
import { CustomvalidationService } from '../../_shared/utility/customvalidation.service';
import { AppointmentsService } from '../services/appointments.service';
//import * as AppointmentDetail from '../../../assets/data/appointment-detail.json';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as moment from 'moment';



interface AppointmentDetail {
  //applicantName : string;
  dobDt :string;
  intakeDueDt :string;
  paeId :string;
  personId :string;
  refId :string;
  refReceivedDt :string;
  ssn :string;
  personName : string;
  appointmentStatusCd: String;
}

@Component({
  selector: 'app-appointments-details',
  templateUrl: './appointments-details.component.html',
  styleUrls: ['./appointments-details.component.scss']
})
export class AppointmentsDetailsComponent implements OnInit {

  myForm: FormGroup;
  searchForm: FormGroup;
  range: FormGroup;
  dataSource: MatTableDataSource<any>;
  customValidation = customValidation;
  minDate: Date;
  maxDate: Date;
  id: string;
  details: AppointmentDetail;
  displayAddressForm: boolean;
  today = this.toDateTimeLocal(new Date());
  showAddressSection = false;


  toDateTimeLocal(date: Date) {
    const checkDate = (i) => {
      return (i < 10 ? '0' : '') + i;
    };
    return date.getFullYear() + '-' + checkDate(date.getMonth() + 1) + '-' + checkDate(date.getDate()) + 'T' + checkDate(date.getHours()) + ':' + checkDate(date.getMinutes());
  }


  constructor(private fb: FormBuilder,
    private customValidator: CustomvalidationService,
    private appointmentService: AppointmentsService,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar) {
  }

  addresses = [];

  ngOnInit(){
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 119, 0, 1);
    this.maxDate = new Date();
    this.myForm = this.fb.group({
    appointmentDt:  ['', [Validators.required]],
    appointmentTypeCd:  ['', [Validators.required]],
    contactMethodCd:  ['', [Validators.required]],
    //contactPersonSw:"O",
    appointmentId: null,
    paeId: null,
    personId: null,
    refId: null,
    reqPageId:'string',
    //appointmentStatusCd : null
  });

    this.activatedRoute.params.subscribe((params) => {
      if(params && params['id']) {
        console.log(params);
        this.id = params['id'];
        this.myForm.controls.appointmentId.setValue(Number(this.id));
        this.getAppointment();
        // this.myForm.patchValue(JSON.parse(JSON.stringify(AppointmentDetail))['default'][0]);
        // this.addresses = JSON.parse(JSON.stringify(AppointmentDetail))['default'][0]['applicantAddressVO'];
        // console.log(this.addresses);
        // this.myForm.controls.appointmentStatus.value == 'Scheduled' ? this.myForm.addControl('appointmentStatusCd', this.fb.control(null, Validators.required)) : null;
        // this.myForm.controls.appointmentStatus.value !== 'Scheduled' ? this.myForm.controls.appointmentTypeCd.setValue('Intake Visit') : null;
      }
    });


}
  openSnackBar(message: string, className: string) {
    this._snackBar.open(message,'',{
      duration: 2000,
      verticalPosition: 'top',
      panelClass: className
    });
  }
  statusChange(value: string) {
    if(value && value == 'CA') {
      this.myForm.addControl('cancelReasonCd',this.fb.control(null, [Validators.required]));
    }else {
      this.myForm.contains('cancelReasonCd') ? this.myForm.removeControl('cancelReasonCd') : null;
    }
  }

  reasonChange(value: string) {
    if(value && value == 'Others') {
      this.myForm.addControl('notes',this.fb.control(null, [Validators.required]));
    }else {
      this.myForm.contains('notes') ? this.myForm.removeControl('notes') : null;
    }
  }

  contactChange(value: string) {
    if(value && value == 'IP') {
      this.showAddressSection = true;
      this.myForm.contains('telephoneNumber') ? this.myForm.removeControl('telephoneNumber') : null;
    }else if(value && value == 'TE') {
      this.myForm.addControl('telephoneNumber',this.fb.control(null, [Validators.required, Validators.pattern('[0-9]{10}')]));
      this.myForm.contains('appointmentAddressVO') ? this.myForm.removeControl('appointmentAddressVO') : null;
      this.showAddressSection = false;
    }else {
      this.myForm.contains('telephoneNumber') ? this.myForm.removeControl('telephoneNumber') : null;
      this.myForm.contains('appointmentAddressVO') ? this.myForm.removeControl('appointmentAddressVO') : null;
      this.showAddressSection = false;
    }
  }
showAddressForm(value: string) {
  this.myForm.addControl('appointmentAddressVO', this.fb.group({
    addrLine1: ['', [Validators.required, Validators.maxLength(100), this.customValidator.addressAndCityValidator()]],
    addrLine2: ['', [Validators.maxLength(50), this.customValidator.addressAndCityValidator()]],
    city: ['', [Validators.required, Validators.maxLength(25), this.customValidator.addressAndCityValidator()]],
    stateCd: ['', [Validators.required]],
    zip: ['', [Validators.required, Validators.pattern('[0-9]{5}')]],
    ext: ['', Validators.pattern('[0-9]{4}')],
    cntyCd: ['', [Validators.required]]
  }));
    if(value == 'others') {
      this.myForm.controls.appointmentAddressVO.reset();
      this.displayAddressForm = true;
    }else {
      this.addresses = this.addresses.map(a => ({...a, isActive: (() => {
        return JSON.stringify(a) == JSON.stringify(value);
        })()}));
      this.myForm.controls.appointmentAddressVO.patchValue(value);
      (<FormGroup>(this.myForm.controls.appointmentAddressVO)).controls.zip.setValue(value['zipCode']);
      // this.myForm.contains('appointmentAddressVO') ? this.myForm.removeControl('appointmentAddressVO') : null;
      this.displayAddressForm = false;
    }
}

validateAddress() {
   return  this.addresses.some(({ addrLine1,addrLine2,city,stateCd,zipcode,ext,cntyCd}) => {
      let add = {
        addrLine1,
        addrLine2,
        city,
        stateCd,
        zip: zipcode,
        ext,
        cntyCd
    };
      return JSON.stringify(add) == JSON.stringify(this.myForm.value['appointmentAddressVO']);
    })
}

get f() { return this.myForm.controls; }

get childFormGroup() { return (<FormGroup>(this.myForm.controls.appointmentAddressVO)).controls }

 addValidator(key) {
  return (<FormGroup>(this.myForm.controls.appointmentAddressVO)).get(key);
}

getFormData() {
  return this.myForm.controls;
}

async addAppointment() {
    //if(this.myForm.valid) {
      // if(this.validateAddress()) {
      //   this.openSnackBar('Address Already Exists', 'dialog-error');
      //   return;
      // }
      try {

        let response = await this.appointmentService[`${this.details['appointmentStatusCd'] == 'SC' || this.details['appointmentStatusCd'] == 'RE'? 'updateAppointment' : 'addAppointment'}`]({
          ...this.myForm.value,
          appointmentDate: this.myForm.value['appointmentDt'],
          ...this.details['appointmentStatusCd'] == '' && {appointmentStatusCd: 'SC'}
        });
        // this.myForm.reset();
        this.openSnackBar(response['body']['successMsgDescription'], 'dialog-success');
        console.log(response);
      } catch (e) {
        this.openSnackBar('Internal Server Error', 'dialog-error');
      }
    //}
}

  async getAppointment() {
      try {
        const response = await this.appointmentService.getAppointment(this.id);
        if(response['body']) {
          console.log(response['body']);
         this.details = response['body'];
         this.myForm.patchValue(this.details);
         if(this.myForm.value['contactMethodCd'] == 'IP') {
           this.contactChange(this.myForm.value['contactMethodCd']);
         }
          if(this.myForm.value['contactMethodCd'] == 'TE') {
            this.contactChange(this.myForm.value['contactMethodCd']);
            this.myForm.controls.telephoneNumber.setValue((this.details['telephoneNumber']));
          }

          // if(this.myForm.value['contactMethodCd'] == 'TE') {
          //   this.contactChange(this.myForm.value['contactMethodCd']);
          //   this.myForm.controls.telephoneNumber.setValue((this.details['telephoneNumber']));
          // }


         this.addresses = this.details['appointmentAddressVO'] ? [...this.details['applicantAddressVO'], {
           ...this.details['appointmentAddressVO'],
           type: 'appointmentAddress',
           isActive: true
         }]  : this.details['applicantAddressVO'];

          this.details['appointmentStatusCd'] == 'SC' || this.details['appointmentStatusCd'] == 'RE' || this.details['appointmentStatusCd'] == 'CA' ? this.myForm.addControl('appointmentStatusCd', this.fb.control(null, Validators.required)) : null;
          this.details['appointmentStatusCd'] == '' ? this.myForm.controls.appointmentTypeCd.setValue('IV') : null;
          this.details['appointmentStatusCd'] == 'SC' || this.details['appointmentStatusCd'] == 'RE' || this.details['appointmentStatusCd'] == 'CA' ? this.myForm.controls.appointmentDt.setValue(this.toDateTimeLocal(new Date(this.details['appointmentDate']))) : null;
          this.details['appointmentStatusCd'] == 'SC' || this.details['appointmentStatusCd'] == 'RE' || this.details['appointmentStatusCd'] == 'CA' ? this.myForm.controls.appointmentTypeCd.setValue(this.details['appointmentTypeCd']) : null;
          this.details['appointmentStatusCd'] == 'SC' || this.details['appointmentStatusCd'] == 'RE' || this.details['appointmentStatusCd'] == 'CA' ? this.myForm.controls.appointmentStatusCd.setValue(this.details['appointmentStatusCd']) : null;
        }
      } catch (e) {
        console.log(e);
      }
  }

}
