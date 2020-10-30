import { RefLivingArrangement } from '../../_shared/model/RefLivingArrangement';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReferralService } from '../../core/services/referral/referral.service';
import { RefAppContact } from '../../_shared/model/RefAppContact';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { ReferralFlowSeq } from '../../_shared/utility/ReferralFlowSeq';
import * as customValidation from '../../_shared/constants/validation.constants';
import { CustomvalidationService } from '../../_shared/utility/customvalidation.service';
import { SavePopupComponent } from '../../savePopup/savePopup.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
@Component({
  selector: 'app-ref-contact',
  templateUrl: './ref-contact.component.html',
  styleUrls: ['./ref-contact.component.scss'],
})
export class RefContactComponent implements OnInit {
  @Output() completedContact: EventEmitter<any> = new EventEmitter<any>();
  customValidation = customValidation;

  refContactForm: FormGroup;
  isDesignee = false;
  personId: string;
  interpreterSW = false;
  designeeMailSW = false;
  ageSW = false;
  addrFormatSW = false;
  othLivingArrange = false;
  livingSelfSw = false;
  livingFamilySw = false;
  livingElseSw = false;
  moveOutSoonSw = false;
  helpRightAwaySw = false;
  lostPlaceSw = false;
  anotherPlaceSw = false;
  nursingHomeSW = false;
  otherfacilityCD = false;
  nextPath: string;
  nextForm: string;
  event: string;
  submitted = false;
  isPhoneUpdated = false;
  iscellphoneUpdated = false;
  isworkphoneUpdated = false;
  ishomephoneUpdated = false;
  constructor(
    private fb: FormBuilder,
    private refService: ReferralService,
    private router: Router,
    private customValidator: CustomvalidationService,
    private dialog: MatDialog
  ) {}

  getFormData() {
    return this.refContactForm.controls;
  }

  ngOnInit(): void {
    this.refContactForm = this.fb.group({
      anotherPlaceSw: [''],
      cellPhNum: [''],
      workPhNum: [''],
      homePhNum: ['', [Validators.maxLength(10), this.customValidator.phonenumberValidator()]],
      prefPhoneTypCd: ['', Validators.required],
      currentLivingCd: ['', [Validators.required]],
      designeeSw: [''],
      dsgnAaAeApCd: [''],
      dsgnAddrL2Dsgn: ['', [Validators.maxLength(50), this.customValidator.addressAndCityValidator()]],
      dsgnAddrLine1: ['', [Validators.maxLength(100), this.customValidator.addressAndCityValidator()]],
      dsgnAddressFormatCd: [''],
      dsgnApoFpoCd: [''],
      dsgnCity: ['', [Validators.maxLength(25), this.customValidator.addressAndCityValidator()]],
      dsgnCntyCd: ['', [Validators.maxLength(25), this.customValidator.addressAndCityValidator()]],
      dsgnFirstName: ['', [Validators.maxLength(45), this.customValidator.nameValidator()]],
      dsgnLastName: ['', [Validators.maxLength(45), this.customValidator.nameValidator()]],
      dsgnMailSw: [''],
      dsgnMidInitial: ['', [this.customValidator.nameValidator()]],
      dsgnStateCd: [''],
      dsgnZipExtn: ['', Validators.pattern('[0-9]')],
      dsgnZipcode: ['', [Validators.pattern('[0-9]{5}'), this.customValidator.specialCharacterValidator()]],
      emailAddr: ['', [Validators.required, this.customValidator.emailValidator()]],
      facilityCd: [''],
      facilityOther: [''],
      helpRightAwaySw: ['', Validators.required],
      interprtSw: [''],
      langCd: [''],
      livingElseSw: [''],
      livingFamilySw: [''],
      livingSelfSw: [''],
      lostPlaceSw: ['', Validators.required],
      moveOutSoonSw: ['', Validators.required],
      needServicesSw: [''],
      othLivingArrange: [''],
      relationshipCd: [''],
      dsgnPhNum: ['', [Validators.maxLength(10), this.customValidator.phonenumberValidator()]],
      livingCd: ['', Validators.required],
      preflangCd: ['', Validators.required],
    });
    const age = this.refService.getAge();

    if (age >= 18) {
      this.ageSW = true;
      this.getFormData().designeeSw.setValidators(Validators.required);
      this.getFormData().designeeSw.updateValueAndValidity();
    } else {
      this.getFormData().designeeSw.clearValidators();
      this.getFormData().designeeSw.updateValueAndValidity();
    }
  }
  get f() {
    return this.refContactForm.controls;
  }

  saveAndExit() {
    this.event = 'SaveAndExit';
    this.saveRefandContact(true);
  }
  showSaveAndExitPopup() {
    const dialogConfig = new MatDialogConfig();
      dialogConfig.data = { route: 'dashboard/referral' };
      dialogConfig.panelClass="exp_popup";
      dialogConfig.width = "500px";
      this.dialog.open(SavePopupComponent, dialogConfig);
  }

