import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http/';
import { environment } from 'src/environments/environment';
import { AppointmentAddUpdate } from '../../_shared/model/AppointmentAddUpdate';
import { Observable, of } from 'rxjs';
import { EnvService } from '../../_shared/utility/env.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  id: string;
  createdBy:string;
  response: any;
  public serverApiUrl: any;
  constructor(private http: HttpClient,
    private envService: EnvService) {
      this.serverApiUrl = this.envService.apiUrl();
     }

  async addAppointment(appointmentAddUpdate: AppointmentAddUpdate): Promise<HttpResponse<any>> {
    return await this.http.post<any>(this.serverApiUrl.API_URL +`/appointment/addAppointment`, appointmentAddUpdate, { observe: 'response' }).toPromise();
  }
  async getAppointment(id: string): Promise<HttpResponse<any>> {
    return await this.http.get<any>(this.serverApiUrl.API_URL +`/appointment/getAppointment?id=${id}`, { observe: 'response' }).toPromise();
  }

  async updateAppointment(appointmentAddUpdate: AppointmentAddUpdate): Promise<HttpResponse<any>> {
    return await this.http.post<any>(this.serverApiUrl.API_URL +`/appointment/updateAppointment`, appointmentAddUpdate, { observe: 'response' }).toPromise();
  }


  async searchAppointment(data): Promise<HttpResponse<any>> {
      let queryString = '';
      Object.keys(data).forEach((element) => {
        if(data[`${element}`]) {
          queryString !== '' ? queryString = `${queryString}&${element}=${data[`${element}`]}` : queryString = `?${element}=${data[`${element}`]}`;
        }
      });
    console.log(queryString);
    return await this.http.get<any>(this.serverApiUrl.API_URL +`/appointment/searchAppointment${queryString}`, { observe: 'response' }).toPromise();
  }

  async getAppointments(createdBy: string): Promise<HttpResponse<any>> {
    return await this.http.get<any>(this.serverApiUrl.API_URL +`/appointment/getAppointments?createdBy=${createdBy}`, { observe: 'response' }).toPromise();
  }
  cancelAppointment(payload: any): Observable<any> {
    console.log("payload ",payload);
    return this.http.post<any>(this.serverApiUrl.API_URL +`/appointment/cancelAppointment`, payload);

  }

  getAppointmentSummary(appointmentId: string): Observable<any>{
    return  this.http.get<any>(this.serverApiUrl.API_URL +`/appointment/getAppointment?id=${appointmentId}`);
  }

  getCancellationReasonCodes(): Observable<any[]>{
    //return this.http.get<any[]>(this.serverApiUrl.API_URL +`/api/staticData/getStaticDataValue?dataNameKey=APPOINTMENT_STATUS`);
    return of([{"name": "SC", "value":"Scheduled","activateSW":"Y"},
      {"name": "CA", "value":"Cancelled","activateSW":"Y"},
      {"name": "CM", "value":"Completed","activateSW":"Y"},
      {"name": "UC", "value":"Unable to contact","activateSW":"Y"},
      {"name": "RE", "value":"Rescheduled","activateSW":"Y"}]);

  }

}
