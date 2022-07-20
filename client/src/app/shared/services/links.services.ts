import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Links} from "../interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LinksServices{
  constructor(private http: HttpClient) {
  }

  hotlink(): Observable<Links[]>{
    return this.http.get<Links[]>('/api/links')
  }

  create(links: any): Observable<Links[]>{
    return this.http.post<Links[]>('/api/links', links)
  }

  activelink(links: { user_id: any; domain: any }): Observable<Links[]>{
    return this.http.put<Links[]>('/api/links', links)
  }

  update(links: any): Observable<Links[]>{
    return this.http.put<Links[]>('/api/links', links)
  }

}
