import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as customValidation from '../../../../_shared/constants/validation.constants';
import { CustomvalidationService } from '../../../../_shared/utility/customvalidation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommitteeReviewForm } from './../../../../_shared/model/Forms/CommitteeReviewForm';
import { CommitteReviewFormservice } from './../../../../core/services/referral/referral-intake/committe-review-form.service';


@Component({
  selector: 'app-committee-review-form',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './committee-review-form.component.html',
  styleUrls: ['./committee-review-form.component.scss']
})
export class CommitteeReviewFormComponent implements OnInit {
  committeeReviewForm: FormGroup;
  customValidation = customValidation;
  submitted = false;

  constructor(private fb: FormBuilder,
              private customValidator: CustomvalidationService,
              private committeReviewFormservice: CommitteReviewFormservice,
              public dialogRef: MatDialogRef<CommitteeReviewFormComponent>) { }

  ngOnInit(): void {
    this.committeeReviewForm = this.fb.group({
      intakeOutcomeId: [null],
      credentialsCd: ['', [Validators.required]],
      ecfQualAssessor: ['', [Validators.required]],
      electronicSignature: ['', [Validators.required]],
      indvAgingOutFosterSw: ['', [Validators.required]],
      indvAgingOutFosterTxt: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],
      indvTransCrimJustSw: ['', [Validators.required]],
      indvTransCrimJustTxt: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],
      indvTransFamilyHmSw: ['', [Validators.required]],
      indvTransFamilyHmTxt: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],
      mcoRecommSw:['', [Validators.required]]
    });
  }

  getFormData() {
    return this.committeeReviewForm.controls;
  }

  async onSubmit() {
    this.submitted = true;
    try {
      if(this.committeeReviewForm.valid && this.submitted) {
        const response = await this.committeReviewFormservice.saveCommitteReviewForm({
          ...this.committeeReviewForm.value,
        });
        console.log(response);
    }

    } catch (e) {
      console.log(e);
    }
  }

  saveForm(form) {
    const data = '';
    if (this.committeeReviewForm.valid && this.submitted) {
      const response = this.committeReviewFormservice.saveCommitteReviewForm(form);
      // tslint:disable-next-line: no-shadowed-variable
      response.then(data => {
        data = data.body;
        this.closePopup();
        console.log(data);
      });
    }
  }

  closePopup() {
    this.dialogRef.close();
  }
}
