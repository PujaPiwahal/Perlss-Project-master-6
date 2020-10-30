import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvService } from '../../../../_shared/utility/env.service';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaeDashboardService {
  serverApiUrl: any;
constructor(private http: HttpClient,
            private envService: EnvService) {
this.serverApiUrl = this.envService.apiUrl();
}

// TODO PAE DASHBOARD SERVICES

}
