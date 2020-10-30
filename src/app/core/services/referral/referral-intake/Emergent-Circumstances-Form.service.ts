import { EnvService } from './../../../../_shared/utility/env.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { RefEmergentCircumstancesReview } from './../../../../_shared/model/Forms/RefEmergentCircumstancesReview';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmergentCircumstancesFormservice {
  serverApiUrl: any;
  constructor(public http: HttpClient,
              private envService: EnvService) {
              this.serverApiUrl = this.envService.apiUrl();

  }
  // tslint:disable-next-line: no-shadowed-variable
  async saveEmergentCircunstancesForm(refEmergentCircumstancesReview: RefEmergentCircumstancesReview): Promise<HttpResponse<any>> {
return await this.http.post<any>(this.serverApiUrl.API_URL + `/intakeOutcome/emergentCircumstance`,
refEmergentCircumstancesReview, {observe: 'response' }).toPromise();
  }
}
