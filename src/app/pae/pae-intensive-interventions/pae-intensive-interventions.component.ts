import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import * as InnterventionsData from './internsiveInterventionsData.json';

@Component({
  selector: 'app-pae-intensive-interventions',
  templateUrl: './pae-intensive-interventions.component.html',
  styleUrls: ['./pae-intensive-interventions.component.scss']
})
export class PaeIntensiveInterventionsComponent implements OnInit {
  paeIntensiveInterventionsForm: FormGroup;
  benefitsList: any;
  interventionsMap = new Map();
  interventionsMap2 = new Map();
  checkboxEvent: any;
  interventionsValue: any;


  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.benefitsList = InnterventionsData['default'];
    this.paeIntensiveInterventionsForm = this.fb.group({
      checkArray: this.fb.array([], [Validators.required])
    });

    for(const i of this.benefitsList){
      this.interventionsMap.set(
        i.name, i.value
      );
    }
    for(const j of this.benefitsList){
      this.interventionsMap2.set(
        j.name, j.formControlName 
      );
    }
    
  }

  changeEvent(event, interventionsValue) {
    console.log(event, interventionsValue);
    console.log(this.interventionsMap2.get(interventionsValue));  
    
    this.checkboxEvent = event;
    this.interventionsValue = this.interventionsMap2.get(interventionsValue);

    const interventionsArray = <FormArray>this.paeIntensiveInterventionsForm.controls.checkArray;
 
    if(this.checkboxEvent.checked) {
      interventionsArray.push(new FormControl(this.interventionsValue));
    }
    else {
      // let index = interventionsArray.controls.findIndex(x => x.value == {id});
      // interventionsArray.removeAt(index);
    }
    console.log(interventionsArray.controls);
  }

  saveIntensiveInterventions(): boolean {
    return true;
  }

  back() {
    const previousForm = 'PRAPIF';
  }

  saveAndExit() {
    
  }

}
