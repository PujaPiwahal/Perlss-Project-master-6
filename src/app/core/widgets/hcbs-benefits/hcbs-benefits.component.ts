import { Component, OnInit } from '@angular/core';
import * as BenefitsData from './benefits-data.json';
import {PageEvent} from '@angular/material/paginator';
import * as BenefitsRequestData from './benefits-request-data.json';

@Component({
  selector: 'app-hcbs-benefits',
  templateUrl: './hcbs-benefits.component.html',
  styleUrls: ['./hcbs-benefits.component.scss']
})
export class HcbsBenefitsComponent implements OnInit {
  benefitsList: any;
  length = 20;
  pageSize = 10;
  pageEvent: PageEvent;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  benefitsTitle = 'HCBS BENEFITS';
  constructor() { }

  ngOnInit(): void {
    this.benefitsList = BenefitsData;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }


  onPageChange(event) {
    console.log('event====', event.pageIndex);
    if (event.pageIndex === 1) {
        this.benefitsList = BenefitsRequestData;
        this.benefitsTitle = 'REQUESTED ECF CHOICES BENEFITS';
    } else {
      this.benefitsList = BenefitsData;
      this.benefitsTitle = 'HCBS BENEFITS';
    }
  }


}
