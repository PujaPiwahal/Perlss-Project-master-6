import { Injectable } from '@angular/core';
import { RefApplicantDetail } from '../../../_shared/model/RefApplicantDetail';
import { SearchPerson } from '../../../_shared/model/SearchPerson';
import { RefCoreDtl } from '../../../_shared/model/RefCoreDtl';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http/';
import { RefSchAndWork } from '../../../_shared/model/RefSchAndWork';
import { RefPlannedTransition } from '../../../_shared/model/RefPlannedTransition';
import { RefSubmission } from '../../../_shared/model/RefSubmission';
import { RefAppContact } from '../../../_shared/model/RefAppContact';
import { RefCareAndSupport } from '../../../_shared/model/RefCareAndSupport';
import { Observable } from 'rxjs';
import { EnvService } from '../../../_shared/utility/env.service';

@Injectable({
  providedIn: 'root'
})
export class ReferralService {
  age: number;
  refId: string;
  referralId: string;
  personId: string;
  response: any;
  refApplicantDetail: RefApplicantDetail;
  serverApiUrl: any;
  constructor(private http: HttpClient,
              private envService: EnvService) {
                this.serverApiUrl = this.envService.apiUrl();
  }

  setRefApplicantDetail( refApplicantDetail: RefApplicantDetail){
    this.refApplicantDetail = refApplicantDetail;
  }

  getRefApplicantDetail(){
    return this.refApplicantDetail;
  }

  getPersonId(){
    return this.personId;
  }

  getRefId(){
    return this.refId;
  }

  setAge(age: number) {
    this.age = age;
  }
  getAge(){
    return this.age;
  }

  async saveReferral(refCoreDtl: RefCoreDtl): Promise<HttpResponse<any>> {
   const response =  await this.http.post<any>(this.serverApiUrl.API_URL + `/referral/addReferral`,
                    refCoreDtl, { observe: 'response' }).toPromise();
   this.refId = response.body.refId;
   this.personId = response.body.applcantVO.personId;
   return response;
  }

  async saveReferralSchAndWork(refSchAndWork: RefSchAndWork): Promise<HttpResponse<any>> {
    return await this.http.post<any>(this.serverApiUrl.API_URL + `/referral/addSchoolAndWrokInfo`,
          refSchAndWork, { observe: 'response' }).toPromise();
  }

  async savePlannedTransition(transition: RefPlannedTransition): Promise<HttpResponse<any>> {
    return await this.http.post<any>(this.serverApiUrl.API_URL + `/intakeOutcome/refPlannedTransistionFormData `,
          transition, { observe: 'response' }).toPromise();
  }

  async saveReferralSubmission(refSubmission: RefSubmission): Promise<HttpResponse<any>> {
    return await this.http.post<any>(this.serverApiUrl.API_URL + `/referral/submitReferral`,
          refSubmission, { observe: 'response' }).toPromise();
  }

  async saveRefContact(refAppContact: RefAppContact): Promise<HttpResponse<any>> {
    return await this.http.post<any>(this.serverApiUrl.API_URL + `/referral/addReferralContact`,
          refAppContact, { observe: 'response' }).toPromise();
  }

  async saveRefCareAndSupport(refCareAndSupport: RefCareAndSupport): Promise<HttpResponse<any>> {
    return await this.http.post<any>(this.serverApiUrl.API_URL + `/referral/addRefCareAndSupport`,
          refCareAndSupport, { observe: 'response' }).toPromise();
  }

  getReferral(): Observable<any[]> {
    let paramss = new HttpParams();
    paramss = paramss.append('refId', this.refId);
    return this.http.get<any[]>(this.serverApiUrl.API_URL + `/referral/getReferral`, {params: paramss});
   }

  getSearchPerson(searchPerson: SearchPerson): Observable<any[]> {
  let paramss = new HttpParams();
  paramss = paramss.append('firstName', searchPerson.firstName);
  paramss = paramss.append('lastName', searchPerson.lastName);
  paramss = paramss.append('dobDt', searchPerson.dobDt);
  console.log(searchPerson);
  return this.http.get<any[]>(this.serverApiUrl.API_URL + `/pae/searchPerson`, {params: paramss});
  }

}
