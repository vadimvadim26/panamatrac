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

export class CampaignServices{
  response: any
  options: any
  newdompath: string = ''
  constructor( private http: HttpClient) {

  }



  getWhiteland(){
    return this.http.get('/admin_api/v1/landing_pages', httpOptions)
  }

  getonecamp(){
    return this.http.get('/admin_api/v1/campaigns', httpOptions)
  }

  getstreamofcamp(campid:string){
    return this.http.get('/admin_api/v1/campaigns/'+campid+'/streams', httpOptions)
  }

  getDomainid(){
    return this.http.get('/admin_api/v1/domains', httpOptions)
  }

  create(id: string){
    return this.http.post('/admin_api/v1/campaigns/'+id+'/clone', '', httpOptions)
  }

  updateStream(newstream: any){

    return this.http.put<any>('/admin_api/v1/streams/'+newstream.stream_b, {
        "landings": [{"landing_id": newstream.black_id}]
      }, httpOptions )

  }

  updateStreamW(newstream: any){
    return this.http.put<any>('/admin_api/v1/streams/'+newstream.stream_w, {
      "landings": [{"landing_id": newstream.white_id}]
    }, httpOptions )
  }

  updateCampaign(hotcamp: any){
    let body = {
      name: hotcamp.geo+'_'+hotcamp.offer+'_'+hotcamp.preland,
      group_id: hotcamp.group_id
    }
    return this.http.put('/admin_api/v1/campaigns/'+hotcamp.camp_id, body, httpOptions)
  }

  updateDomain(domain: string, campaign: string){
    let body = {
      default_campaign_id: campaign
  }
    return this.http.put('/admin_api/v1/domains/'+domain, body, httpOptions )
  }

  updateLanding(newlink: any, prelend_id: string,  sub: string, redirect: boolean){

    let patharr = newlink.domain.split('.')
    if(patharr[2]){
      this.newdompath = 'preference/'+patharr[0]+'_'+patharr[1]+'_'+patharr[2]+'.txt'
    }else{
      this.newdompath = 'preference/'+patharr[0]+'_'+patharr[1]+'.txt'
    }

    let newdombody = {
      "domain": newlink.domain,
      "preference":     {
        "redirect": redirect,
        "sub1": sub,
        "link": "",
        "offer": "",
        "offerimg": "",
        "price": ""
      }
    }

    let jsonStringdata = JSON.stringify(newdombody, null, 2);

    let body = {
      "path": this.newdompath,
      "data": jsonStringdata

    }
    return this.http.put('/admin_api/v1/landing_pages/'+prelend_id+'/update_file', body, httpOptions )
  }

  subEncoder(sub1: any, sub2: string, sub3: any){
    const data = {
     'pix': sub1,
      'name': sub2,
      'camp': sub3
    }
    return this.http.post('/sub_encoder', data)
  }

}
