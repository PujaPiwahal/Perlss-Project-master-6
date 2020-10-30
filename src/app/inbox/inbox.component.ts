import { Component, OnInit } from '@angular/core';
import { MedicalDiagonsis } from '../pae/Diagnosisdata';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
  meidicalDiagnosis:any;
  constructor(private medicalDiagonsis: MedicalDiagonsis) { }

  ngOnInit(): void {
    this.meidicalDiagnosis = this.medicalDiagonsis.data;
  }

}
