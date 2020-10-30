import { EnvService } from './../../../../_shared/utility/env.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { MultipleComplexForm } from './../../../../_shared/model/Forms/MultipleComplexForm';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MultipleComplexFormService {
  serverApiUrl: any;
  constructor(public http: HttpClient,
              private envService: EnvService) {
              this.serverApiUrl = this.envService.apiUrl();
  }

  async saveMultipleComplexForm(multipleComplexForm: MultipleComplexForm): Promise<HttpResponse<any>> {
    return await this.http.post<any>(this.serverApiUrl.API_URL + `/referral2/eform/CmplxCondRvwFormPopup`,
    multipleComplexForm, { observe: 'response' }).toPromise();
  }
}
