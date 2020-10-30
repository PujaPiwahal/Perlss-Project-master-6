import { EnvService } from './../../../../_shared/utility/env.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SustainCurrentFamilyLiveArrangementsForm } from './../../../../_shared/model/Forms/SustainCurrentFamilyLiveArrangementsForm';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SustainCurrentFamilyLiveArrangementsFormService {
  serverApiUrl: any;
  constructor(public http: HttpClient,
              private envService: EnvService) {
              this.serverApiUrl = this.envService.apiUrl();
  }

  async saveSustainCurrentFamilyLiveArrangementsForm(sustainCurrentFamilyLiveArrangementsForm: SustainCurrentFamilyLiveArrangementsForm): Promise<HttpResponse<any>> {
    return await this.http.post<any>(this.serverApiUrl.API_URL + `/referral/eform/livingArragPopup`,
    sustainCurrentFamilyLiveArrangementsForm, { observe: 'response' }).toPromise();
  }
}
