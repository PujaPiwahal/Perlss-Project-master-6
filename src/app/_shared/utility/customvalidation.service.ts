import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class CustomvalidationService {

  constructor() { }

  nameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^[a-zA-Z][a-zA-Z0-9\-\' ]+$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidName: true };
    };
  }

  addressAndCityValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^[a-zA-Z0-9]*$');
      const valid = regex.test(control.value);
      return valid ? null : { invalid: true };
    };
  }

  specialCharacterValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^[^<>{}\"/|;:.,~!?@#$%^=&*\\]\\\\()\\[¿§«»ω⊙¤°℃℉€¥£¢¡®©0-9_+]*$');
      const valid = regex.test(control.value);
      return valid ? null : { invalid: true, specialCharacterValidator: true };
    };
  }
  emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
      const valid = regex.test(control.value);
      return valid ? null : { invalidEmail: true };
    };
  }
  phonenumberValidator(): ValidatorFn {
console.log("inside validator before if");
    return (control: AbstractControl): { [key: string]: any } => {
      console.log("inside validator", control.value)
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^[0-9]*$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPhone: true };
    };
  }
  
  datePriorToInitialDate(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
       if (!control.value) {
         return null;
       }
       const priorDate = new Date('01/01/1901');
       const valid = priorDate < control.value;
       return valid ? null : { datePriorToInitialDate: true };
     }; 
   }
 
   dateInPast(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
       if (!control.value) {
         return null;
       }
       const currentDate = new Date(new Date().getTime() - (60 * 1000));
       const valid = currentDate < control.value;
       return valid ? null : { dateInPast: true };
     }; 
   }
 
   

  postalCodeValidator(): ValidatorFn {

    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp(/(^\d{5}$)|(^\d{5}-\d{4}$)/);
      const valid = regex.test(control.value);
      return valid ? null : { postalCodeValidator: true };
    }
  }

ssnValidator(): ValidatorFn {   
  return (control: AbstractControl): { [key: string]: any } => {
    if (!control.value) {
      return null;
    }   
      const regex = new RegExp('^(?!666|000|9\\d{2})\\d{3}-(?!00)\\d{2}-(?!0{4})\\d{4}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalid: true, ssnValidator: true  };
  }
}
    };

