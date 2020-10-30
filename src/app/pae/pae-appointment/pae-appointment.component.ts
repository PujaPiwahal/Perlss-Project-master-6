import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {Form, FormBuilder, FormControl, FormGroup,Validators,FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import * as customValidation from '../../_shared/constants/validation.constants';
import { MatRadioChange, MatRadioButton  } from '@angular/material/radio';
import { CustomvalidationService } from '../../_shared/utility/customvalidation.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { PaeAppointment } from '../../_shared/model/PaeAppointment'
import { PaeAppointmentSearch } from '../../_shared/model/PaeAppointmentSearch'
import { PaeService } from '../../core/services/pae/pae.service'



@Component({
  selector: 'app-pae-appointment',
  templateUrl: './pae-appointment.component.html',
  styleUrls: ['./pae-appointment.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PaeAppointmentComponent implements OnInit {
  
  paeFormGroup: FormGroup;
  customValidation = customValidation;
  expandedElement: PaeAppointmentSearch | null;
  paeAppointmentSearchRes: string[] = ['appointmentDt', 'typeOfContact', 'contactMethodCd', 'appoinementStatus',
  'contactUser'];
  columnHeaderName: {[key: string]: string} = {};
  dataSource: PaeAppointmentSearch[] = []
  contactWithPersons: string[] = ['Yes', 'No'];
  constructor(fb: FormBuilder, private customValidationService: CustomvalidationService,
      private paeService: PaeService
      ) {
    this.paeFormGroup = fb.group({
      hadContactWithPerson: [null,[Validators.required]],
      appointmentDate: [new Date(), [Validators.required, this.customValidationService.datePriorToInitialDate(), this.customValidationService.dateInPast()]],
      contactMethod: ['',[Validators.required]],
      addressAvailable: ['',[Validators.required]],
      addressLineOne: ['',[Validators.required, this.customValidationService.specialCharacterValidator(), Validators.maxLength(100)]],
      addressLineTwo: [''],
      ext: ['', [this.customValidationService.specialCharacterValidator(), Validators.max(9999)]],
      cityName: ['',[Validators.required, this.customValidationService.specialCharacterValidator()]],
      stateName: ['',[Validators.required]],
      countryName: ['',[Validators.required]],
      zipCode: ['',[Validators.required, this.customValidationService.postalCodeValidator()]]
    })
  }
ngOnInit() {
  this.getPaeAppoinement(); 
  this.columnHeaderName = {appointmentDt: 'Appointment Date', typeOfContact: 'Type Of Contact', contactMethodCd: 'Contact Method', appoinementStatus: 'Appointment Status', contactUser: 'Contact User'};
}
savePae(){
  this.markFormGroupTouched(this.paeFormGroup);
  if(this.paeFormGroup.valid) {
      const formValue = this.paeFormGroup.value;
      const paeAppointmentValue = new PaeAppointment(
        formValue.addressLineOne,
        formValue.addressLineTwo,
        formValue.cityName,
        formValue.countryName,
        formValue.ext,
        0,
        formValue.stateName,
        formValue.zipCode,
        formValue.appointmentDt,
        "O",
        "O",
        "O",
        formValue.contactMethod,
        "123",
        "PAE1000080",
        8000001,
        0
      );
      this.paeService.savePae(paeAppointmentValue).then(response=> {
      console.log(response);
      })
  }
} 
GetApplicantAddress() {
//TODO: Pass correct personid from UI
  this.paeService.getApplicantAddress(8000001).then((response)=> {
    //TODO: Logic to set applicant address
  })
} 

getPaeAppoinement() {
//TODO: Pass correct personid from UI
  this.paeService.getPaeAppoinement('PAE1000080').then((response)=> {
    this.dataSource = response.body;
  })
} 

  
goNext() {
  this.markFormGroupTouched(this.paeFormGroup);
}
back(){
  this.markFormGroupTouched(this.paeFormGroup);
}


get hadContactWithPerson() {
  return this.paeFormGroup.get('hadContactWithPerson');
}


markFormGroupTouched = (formGroup) => {
  (<any>Object).values(formGroup.controls).forEach(control => {
    control.markAsTouched();

    if (control.controls) {
      this.markFormGroupTouched(control);
    }
  });
};

}