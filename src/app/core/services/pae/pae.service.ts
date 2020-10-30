import { Injectable } from '@angular/core';
import { SearchPerson } from '../../../_shared/model/SearchPerson';
import { PaeApplicant } from '../../../_shared/model/PaeApplicant';
import { PaeAppointment } from '../../../_shared/model/PaeAppointment';
import { PaeNutritionFeeding } from '../../../_shared/model/PaeNutritionFeeding';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http/';
import { Observable } from 'rxjs';
import { EnvService } from '../../../_shared/utility/env.service';

@Injectable({
  providedIn: 'root'
})
export class PaeService {
  age: number;
  paeId: string;
  personId: string;
  response: any;
  serverApiUrl: any;
  constructor(private http: HttpClient,
              private envService: EnvService) {
                this.serverApiUrl = this.envService.apiUrl();
  }

  getPersonId(){
    return this.personId;
  }

  getPaeId(){
    return this.paeId;
  }

  // async savePae(paeCoreDtl: PaeCoreDtl): Promise<HttpResponse<any>> {
  //  const response =  await this.http.post<any>(this.serverApiUrl.API_URL + `/pae/addPae`,
  //                   paeCoreDtl, { observe: 'response' }).toPromise();
  //  this.paeId = response.body.paeId;
  //  this.personId = response.body.applcantVO.personId;
  //  return response;
  // }

  async getWelcomeByPaeId(paeId : string) {

    let paramss = new HttpParams();
    paramss = paramss.append('paeId', paeId);
    return await this.http.get<any>(this.serverApiUrl.API_URL + `/pae/welcomeByPaeId`,
      {params: paramss}).toPromise();

  }

  async getWelcomeByTaskId(taskId : string) {

    let paramss = new HttpParams();
    paramss = paramss.append('taskId', taskId);
    return await this.http.get<any>(this.serverApiUrl.API_URL + `/pae/welcomeByTaskId`,
      {params: paramss}).toPromise();

    }

    async savePaeApplicant(paeApplicant: PaeApplicant): Promise<HttpResponse<any>> {
      const response =  await this.http.post<any>(this.serverApiUrl.API_URL + `/pae/addApplicantInfo`,
                       paeApplicant, { observe: 'response' }).toPromise();
      return response;
     }
   
     async savePae(paeAppointment: PaeAppointment): Promise<HttpResponse<any>> {
      const response =  await this.http.post<any>(this.serverApiUrl.API_URL + `/pae/addPaeAppoinement`,
       paeAppointment, { observe: 'response' }).toPromise();
      return response;
     }
   
   
     async getSearchPerson(searchPersonObject: SearchPerson): Promise<HttpResponse<any>> {
      const response =  await this.http.get<any>(this.serverApiUrl.API_URL + `/pae/searchPerson`, { observe: 'response', params: {firstName: searchPersonObject.firstName, lastName: searchPersonObject.lastName, ssn: searchPersonObject.ssn,dobDt: searchPersonObject.dobDt,midInitial: searchPersonObject.midInitial ,suffix: searchPersonObject.suffix,genderCd: searchPersonObject.genderCd} }).toPromise();
      return response;
     }
   
     async getApplicantAddress(personId: number) {
       const response = await this.http.get<any>(this.serverApiUrl.API_URL + `/pae/getApplicantAddress`, { observe: 'response', params: {personId: personId.toString()} }).toPromise();
      return response;
     }
   
     async getPaeAppoinement(paeId: string) {
       const response = await this.http.get<any>(this.serverApiUrl.API_URL + `/pae/getPaeAppoinement`, { observe: 'response', params: {paeId} }).toPromise();
      return response;
     }

     async savePaeNutritionFeeding(paeNutritionFeeding: PaeNutritionFeeding): Promise<HttpResponse<any>> {
      const response =  await this.http.post<any>(this.serverApiUrl.API_URL + `pae/prior/NutritionFeeding`,
                       paeNutritionFeeding, { observe: 'response' }).toPromise();
      return response;
     }

}
