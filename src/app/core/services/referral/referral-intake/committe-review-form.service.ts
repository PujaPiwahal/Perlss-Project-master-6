import { EnvService } from './../../../../_shared/utility/env.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CommitteeReviewForm } from './../../../../_shared/model/Forms/CommitteeReviewForm';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommitteReviewFormservice {
  serverApiUrl: any;
  constructor(public http: HttpClient,
              private envService: EnvService) {
    this.serverApiUrl = this.envService.apiUrl();
  }

  // tslint:disable-next-line: no-shadowed-variable
  async saveCommitteReviewForm(committeeReviewForm: CommitteeReviewForm): Promise<HttpResponse<any>> {
    return await this.http.post<any>(this.serverApiUrl.API_URL + `/referral2/eform/reviewGroup7Popup`,
      committeeReviewForm, { observe: 'response' }).toPromise();
  }
}
