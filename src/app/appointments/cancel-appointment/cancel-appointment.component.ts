import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as customValidation from '../../_shared/constants/validation.constants';
import {AppointmentsService} from '../services/appointments.service';
import {Router} from "@angular/router";

interface ReferenceTable {
  code: string;
  description: string;
}

@Component({
  selector: 'app-cancel-appointment',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cancel-appointment.component.html',
  styleUrls: ['./cancel-appointment.component.scss']
})
export class CancelAppointmentComponent implements OnInit {
  cancelForm: FormGroup;
  cancellationReasons: any[] = [{"name": "", "value":"Select an option","activateSW":"Y"}];
  customValidation = customValidation;
  constructor(
    public dialogRef: MatDialogRef<CancelAppointmentComponent>,
    private fb: FormBuilder,
    private appointmentService: AppointmentsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,  ) { }

  ngOnInit(): void {
      this.appointmentService.getCancellationReasonCodes().subscribe(res =>
      {
        if(res && res.length > 0) {
          this.cancellationReasons = [...this.cancellationReasons,...res];
        }
      } );
  	 this.cancelForm = this.fb.group({
      cancellationReason: ['', [Validators.required]],
      notes: ['']

    });
  }

  get f() { return this.cancelForm.controls; }

  close() {
  	this.dialogRef.close();
  }

  cancelAppointment() {
  	if (this.cancelForm.invalid) {
  		return;
  	}
  	if(this.data.appointmentId) {
      let payload = {
        appointmentId: this.data.appointmentId,
        cancelReasonCd:this.f.cancellationReason.value,
        cancelReasonNotes: this.f.notes.value
      };

      this.appointmentService.cancelAppointment(payload).subscribe(res => {
        console.log("msg "+res.successMsgDescription);
        this.close();
        this.router.navigate([`/dashboard/appointments/detail/${this.data.appointmentId}`]);
      });
      console.log('submitting form data');
    }

  }

}