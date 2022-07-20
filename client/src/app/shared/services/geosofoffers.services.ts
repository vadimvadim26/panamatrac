import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Geosofoffers} from "../interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GeosofoffersServices{
  constructor(private http: HttpClient) {
  }

  fetch(): Observable<Geosofoffers[]>{
    return this.http.get<Geosofoffers[]>('/api/geosofoffers')
  }
  create(geosofoffers: Geosofoffers): Observable<Geosofoffers[]>{
    return this.http.post<Geosofoffers[]>('/api/geosofoffers', geosofoffers)
  }
  update(geosofoffers: Geosofoffers): Observable<Geosofoffers[]>{
    return this.http.put<Geosofoffers[]>('/api/geosofoffers', geosofoffers)
  }

}
