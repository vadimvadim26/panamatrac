import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Prelandings} from "../interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PrelandingsServices{
  constructor(private http: HttpClient) {
  }

  fetch(): Observable<Prelandings[]>{
    return this.http.get<Prelandings[]>('/api/prelandings')
  }

  create(prelandings: Prelandings, image: any): Observable<Prelandings[]>{

    const formData = new FormData()
    formData.append('image', image, image.name)
    formData.append('name', prelandings.name)
    formData.append('geo', prelandings.geo)
    formData.append('offer', prelandings.offer)
    formData.append('preview_img', prelandings.preview_img)
    formData.append('preland_link', prelandings.preland_link)
    formData.append('track_id', prelandings.track_id)
    return this.http.post<Prelandings[]>('/api/prelandings', formData)
  }
  update(offer: string, geo: string, name: string, active: string): Observable<Prelandings>{
    const formData = new FormData()
    formData.append('name', name)
    formData.append('offer', offer)
    formData.append('geo', geo)
    formData.append('active', active)
    return this.http.put<Prelandings>('/api/prelandings', formData)
  }
}
