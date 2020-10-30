import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-lsa-form',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './lsa-form.component.html',
  styleUrls: ['./lsa-form.component.scss']
})
export class LsaFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  closePopup() { }

}
