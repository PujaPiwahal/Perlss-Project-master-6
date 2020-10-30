import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvService } from '../../../_shared/utility/env.service';

@Injectable({
  providedIn: 'root'
})
export class AdjudicationDetailsService {
  private parentId: any;
  public serverApiUrl: any;

  constructor(private http: HttpClient,
              private envService: EnvService) {
                this.serverApiUrl = this.envService.apiUrl();
              }

  setAdjudicationSearchParentId(parentId: any) {
    this.parentId = parentId;
  }
  getAdjudicationSearchParentId() {
    return this.parentId;
  }

  getAdjudicationDetails(parentId: any): Observable<any[]> {
    let paramss = new HttpParams();
    paramss = paramss.append('parentId', String(parentId));
    return this.http.get<any[]>(this.serverApiUrl.API_URL + `/audit/searchDetails`, {params: paramss});
  }

}
