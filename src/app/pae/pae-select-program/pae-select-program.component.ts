import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pae-select-program',
  templateUrl: './pae-select-program.component.html',
  styleUrls: ['./pae-select-program.component.scss']
})
export class PaeSelectProgramComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  setSelectedMenu(value) {
    localStorage.setItem('selectedMenu', value);
  }

}
