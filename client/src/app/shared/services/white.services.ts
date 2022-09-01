import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Api-Key': '2037cd82a8121f897a835f93965a7ae7',
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
