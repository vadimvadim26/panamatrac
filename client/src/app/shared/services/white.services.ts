import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Api-Key': '78b91a492738b74ac8ed6b6f53e15467',
    'Accept': '*'
  })
}
@Injectable({
  providedIn: 'root'
})
export class WhiteServices{
  constructor(private http: HttpClient) {
  }


  getWhiteLand(geo: string){
      return this.http.get<any>('/admin_api/v1/landing_pages', httpOptions)
  }

}
