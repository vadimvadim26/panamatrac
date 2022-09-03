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

  hotlink(status: string){
    return this.http.get('/api/domains'+status)
  }

  allLinks(): Observable<Links[]>{
    return this.http.get<Links[]>('/api/links')
  }

  getlinks(){
    return this.http.get('/api/links/:id')
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

  removelink(data: string){
    let body = {
      full_link: data
    }
    // @ts-ignore
    return this.http.patch('/api/links', body)
  }


}
