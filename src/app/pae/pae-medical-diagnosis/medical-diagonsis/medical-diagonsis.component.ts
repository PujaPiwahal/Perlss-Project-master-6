import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-medical-diagonsis',
  templateUrl: './medical-diagonsis.component.html',
  styleUrls: ['./medical-diagonsis.component.scss']
})
export class MedicalDiagonsisComponent implements OnInit {
  selectedMenu: string;
  constructor() { }

  ngOnInit(): void {
    this.selectedMenu = localStorage.getItem('selectedMenu');
  }



}
