import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaeDiagnosisSummary } from '../../../_shared/model/paeDiagnosis/paeDiagnosisSummary';
import { EnvService } from '../../../_shared/utility/env.service';

@Injectable({
    providedIn: 'root'
})
export class paeDiagnosisSummaryService {
    serverApiUrl: any;
    constructor(public http: HttpClient,
        private envService: EnvService) {
        this.serverApiUrl = this.envService.apiUrl();
    }

    async savePaeDiagnosisSummary(data): Promise<HttpResponse<any>> {
        return await this.http.post<any>(this.serverApiUrl.API_URL + `/doc/uploadDocument`,
            data, { observe: 'response' }).toPromise();
    }
}