import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CampaignServices{
  response: any
  constructor( private http: HttpClient) {
  }

  getonecamp(){
    return this.http.get('http://178.62.251.36/admin_api/v1/campaigns', {
      headers: new HttpHeaders({
        'Api-Key': '2037cd82a8121f897a835f93965a7ae7'
      })
    })
  }

  getstreamofcamp(campid:string){
    return this.http.get('http://178.62.251.36/admin_api/v1/campaigns/'+campid+'/streams', {
      headers: new HttpHeaders({
        'Api-Key': '2037cd82a8121f897a835f93965a7ae7'
      })
    })
  }

  getDomainid(){
    return this.http.get('http://178.62.251.36/admin_api/v1/domains', {
      headers: new HttpHeaders({
        'Api-Key': '2037cd82a8121f897a835f93965a7ae7'
      })
    })
  }

  create(id: string){
   return this.http.post('http://178.62.251.36/admin_api/v1/campaigns/'+id+'/clone', {
      headers: new HttpHeaders({
        'Api-Key': '2037cd82a8121f897a835f93965a7ae7'
      })
    })

  }

  updateStream(newstream: any){

  let data = {
    landings:[{
      landing_id:newstream.black_id
      }]
  }
    return this.http.put('http://178.62.251.36/admin_api/v1/streams/'+newstream.stream_b, data, {
      headers: new HttpHeaders({
        'Api-Key': '2037cd82a8121f897a835f93965a7ae7'
      })
    } )

  }

  updateCampaign(hotcamp: any){
    let data = {
      name: hotcamp.geo+'_'+hotcamp.offer+'_'+hotcamp.preland,
      group_id: hotcamp.group_id
    }

    return this.http.put('http://178.62.251.36/admin_api/v1/campaigns/'+hotcamp.camp_id, data, {
      headers: new HttpHeaders({
        'Api-Key': '2037cd82a8121f897a835f93965a7ae7'
      })
    } )
  }

  updateDomain(domain: string, campaign: string){
    let data = {
      default_campaign_id: campaign
  }


    return this.http.put('http://178.62.251.36/admin_api/v1/domains/'+domain, data, {
      headers: new HttpHeaders({
        'Api-Key': '2037cd82a8121f897a835f93965a7ae7'
      })
    } )
  }

}
