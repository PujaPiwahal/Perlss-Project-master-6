import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvService } from 'src/app/_shared/utility/env.service';

@Injectable({
  providedIn: 'root'
})
export class ReferralDashboardService {
  serverApiUrl: any;
  response: any;

  constructor(private http: HttpClient,
              private envService: EnvService) {
      this.serverApiUrl = this.envService.apiUrl();
    }

    getCountPendingReferral(): Observable<HttpResponse<any>>{
      return this.http.get<Observable<any>>(this.serverApiUrl.API_URL + `/referral/countPendingReferrals`,
      { observe: 'response' });
    }

    getIntakeStats(): Observable<HttpResponse<any>>{
      return this.http.get<Observable<any>>(this.serverApiUrl.API_URL + `/referral/countIntakeStats`,
      { observe: 'response' });
    }

    getEcfReferralStats(region, entity): Observable<any>{
      let paramss = new HttpParams();
      paramss = paramss.append('region', region);
      paramss = paramss.append('categoryType', entity);
      return this.http.get<Observable<any>>(this.serverApiUrl.API_URL + `/referral/getECFReferralStatCount`, {params: paramss});
    }

    getKbReferralStats(region): Observable<any>{
      let paramss = new HttpParams();
      paramss = paramss.append('region', region);
      return this.http.get<Observable<any>>(this.serverApiUrl.API_URL + `/referral/getKBReferralStatCount`, {params: paramss});
    }

    getReferralQueueCount(): Observable<any>{
      return this.http.get<Observable<any>>(this.serverApiUrl.API_URL + `/referral/referralQueueCount`, { observe: 'response' });
    }

    getReferralSearch(referralFilterRequest): Observable<any>{
      return this.http.get<Observable<any>>(this.serverApiUrl.API_URL + `/referral/getKBReferralStatCount`);
    }

    deleteReferral(refId): Observable<any>{
      let paramss = new HttpParams();
      paramss = paramss.append('refId', refId);
      return this.http.post<Observable<any>>(this.serverApiUrl.API_URL + `/referral/deleteRefRequest`, {params: paramss});
    }
}
