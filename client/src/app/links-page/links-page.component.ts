import { Component, OnInit } from '@angular/core';
import {LinksServices} from "../shared/services/links.services";

@Component({
  selector: 'app-links-page',
  templateUrl: './links-page.component.html',
  styleUrls: ['./links-page.component.scss']
})
export class LinksPageComponent {
  localuser: any
  links: any
  linkstatus: string = 'active'
  constructor(
    private  linksService: LinksServices
  ) { }

  ngOnInit() {

    let getuser = localStorage.getItem('user')
    if (typeof getuser === "string") {
      this.localuser = JSON.parse(getuser)
    }
    this.linksService.getlinks(this.linkstatus).subscribe(res =>{
      this.links = res

    })
  }


  selectLinkList(status: string){
    this.linksService.getlinks(status).subscribe(res =>{
      this.links = res
      this.linkstatus = status
    })
  }


updateLink(link: string, status: string){
   const newlink = {
      linkId: link,
      linkStatus: status
    }
    console.log(newlink)
    this.linksService.updateDomain(newlink).subscribe(res =>{
      if(res){
        this.linksService.getlinks(this.linkstatus).subscribe(res =>{
          this.links = res
        })
      }

    })
  }

}
