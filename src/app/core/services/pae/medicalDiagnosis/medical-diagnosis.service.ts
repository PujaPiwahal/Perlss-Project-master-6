import { EnvService } from './../../../../_shared/utility/env.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { MultipleComplexForm } from './../../../../_shared/model/Forms/MultipleComplexForm';
import { Injectable } from '@angular/core';
import { PaeMedicalDiagnosis } from '../../../../_shared/model/PaeMedDiagnosis/PaeMedicalDiagnosis';

@Injectable({
  providedIn: 'root'
})
export class MedicalDiagnosisService {
  serverApiUrl: any;
  constructor(public http: HttpClient,
              private envService: EnvService) {
              this.serverApiUrl = this.envService.apiUrl();
  }

  async saveMedicalDiagnosis(paeMedicalDiagnosis: PaeMedicalDiagnosis): Promise<HttpResponse<any>> {
    return await this.http.post<any>(this.serverApiUrl.API_URL + `/addMedicalDiagnosis`,
    paeMedicalDiagnosis, { observe: 'response' }).toPromise();
  }
}
