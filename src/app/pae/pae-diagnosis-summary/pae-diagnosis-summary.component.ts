import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pae-diagnosis-summary',
  templateUrl: './pae-diagnosis-summary.component.html',
  styleUrls: ['./pae-diagnosis-summary.component.scss']
})
export class PaeDiagnosisSummaryComponent implements OnInit {
  showDocumentationSection: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  gotoDetailPage() {
    this.router.navigate(['dashboard/pae/medicalDiagnosis']);
  }

}
