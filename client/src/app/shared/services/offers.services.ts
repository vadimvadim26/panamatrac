import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Offers} from "../interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OffersServices{
  constructor(private http: HttpClient) {
  }

  fetch(): Observable<Offers[]>{
    return this.http.get<Offers[]>('/api/offers')
  }



  create(name: string, image: any): Observable<Offers>{

    const formData = new FormData()
    formData.append('image', image, image.name)
    formData.append('name', name)

    return this.http.post<Offers>('/api/offers', formData)
  }

  update(offers: string, active: string): Observable<Offers>{
      const formData = new FormData()
      formData.append('name', offers)
      formData.append('active', active)
      return this.http.put<Offers>('/api/offers', formData)
  }




}
