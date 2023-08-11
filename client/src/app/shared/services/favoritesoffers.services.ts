import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Favoritesoffers} from "../interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FavoritesoffersServices{
  constructor(private http: HttpClient) {
  }

  getAll(user: any){
    let body = user.name
    return this.http.get('/api/favoritesoffers', body)
  }
  create(favoriteoffer: any): Observable<Favoritesoffers>{

    console.log(favoriteoffer)
    return this.http.post<Favoritesoffers>('/api/favoritesoffers', favoriteoffer)
  }

  update(favoriteoffer: any): Observable<Favoritesoffers>{

    console.log(favoriteoffer)
    return this.http.put<Favoritesoffers>('/api/favoritesoffers', favoriteoffer)
  }
  remove(favoritesoffers: Favoritesoffers): Observable<Favoritesoffers[]>{
    return this.http.put<Favoritesoffers[]>('/api/favoritesoffers', favoritesoffers)
  }

}
