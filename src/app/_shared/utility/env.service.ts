import { HttpClient, HttpBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
const PATH_TO_SERVER_CONSTANTS_FILE = '../../../assets/data/server.constants.json';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  public static serverConstants: any;
  httpClient: HttpClient;

  constructor(private http: HttpClient,
              handler: HttpBackend) {
              this.httpClient = new HttpClient(handler);
               }
  loadConstants() {
    return this.httpClient.get(PATH_TO_SERVER_CONSTANTS_FILE)
      .toPromise()
      .then(data => {
        EnvService.serverConstants = data;
      });
  }

  apiUrl() {
    return EnvService.serverConstants;
  }
}