  next() {
    this.event = 'Next';
    this.submitted = true;
    console.log(this.getFormData());
    if (this.refContactForm.valid) {
      this.saveRefandContact();
    }
  }
  saveRefandContact( showPopup?: boolean) {
    const refId = this.refService.getRefId();
    this.personId = this.refService.getPersonId();
    const refLivingArrangementVO = new RefLivingArrangement(
      this.getFormData().anotherPlaceSw.value,
      this.getFormData().currentLivingCd.value,
      null,
      null,
      null,
      null,
      this.sendingYorN(this.helpRightAwaySw),
      '0',
      this.sendingYorN(this.livingElseSw),
      this.sendingYorN(this.livingFamilySw),
      this.sendingYorN(this.livingSelfSw),
      this.sendingYorN(this.lostPlaceSw),
      this.sendingYorN(this.moveOutSoonSw),
      this.getFormData().needServicesSw.value,
      this.getFormData().othLivingArrange.value,
      this.personId,
      refId,
      'PRCIFO'
    );

    const refAppContact = new RefAppContact(
      this.getFormData().cellPhNum.value,
      this.getFormData().dsgnPhNum.value,
      this.getFormData().designeeSw.value,
      this.getFormData().dsgnAddrLine1.value,
      this.getFormData().dsgnAddrL2Dsgn.value,
      this.getFormData().dsgnAddressFormatCd.value,
      this.getFormData().dsgnCity.value,
      this.getFormData().dsgnCntyCd.value,
      this.getFormData().dsgnFirstName.value,
      this.getFormData().dsgnLastName.value,
      this.sendingYorN(this.designeeMailSW),
      this.getFormData().dsgnMidInitial.value,
      this.getFormData().dsgnAaAeApCd.value,
      this.getFormData().dsgnApoFpoCd.value,
      this.getFormData().dsgnStateCd.value,
      this.getFormData().dsgnZipExtn.value,
      this.getFormData().dsgnZipcode.value,
      this.getFormData().emailAddr.value,
      this.getFormData().homePhNum.value,
      '0',
      this.sendingYorN(this.interpreterSW),
      this.getFormData().langCd.value,
      this.personId,
      this.getFormData().preflangCd.value,
      this.getFormData().prefPhoneTypCd.value,
      refId,
      this.getFormData().relationshipCd.value,
      'PRCIFO',
      this.getFormData().workPhNum.value,
      refLivingArrangementVO
    );

    const response = this.refService.saveRefContact(refAppContact);
    this.nextForm = 'PRSAWK';
    const that = this;
    response.then(function(response: HttpResponse<any>) {
      if (showPopup) {
        this.showSaveAndExitPopup();
      } else {
      	that.nextForm = response.headers.get('next');
      response = response.body;
        that.nextPath = ReferralFlowSeq[that.nextForm];
      if (that.event === 'Next') {
        that.completedContact.emit(ReferralFlowSeq[that.nextForm]);
        }
      }
    });
  }

  sendingYorN(input: boolean) {
    if (input === true) {
      return 'Y';
    } else if (input === false) {
      return 'N';
    }
  }

  onDesigneeChange(mrChange: MatRadioChange) {
    if (mrChange.value === 'Y') {
      this.refContactForm
        .get('dsgnFirstName')
        .setValidators(Validators.required);
      this.refContactForm
        .get('dsgnLastName')
        .setValidators(Validators.required);
      this.refContactForm
        .get('relationshipCd')
        .setValidators(Validators.required);
      this.refContactForm
        .get('dsgnPhNum')
        .setValidators([
          Validators.required,
          Validators.maxLength(10),
          this.customValidator.phonenumberValidator(),
        ]);
      this.refContactForm.get('interprtSw').setValidators(Validators.required);
      this.refContactForm.get('langCd').setValidators(Validators.required);
      this.refContactForm
        .get('dsgnAddressFormatCd')
        .setValidators(Validators.required);
      this.refContactForm
        .get('dsgnAddrLine1')
        .setValidators(Validators.required);
      this.refContactForm.get('dsgnCity').setValidators(Validators.required);
      this.refContactForm.get('dsgnStateCd').setValidators(Validators.required);
      this.refContactForm.get('dsgnZipcode').setValidators(Validators.required);
      this.refContactForm.get('dsgnCntyCd').setValidators(Validators.required);
      this.isDesignee = true;
    } else if (mrChange.value === 'N') {
      this.refContactForm.get('dsgnFirstName').clearValidators();
      this.refContactForm.get('dsgnLastName').clearValidators();
      this.refContactForm.get('relationshipCd').clearValidators();
      this.refContactForm.get('dsgnPhNum').clearValidators();
      this.refContactForm.get('interprtSw').clearValidators();
      this.refContactForm.get('langCd').clearValidators();
      this.refContactForm.get('dsgnAddressFormatCd').clearValidators();
      this.refContactForm.get('dsgnAddrLine1').clearValidators();
      this.refContactForm.get('dsgnCity').clearValidators();
      this.refContactForm.get('dsgnStateCd').clearValidators();
      this.refContactForm.get('dsgnZipcode').clearValidators();
      this.refContactForm.get('dsgnCntyCd').clearValidators();
      this.isDesignee = false;
    }
  }

