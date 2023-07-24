import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CloudflareService {


  constructor(private http: HttpClient) {  }

  getZones(email: string, apikey: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Key': apikey,
      'X-Auth-Email': email
    });

console.log(headers)
    return this.http.get<any>('/client/v4/zones', { headers: headers })
  }
}
