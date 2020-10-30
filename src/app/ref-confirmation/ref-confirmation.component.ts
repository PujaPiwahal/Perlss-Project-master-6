import { Component, OnInit } from '@angular/core';
import { ReferralService } from '../core/services/referral/referral.service';

@Component({
  selector: 'app-ref-confirmation',
  templateUrl: './ref-confirmation.component.html',
  styleUrls: ['./ref-confirmation.component.scss']
})
export class RefConfirmationComponent implements OnInit {

  constructor(private referralService: ReferralService) { }

  refId: string;
  
  ngOnInit(): void {
    this.refId=this.referralService.getRefId();
  }

}
