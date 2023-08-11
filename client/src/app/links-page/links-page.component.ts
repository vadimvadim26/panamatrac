import { Component, OnInit } from '@angular/core';
import {LinksServices} from "../shared/services/links.services";
import {PrelandingsServices} from "../shared/services/prelandings.services";

@Component({
  selector: 'app-links-page',
  templateUrl: './links-page.component.html',
  styleUrls: ['./links-page.component.scss']
})
export class LinksPageComponent {
  localuser: any
  links: any
  prelandings: any
  linkstatus: string = 'active'
  src: any;
  constructor(
    private  linksService: LinksServices,
    private prelandingsService: PrelandingsServices
  ) { }

  ngOnInit() {

    let getuser = localStorage.getItem('user')
    if (typeof getuser === "string") {
      this.localuser = JSON.parse(getuser)
    }
    this.linksService.getlinks(this.linkstatus).subscribe(res =>{
      this.links = res

    })


    this.prelandingsService.fetch().subscribe(prelandings =>{

      this.prelandings = prelandings

    })


  }


  selectLinkList(status: string){
    this.linksService.getlinks(status).subscribe(res =>{
      this.links = res
      this.linkstatus = status
    })
  }


updateLink(link: string, count: any){
   const newlink = {
      domain: link,
      count: count
    }
    console.log(newlink, 'remove')
   /* this.linksService.updateDomain(newlink).subscribe(res =>{
      if(res){
        this.linksService.getlinks(this.linkstatus).subscribe(res =>{
          this.links = res
        })
      }

    })*/
  }

}