  onInterpreterChange(mrChange: MatRadioChange) {
    if (mrChange.value === 'Y') {
      this.interpreterSW = true;
    } else if (mrChange.value === 'N') {
      this.interpreterSW = false;
    }
  }

  onDesigneeMailChange(mrChange: MatRadioChange) {
    if (mrChange.value === 'N') {
      this.designeeMailSW = false;
    } else if (mrChange.value === 'Y') {
      this.designeeMailSW = true;
    }
  }
  onMoveOutSoon(mrChange: MatRadioChange) {
    if (mrChange.value === 'N') {
      this.moveOutSoonSw = false;
    } else if (mrChange.value === 'Y') {
      this.moveOutSoonSw = true;
    }
  }

  onlostPlaceChange(mrChange: MatRadioChange) {
    if (mrChange.value === 'N') {
      this.lostPlaceSw = false;
    } else if (mrChange.value === 'Y') {
      this.refContactForm
        .get('anotherPlaceSw')
        .setValidators(Validators.required);
      this.lostPlaceSw = true;
    }
  }

  onhelpRightAwayChange(mrChange: MatRadioChange) {
    if (mrChange.value === 'N') {
      this.helpRightAwaySw = false;
    } else if (mrChange.value === 'Y') {
      this.helpRightAwaySw = true;
    }
  }

  onAnotherPlaceChange(mrChange: MatRadioChange) {
    if (mrChange.value === 'N') {
      this.anotherPlaceSw = false;
    } else if (mrChange.value === 'Y') {
      this.anotherPlaceSw = true;
    }
  }

  onPhoneType(value: string) {
    const cellPhNum = this.refContactForm.get('cellPhNum');
    const workPhNum = this.refContactForm.get('workPhNum');
    const homePhNum = this.refContactForm.get('homePhNum');
    if (value === 'cellPhone') {
      cellPhNum.setValidators([
        Validators.required,
        Validators.maxLength(10),
        this.customValidator.phonenumberValidator(),
      ]);
      homePhNum.clearValidators();
      workPhNum.clearValidators();
    } else if (value === 'homePhone') {
      cellPhNum.clearValidators();
      workPhNum.clearValidators();
      homePhNum.setValidators(Validators.required);
    } else if (value === 'workPhone') {
      cellPhNum.clearValidators();
      homePhNum.clearValidators();
      workPhNum.setValidators([
        Validators.required,
        Validators.maxLength(10),
        this.customValidator.phonenumberValidator(),
      ]);
    }
    cellPhNum.updateValueAndValidity();
    workPhNum.updateValueAndValidity();
    homePhNum.updateValueAndValidity();
  }
  onAddressFormat(event) {
    if (event.target.value === 'MLTY') {
      this.addrFormatSW = true;
    } else {
      this.addrFormatSW = false;
    }
  }

  onCurrentLivingArrangement(event) {
    if (event.target.value === 'Other') {
      this.refContactForm
        .get('othLivingArrange')
        .setValidators(Validators.required);
      this.othLivingArrange = true;
      this.nursingHomeSW = false;
    } else if (
      event.target.value === 'Nursing Home' ||
      event.target.value === 'ICF'
    ) {
      this.refContactForm
        .get('needServicesSw')
        .setValidators(Validators.required);
      this.refContactForm.get('facilityCd').setValidators(Validators.required);
      this.refContactForm
        .get('facilityOther')
        .setValidators(Validators.required);
      this.nursingHomeSW = true;
      this.othLivingArrange = false;
    }
  }

  onFacilityCd(event) {
    if (event.target.value === 'Other') {
      this.otherfacilityCD = true;
    }
  }

  onLivingChange(mrChange: MatRadioChange) {
    console.log(mrChange.value);
    if (mrChange.value === 'livingByMySelf') {
      this.livingSelfSw = true;
    } else if (mrChange.value === 'livingFamily') {
      this.livingFamilySw = false;
    } else if (mrChange.value === 'livingelse') {
      this.livingElseSw = false;
    }
  }

  back() {
    const previousForm = 'PRAPIF';
    this.completedContact.emit(ReferralFlowSeq[previousForm]);
  }
}
