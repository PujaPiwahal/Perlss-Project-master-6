import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http/';
import { Observable, of } from 'rxjs';
import {EnvService} from '../../../../_shared/utility/env.service';
import { PaeActivityLivingPart } from '../../../../_shared/model/PaeActivityLivingPart';

@Injectable({
  providedIn: 'root'
})
export class ActivityDailyLivingPartOneService {
  id: string;
  createdBy: string;
  response: any;
  public serverApiUrl: any;
  valid: boolean;
  constructor(private http: HttpClient,
              private envService: EnvService) {
      this.serverApiUrl = this.envService.apiUrl();
     }

  async addPaeActivitiesLiving(paeActivityLivingPart: PaeActivityLivingPart): Promise<HttpResponse<any>> {
    return await this.http.post<any>(this.serverApiUrl.API_URL + `/pae/savePaeActivitiesLiving`,
    paeActivityLivingPart, { observe: 'response' }).toPromise();
  }
  async getPaeActivitiesLiving(PaeId: string): Promise<HttpResponse<any>> {
    return await this.http.get<any>(this.serverApiUrl.API_URL + ` /pae/getPaeActivitiesLivingBy?PaeId=${PaeId}`,
    { observe: 'response' }).toPromise();
  }
}
