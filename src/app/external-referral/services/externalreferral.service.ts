import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http/';
import { Observable, Subject, of } from 'rxjs';
import { EnvService } from '../../_shared/utility/env.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { RefApplicantDetail } from '../../_shared/model/RefApplicantDetail';
import { RefSchAndWork } from '../../_shared/model/RefSchAndWork';
import { RefSubmission } from '../../_shared/model/RefSubmission';
import { RefAppContact } from '../../_shared/model/RefAppContact';
import { RefCareAndSupport } from '../../_shared/model/RefCareAndSupport';
import { Applicant } from '../../_shared/model/Applicant';
import { ApplicantAddress } from '../../_shared/model/ApplicantAddress';
//import { ExtReferralStart } from '../../_shared/model/ExtReferralStart';


@Injectable({
  providedIn: 'root'
})
export class ExternalreferralService {
  id: string;
  response: any;
  public serverApiUrl: any;
  applicantAdd : ApplicantAddress;

  private startReferralSource: Subject<FormGroup> = new Subject();
  stepOne: Observable<FormGroup> = this.startReferralSource.asObservable();

  private applicantInfoSource: Subject<FormGroup> = new Subject();
  stepTwo: Observable<FormGroup> = this.applicantInfoSource.asObservable();
  
  private contactInfoSource: Subject<FormGroup> = new Subject();
  stepThree: Observable<FormGroup> = this.contactInfoSource.asObservable();

  private schoolWorkSource: Subject<FormGroup> = new Subject();
  stepFour: Observable<FormGroup> = this.schoolWorkSource.asObservable();

  private careSupportSource: Subject<FormGroup> = new Subject();
  stepFive: Observable<FormGroup> = this.careSupportSource.asObservable();

  private submitReferralSource: Subject<FormGroup> = new Subject();
  stepSix: Observable<FormGroup> = this.submitReferralSource.asObservable();
  
  mainForm: FormGroup = this._formBuilder.group({
    refStartVO: RefApplicantDetail,
    refApplicantVO: Applicant,
    refAppContactDtlVO: RefAppContact,
    refSchAndWorkVO:RefSchAndWork,
    refCareAndSupportVO:RefCareAndSupport,
    refSubmissionVO:RefSubmission
  })

  
  constructor(private http: HttpClient,
    private envService: EnvService,
    private _formBuilder: FormBuilder) {
      this.serverApiUrl = this.envService.apiUrl();
      this.stepOne.subscribe(form =>
        form.valueChanges.subscribe(val => {
          // this.mainForm.value.extRefStartElement.intelDisableSw = val.intelDisableSw
          this.mainForm.controls.refStartVO.patchValue(val);
          //this.myForm.controls.appointmentAddressVO.patchValue(value);
        })
      )
      this.stepTwo.subscribe(form =>
        form.valueChanges.subscribe(val => {
          this.mainForm.controls.refApplicantVO.patchValue(val);
        })
      )
      this.stepThree.subscribe(form =>
        form.valueChanges.subscribe(val => {
          this.mainForm.controls.refAppContactDtlVO.patchValue(val);
        })
      )
      this.stepFour.subscribe(form =>
        form.valueChanges.subscribe(val => {
          this.mainForm.controls.refSchAndWorkVO.patchValue(val);
        })
      )
      this.stepFive.subscribe(form =>
        form.valueChanges.subscribe(val => {
          this.mainForm.controls.refCareAndSupportVO.patchValue(val);
        })
      )
      this.stepSix.subscribe(form =>
        form.valueChanges.subscribe(val => {
          this.mainForm.controls.refSubmissionVO.patchValue(val);
        })
      )
     }

     stepReady(form: FormGroup, part) {
      switch (part) {
        case 'one': { this.startReferralSource.next(form) }
        case 'two': { this.applicantInfoSource.next(form) }
        case 'three': { this.contactInfoSource.next(form) }
        case 'four': { this.schoolWorkSource.next(form) }
        case 'five': { this.careSupportSource.next(form) }
        case 'six': { this.submitReferralSource.next(form) }
      }
    }
}
